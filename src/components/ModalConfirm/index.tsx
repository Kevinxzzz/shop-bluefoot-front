'use client';

import { AlertTriangle, Sparkles } from 'lucide-react';
import styles from './ModalConfirm.module.scss';

import { ReactNode } from 'react';

interface ModalConfirmProps {
  isOpen: boolean;
  title: string | ReactNode;
  message: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'default' | 'promo';
  layout?: 'default' | 'stacked';
  icon?: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}

export default function ModalConfirm({
  isOpen,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  variant = 'default',
  layout = 'default',
  icon,
  isLoading = false,
  loadingText = 'Carregando...',
}: ModalConfirmProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onCancel} aria-hidden="true" />
      <div className={`${styles.modal} ${styles[variant]}`} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        {variant === 'danger' && (
          <div className={styles.iconWrapper}>
            <AlertTriangle size={24} />
          </div>
        )}
        {variant === 'promo' && (
          <div className={`${styles.iconWrapper} ${styles.promo}`}>
            {icon || <Sparkles size={24} />}
          </div>
        )}
        <h3 id="modal-title" className={styles.title}>{title}</h3>
        <div className={styles.message}>{message}</div>
        <div className={`${styles.actions} ${styles[layout]} ${layout === 'stacked' ? styles.stacked : ''}`}>
          <button className={styles.cancelBtn} onClick={onCancel} disabled={isLoading}>
            {cancelText}
          </button>
          <button
            className={`${styles.confirmBtn} ${variant === 'danger' ? styles.danger : ''}`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? loadingText : confirmText}
          </button>
        </div>
      </div>
    </>
  );
}

