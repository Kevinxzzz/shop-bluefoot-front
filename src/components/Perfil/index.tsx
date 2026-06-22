'use client';

import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Save, Loader2, User, Mail, Link2 } from 'lucide-react';
import { queryKeys } from '@/lib/react-query/queryKeys';
import { Alert } from '@/components/ui/Alert';
import { InputField } from '@/components/InputField';
import { ProfileHeader } from './ProfileHeader';
import { AvatarUpload } from './AvatarUpload';
import { useUserProfile } from '@/hooks/users/useUserProfile';
import { useUpdateProfile } from '@/hooks/users/useUpdateProfile';
import { uploadService } from '@/services/uploadService';
import { getErrorMessage } from '@/services/httpClient';
import styles from './Perfil.module.scss';

export default function PerfilContainer() {
  const queryClient = useQueryClient();
  const { data: profile, isLoading } = useUserProfile();
  const { mutateAsync: updateProfile, isPending: isSaving } = useUpdateProfile();

  const [nome, setNome] = useState('');
  const [contactLink, setContactLink] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Limpeza do Object URL para evitar memory leak
  useEffect(() => {
    return () => {
      if (avatarUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(avatarUrl);
      }
    };
  }, [avatarUrl]);

  useEffect(() => {
    if (profile) {
      setNome(profile.name || '');
      setContactLink(profile.contactLink || '');
      setAvatarUrl(profile.profileImageUrl || '');
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(false);
    
    try {
      await updateProfile({
        name: nome,
        contactLink: contactLink || undefined,
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    } catch {
      // O erro já é alertado pelo hook
    }
  };

  const handleAvatarChange = async (file: File) => {
    setErrorMessage('');
    
    // Validação preventiva
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage('Selecione uma imagem JPG, PNG ou WEBP.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('A imagem deve possuir no máximo 5MB.');
      return;
    }

    try {
      setIsUploadingAvatar(true);
      
      // Preview instantâneo
      const localUrl = URL.createObjectURL(file);
      setAvatarUrl(localUrl);

      // Upload para AWS
      const res = await uploadService.uploadImage(file);
      
      // Recebe a URL definitiva e armazena no state
      setAvatarUrl(res.url);
      
      // Atualiza o cache do react-query instantaneamente
      queryClient.invalidateQueries({ queryKey: queryKeys.users.profile });
    } catch (error) {
      const message = getErrorMessage(error, 'Não foi possível atualizar sua foto de perfil. Tente novamente.');
      setErrorMessage(message);
      
      // Reverter preview em caso de falha
      if (profile?.profileImageUrl) {
        setAvatarUrl(profile.profileImageUrl);
      } else {
        setAvatarUrl('');
      }
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  if (isLoading || !profile) {
    return (
      <div className={styles.pageContainer} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', color: 'var(--color-text-tertiary)' }}>
        <Loader2 size={24} className={styles.spinner} />
        <span style={{ marginLeft: '8px' }}>Carregando perfil...</span>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Meu Perfil</h1>
        <p className={styles.subtitle}>Gerencie suas informações pessoais e de contato.</p>
      </div>

      {showSuccess && (
        <Alert type="success">Perfil atualizado com sucesso!</Alert>
      )}

      {errorMessage && (
        <Alert type="error">{errorMessage}</Alert>
      )}

      <form className={styles.profileCard} onSubmit={handleSave}>
        <ProfileHeader 
          name={nome || profile.name} 
          role={profile.role} 
          avatarUrl={avatarUrl || null} 
        />

        <div className={styles.formGrid}>
          <InputField
            id="name"
            label="Nome"
            value={nome}
            onChange={setNome}
            icon={User}
            required
            fullWidth
          />

          <InputField
            id="email"
            label="E-mail"
            value={profile.email}
            onChange={() => {}}
            icon={Mail}
            readOnly
          />

          <InputField
            id="contactLink"
            label="Link de Contato para atendimento"
            value={contactLink}
            onChange={setContactLink}
            icon={Link2}
          />

          <div className={styles.fullWidth}>
            <AvatarUpload onFileSelect={handleAvatarChange} isUploading={isUploadingAvatar} />
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitBtn} disabled={isSaving || isUploadingAvatar}>
            {isSaving ? (
              <>
                <Loader2 size={16} className={styles.spinner} />
                <span>Salvando...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Salvar Alterações</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
