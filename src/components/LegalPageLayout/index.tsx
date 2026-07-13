import { ReactNode } from "react";
import styles from "./LegalPageLayout.module.scss";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <main className={styles.container}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.lastUpdated}>Última atualização: {lastUpdated}</p>
        </header>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </main>
  );
}
