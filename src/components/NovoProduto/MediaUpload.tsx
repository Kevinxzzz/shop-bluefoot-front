import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/contexts/ToastContext';
import styles from './NovoProduto.module.scss';
import React, { useRef } from 'react';

const ALLOWED_IMAGES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_VIDEOS = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-m4v'];

interface MediaUploadProps {
  files: File[];
  previews: string[];
  onAddFiles: (validFiles: File[], validPreviews: string[]) => void;
  onRemove: (index: number) => void;
}

export function MediaUpload({ files, previews, onAddFiles, onRemove }: MediaUploadProps) {
  const { addToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const checkVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      const url = URL.createObjectURL(file);
      
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(url);
        resolve(video.duration);
      };
      
      video.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Erro ao ler vídeo'));
      };
      
      video.src = url;
    });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    const currentImagesCount = files.filter(f => ALLOWED_IMAGES.includes(f.type)).length;
    const currentVideosCount = files.filter(f => ALLOWED_VIDEOS.includes(f.type)).length;

    let newImageCount = currentImagesCount;
    let newVideoCount = currentVideosCount;

    const validFilesToKeep: File[] = [];
    const validPreviewsToKeep: string[] = [];

    for (const file of selectedFiles) {
      const isImage = ALLOWED_IMAGES.includes(file.type);
      const isVideo = ALLOWED_VIDEOS.includes(file.type);

      if (!isImage && !isVideo) {
        addToast({ type: 'alert', message: `Formato inválido: ${file.name}` });
        continue;
      }

      if (isImage) {
        if (newImageCount >= 3) {
          addToast({ type: 'alert', message: `Máximo de 3 imagens atingido. Ignorando ${file.name}.` });
          continue;
        }
        if (file.size > 1 * 1024 * 1024) {
          addToast({ type: 'alert', message: `Imagem excedeu 1MB: ${file.name}` });
          continue;
        }
        newImageCount++;
        validFilesToKeep.push(file);
        validPreviewsToKeep.push(URL.createObjectURL(file));
      }

      if (isVideo) {
        addToast({ type: 'alert', message: 'O upload de vídeos está temporariamente desabilitado.' });
        continue;

        if (newVideoCount >= 1) {
          addToast({ type: 'alert', message: `Máximo de 1 vídeo atingido. Ignorando ${file.name}.` });
          continue;
        }
        if (file.size > 20 * 1024 * 1024) {
          addToast({ type: 'alert', message: `Vídeo excedeu 20MB: ${file.name}` });
          continue;
        }
        
        try {
          const duration = await checkVideoDuration(file);
          if (duration > 20) {
            addToast({ type: 'alert', message: `Duração do vídeo deve ser no máximo 20 segundos: ${file.name}` });
            continue;
          }
        } catch (error) {
          addToast({ type: 'error', message: `Falha ao processar vídeo: ${file.name}` });
          continue;
        }
        
        newVideoCount++;
        validFilesToKeep.push(file);
        validPreviewsToKeep.push(URL.createObjectURL(file));
      }
    }

    if (validFilesToKeep.length > 0) {
      onAddFiles(validFilesToKeep, validPreviewsToKeep);
    }
  };

  return (
    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
      <label className={styles.label}>Imagens e Vídeo</label>
      <label className={styles.uploadArea} htmlFor="files">
        <Upload size={24} className={styles.uploadIcon} />
        <div className={styles.uploadText}>Clique para adicionar mídias</div>
        <div className={styles.uploadHint}>JPG, PNG, WEBP (até 1MB) | Vídeos temporariamente desabilitados</div>
      </label>
      <input
        id="files"
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime,video/x-m4v"
        multiple
        onChange={handleUpload}
        style={{ display: 'none' }}
      />

      {previews.length > 0 && (
        <div className={styles.previewGrid}>
          {previews.map((url, i) => (
            <div key={i} className={styles.previewItem}>
              {(() => {
                const isVideoExt = /\.(mp4|webm|mov|m4v|quicktime)($|\?)/i.test(url);
                const isBlob = url.startsWith('blob:');
                const newFilesIndex = i - (previews.length - files.length);
                const isNewVideo = isBlob && newFilesIndex >= 0 && files[newFilesIndex]?.type.startsWith('video/');

                if (isVideoExt || isNewVideo) {
                  return <video src={url} className={styles.videoPreview} width={72} height={72} muted />;
                }

                return (
                  <Image
                    src={url}
                    alt={`Preview ${i + 1}`}
                    width={72}
                    height={72}
                    unoptimized
                  />
                );
              })()}
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => onRemove(i)}
                title="Remover mídia"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
