'use client';

import { useEffect, useState, type RefObject } from 'react';
import { useTranslations } from 'next-intl';
import { SeriesChip } from '@/components/ui/SeriesChip';
import type { Verdict } from '@/domain/insights';
import type { TcoResult } from '@/domain/tco';
import { useFormats } from '@/i18n/useFormats';
import styles from './MobileResultBar.module.css';

type MobileResultBarProps = {
  result: TcoResult;
  verdict: Verdict;
  /** The bar hides while this element is on screen. */
  resultsRef: RefObject<HTMLElement | null>;
};

/** Fixed sign strip on narrow screens, so the totals stay in view while editing inputs. */
export function MobileResultBar({ result, verdict, resultsRef }: MobileResultBarProps) {
  const t = useTranslations('mobileBar');
  const f = useFormats();
  const [resultsVisible, setResultsVisible] = useState(true);

  useEffect(() => {
    const target = resultsRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setResultsVisible(entry.isIntersecting), {
      threshold: 0.05,
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [resultsRef]);

  const summary = verdict.kind === 'tie' ? t('tie') : t(verdict.kind, { amount: f.eur(verdict.diff) });

  return (
    <div className={`${styles.bar} ${resultsVisible ? styles.hidden : ''}`} aria-hidden>
      <span className={styles.item}>
        <SeriesChip side="ice" />
        <b>{f.eur(result.ice.total)}</b>
      </span>
      <span className={styles.diff}>{summary}</span>
      <span className={styles.item}>
        <b>{f.eur(result.ev.total)}</b>
        <SeriesChip side="ev" />
      </span>
    </div>
  );
}
