"use client";

import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./FaqSection.module.scss";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const FAQ_ITEMS = [
  {
    question: "Como recebo a conta?",
    answer: "Após a confirmação do pagamento, você irá informar um e-mail que não esteja vinculado a nenhuma conta. Em seguida realizaremos a transferência imediatamente."
  },
  {
    question: "Posso trocar a senha?",
    answer: "Sim. Recomendamos alterar a senha assim que receber a conta para garantir total segurança."
  },
  {
    question: "O pagamento é seguro?",
    answer: "Sim. O pagamento é realizado via Pix, cartão ou outros métodos combinados pelo WhatsApp. A transferência da conta acontece somente após a confirmação do pagamento."
  },
  {
    question: "A conta é exclusiva?",
    answer: "Sim. Cada conta é vendida apenas uma única vez. Assim que a venda é concluída ela é removida automaticamente do catálogo."
  },
  {
    question: "Vocês dão suporte?",
    answer: "Sim. Oferecemos suporte pós-venda via WhatsApp para garantir que a transferência da conta aconteça corretamente."
  }
];

function FaqItem({ question, answer, isOpen, onToggle, index }: FaqItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`${styles.faqCard} ${isOpen ? styles.open : ""}`}>
      <button
        type="button"
        className={styles.questionButton}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-btn-${index}`}
      >
        <span className={styles.questionText}>{question}</span>
        <div className={styles.arrowWrapper}>
          <ChevronDown size={20} className={styles.arrowIcon} />
        </div>
      </button>
      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-btn-${index}`}
        className={styles.answerWrapper}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
      >
        <div ref={contentRef} className={styles.answerContent}>
          <p className={styles.answerText}>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.container}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Dúvidas Frequentes</h2>
        <div className={styles.faqList}>
          {FAQ_ITEMS.map((item, index) => (
            <FaqItem
              key={index}
              index={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
