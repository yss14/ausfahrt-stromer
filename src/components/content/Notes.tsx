import { useTranslations } from 'next-intl';
import { SOURCES } from '@/domain/defaults';
import block from '@/components/ui/Block.module.css';
import styles from './Notes.module.css';

const HOW_IT_WORKS = ['tco', 'tradeIn', 'residual', 'interest', 'taxExemption', 'oneOffs'] as const;
const CHECKLIST = ['soh', 'warranty', 'registration', 'heatPump', 'insurance'] as const;

export function Notes() {
  const t = useTranslations('notes');
  const bold = (chunks: React.ReactNode) => <b>{chunks}</b>;

  return (
    <section className={styles.notes} aria-label={t('label')}>
      <div className={block.block}>
        <h2>{t('howItWorks.title')}</h2>
        <ul className={styles.list}>
          {HOW_IT_WORKS.map((key) => (
            <li key={key}>{t(`howItWorks.items.${key}`)}</li>
          ))}
        </ul>
      </div>
      <div className={block.block}>
        <h2>{t('checklist.title')}</h2>
        <ul className={styles.list}>
          {CHECKLIST.map((key) => (
            <li key={key}>{t.rich(`checklist.items.${key}`, { b: bold })}</li>
          ))}
        </ul>
      </div>
      <div className={block.block}>
        <h2>{t('sources.title')}</h2>
        <ul className={styles.list}>
          {SOURCES.map(({ key, url }) => (
            <li key={key}>
              <a href={url} target="_blank" rel="noopener">
                {t(`sources.items.${key}`)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
