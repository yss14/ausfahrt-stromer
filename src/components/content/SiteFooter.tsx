import { useTranslations } from 'next-intl';
import { SOURCE_CODE_URL } from '@/config/legal';
import { Link } from '@/i18n/navigation';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  const t = useTranslations('footer');
  return (
    <footer className={styles.footer}>
      <nav aria-label={t('label')} className={styles.links}>
        <Link href="/impressum">{t('imprint')}</Link>
        <Link href="/datenschutz">{t('privacy')}</Link>
        <a href={SOURCE_CODE_URL} target="_blank" rel="noopener">
          {t('source')}
        </a>
      </nav>
    </footer>
  );
}
