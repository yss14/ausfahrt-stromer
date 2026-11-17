import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './LegalPage.module.css';

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  const t = useTranslations('legal');
  return (
    <main className={styles.page}>
      <Link href="/" className={styles.back}>
        {t('back')}
      </Link>
      <h1>{title}</h1>
      {children}
    </main>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
