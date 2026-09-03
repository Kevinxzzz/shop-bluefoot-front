'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Tag, DollarSign, Loader2 } from 'lucide-react';
import MultiSelect from '@/components/MultiSelect';
import type { CategoryResponseDTO } from '@/types/categoryType';
import { useCategories } from '@/hooks/categories/useCategories';
import { productService } from '@/services/productService';
import { useCreateProduct } from '@/hooks/products/useCreateProduct';
import { uploadService } from '@/services/uploadService';
import { useToast } from '@/contexts/ToastContext';
import { InputField } from '@/components/InputField';
import { TextAreaField } from './TextAreaField';
import { MediaUpload } from './MediaUpload';
import type { CreateProductDTO, MediaUploadDTO } from '@/types/productType';
import styles from './NovoProduto.module.scss';
import { formatCurrencyInput, parseCurrencyToCents } from '@/utils';

export default function NovoProdutoContainer() {
  const router = useRouter();
  const { addToast } = useToast();
  
  // Estados do formulário
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  
  // Arquivos reais e previews (ObjectURLs)
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  
  // Status de salvamento
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Controlled form states
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');

  // Fetch das categorias usando o hook padrão (KISS)
  const { data: categoriesResponse, isLoading: loadingCategories, isError } = useCategories({ limit: 100 });
  const categories = categoriesResponse?.data || [];

  const createProductMutation = useCreateProduct();

  // Exibe toast caso ocorra erro no fetch via react-query
  useEffect(() => {
    if (isError) {
      addToast({ type: 'error', message: 'Erro ao carregar categorias.' });
    }
  }, [isError, addToast]);

  // Cleanup de ObjectURLs ao desmontar para evitar Memory Leak
  useEffect(() => {
    return () => {
      previews.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previews]);

  const handleAddFiles = (newFiles: File[], newPreviews: string[]) => {
    setFiles(prev => [...prev, ...newFiles]);
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setPreviews(prev => {
      const target = prev[indexToRemove];
      if (target && target.startsWith('blob:')) {
        URL.revokeObjectURL(target);
      }
      return prev.filter((_, i) => i !== indexToRemove);
    });
    setFiles(prev => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!titulo.trim()) {
      addToast({ type: 'alert', message: 'O título é obrigatório.' });
      return;
    }

    const hasImage = files.some(file => file.type.startsWith('image/'));
    
    if (!hasImage) {
      addToast({ type: 'alert', message: 'O produto deve possuir pelo menos uma imagem.' });
      return;
    }

    setIsSubmitting(true);

    try {
      let uploadedMedia: MediaUploadDTO[] = [];

      // Fase 1: Upload das Mídias se existirem
      if (files.length > 0) {
        const uploadResult = await uploadService.uploadProductMedia(files);
        // O backend retorna um array com url, key e type
        uploadedMedia = uploadResult.map(res => ({
          url: res.url,
          key: res.key,
          type: res.type,
          // Não enviamos isMain, deixamos o backend definir automaticamente
        }));
      }

      // Fase 2: Criar Produto com as chaves recebidas
      const productPayload: CreateProductDTO = {
        name: titulo.trim(),
        description: descricao.trim() || undefined,
        price: preco ? parseCurrencyToCents(preco) : undefined,
        categoryIds: selectedCats.length > 0 ? selectedCats : undefined,
        media: uploadedMedia.length > 0 ? uploadedMedia : undefined,
      };

      await createProductMutation.mutateAsync(productPayload);

      addToast({
        type: 'success',
        title: 'Produto Salvo',
        message: 'Produto cadastrado com sucesso!',
      });
      
      // Força a limpeza das URLs ativas
      previews.forEach(url => URL.revokeObjectURL(url));
      
      router.push('/dashboard/produtos');
    } catch (error: any) {
      // Deixamos os arquivos e form intactos caso ocorra erro (permite retry)
      addToast({
        type: 'error',
        title: 'Erro no Cadastro',
        message: error.response?.data?.message || 'Ocorreu um erro ao salvar o produto.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Convert categories para o formato do MultiSelect
  const multiSelectOptions = categories.map((cat: any) => ({
    id: cat.id,
    name: cat.name,
  }));

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Novo Produto</h1>
      </div>

      <form className={styles.formCard} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <InputField
            id="titulo"
            label="Título do Produto"
            value={titulo}
            onChange={setTitulo}
            placeholder="Ex: Nike Mercurial Vapor 15 Elite"
            icon={Tag}
            required
            fullWidth
            disabled={isSubmitting}
          />

          <TextAreaField
            id="descricao"
            label="Descrição"
            value={descricao}
            onChange={setDescricao}
            placeholder="Descreva o produto em detalhes..."
            required
            fullWidth
            disabled={isSubmitting}
          />

          <InputField
            id="preco"
            label="Preço (R$)"
            value={preco}
            onChange={(val) => setPreco(formatCurrencyInput(val))}
            placeholder="0,00"
            icon={DollarSign}
            required
            disabled={isSubmitting}
          />

          <div className={styles.formGroup}>
            <label className={styles.label}>Categorias</label>
            {loadingCategories ? (
              <div style={{ padding: '8px', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                <Loader2 size={16} className="animate-spin inline mr-2" /> Carregando categorias...
              </div>
            ) : (
              <MultiSelect
                options={multiSelectOptions}
                selected={selectedCats}
                onChange={setSelectedCats}
                placeholder="Selecione categorias..."
              />
            )}
          </div>

          <MediaUpload
            files={files}
            previews={previews}
            onAddFiles={handleAddFiles}
            onRemove={handleRemoveFile}
          />
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? (
              <><Loader2 size={16} className="animate-spin" style={{ marginRight: '8px' }} /> Salvando...</>
            ) : (
              <><Save size={16} style={{ marginRight: '8px' }} /> Salvar Produto</>
            )}
          </button>
          <button type="button" className={styles.cancelBtn} onClick={() => router.back()} disabled={isSubmitting}>
            <X size={16} style={{ marginRight: '8px' }} /> Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
