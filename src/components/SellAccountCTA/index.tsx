'use client';

import React, { useEffect, useState } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import styles from './SellAccountCTA.module.scss';

interface SellAccountCTAProps {
  onAction: () => void;
}

export function SellAccountCTA({ onAction }: SellAccountCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true); // Inicialmente oculto para evitar flashes no SSR

  useEffect(() => {
    // Verificações executadas somente no cliente para evitar erros de hidratação
    const hasShown = sessionStorage.getItem('sellAccountToastShown');
    if (!hasShown) {
      setIsDismissed(false);
      // Pequeno delay de 1.5s para aparecer suavemente após o carregamento da página
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      const autoDismissTimer = setTimeout(() => {
        handleClose();
      }, 10000); // Auto-dismiss after 10s of visibility
      return () => clearTimeout(autoDismissTimer);
    }
  }, [isVisible]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('sellAccountToastShown', 'true');
    // Tempo para a animação de saída terminar antes de remover do DOM
    setTimeout(() => {
      setIsDismissed(true);
    }, 400);
  };

  const handleAction = () => {
    onAction();
    handleClose();
  };

  if (isDismissed) return null;

  return (
    <div className={`${styles.ctaContainer} ${isVisible ? styles.show : ''}`} role="alert">
      {/* Detalhe de luz de fundo decorativo */}
      <div className={styles.glowSpotlight} />

      <button className={styles.closeBtn} onClick={handleClose} aria-label="Fechar notificação">
        <X size={16} />
      </button>

      <div className={styles.body}>
        <div className={styles.iconBadge}>
          <Sparkles size={20} className={styles.sparkleIcon} />
        </div>

        <div className={styles.content}>
          <strong className={styles.title}>Oportunidade</strong>
          <p className={styles.message}>Deseja vender sua conta?</p>
          <button className={styles.actionBtn} onClick={handleAction}>
            <span>Vender conta</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
