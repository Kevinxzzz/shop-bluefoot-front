"use client";

import { useState, useEffect } from "react";
import styles from "./InstitutionalSection.module.scss";
import { Zap, Headphones, HeartHandshake, Smartphone } from "lucide-react";

const BENEFITS = [
  {
    id: "speed",
    title: "Atendimento rápido",
    icon: Zap,
    contentTitle: "Agilidade em cada etapa",
    contentDesc: "Nosso time está preparado para garantir que seu pedido seja processado e entregue no menor tempo possível. Chega de esperas intermináveis.",
  },
  {
    id: "support",
    title: "Suporte pós-venda",
    icon: Headphones,
    contentTitle: "Sempre ao seu lado",
    contentDesc: "Mesmo após a compra, nossa equipe de suporte está à disposição para ajudar com dúvidas, trocas e dicas de uso. Seu sucesso é o nosso também.",
  },
  {
    id: "customers",
    title: "Centenas de clientes satisfeitos",
    icon: HeartHandshake,
    contentTitle: "Confiança que gera resultados",
    contentDesc: "Faça parte da nossa comunidade. Temos orgulho de ter centenas de avaliações positivas de clientes que confiam e aprovam a nossa qualidade.",
  },
  {
    id: "whatsapp",
    title: "Compra pelo WhatsApp",
    icon: Smartphone,
    contentTitle: "Praticidade na palma da mão",
    contentDesc: "Realize suas compras, tire dúvidas e acompanhe seu pedido diretamente pelo WhatsApp, com um atendimento humanizado e exclusivo.",
  }
];

export function InstitutionalSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % BENEFITS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovering]);

  const activeBenefit = BENEFITS[activeIndex];
  const ActiveContentIcon = activeBenefit.icon;

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Por que comprar conosco?</h2>
        <p className={styles.subtitle}>
          Descubra os benefícios exclusivos que preparamos para garantir a melhor experiência para você.
        </p>
      </div>

      <div 
        className={styles.grid}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className={styles.tabs}>
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon;
            const isActive = index === activeIndex;
            return (
              <button
                key={benefit.id}
                className={`${styles.tab} ${isActive ? styles.active : ""}`}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                <div className={styles.iconWrapper}>
                  <Icon size={24} />
                </div>
                <span className={styles.tabTitle}>{benefit.title}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.contentWrapper}>
          <div key={activeBenefit.id} className={styles.content}>
            <div className={styles.contentIcon}>
              <ActiveContentIcon size={40} />
            </div>
            <h3 className={styles.contentTitle}>{activeBenefit.contentTitle}</h3>
            <p className={styles.contentDesc}>{activeBenefit.contentDesc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
