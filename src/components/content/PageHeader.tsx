import { useTranslations } from 'next-intl';
import styles from './PageHeader.module.css';

export function PageHeader() {
  const t = useTranslations('header');
  return (
    <header className={styles.header}>
      <span className={styles.kicker}>{t('kicker')}</span>
      <h1>{t('title')}</h1>
      <p className={styles.lead}>{t('lead')}</p>
    </header>
  );
}
