'use client';

import { useTranslations } from 'next-intl';
import type { Mode } from '@/domain/inputs';
import type { Verdict } from '@/domain/insights';
import { useFormats } from '@/i18n/useFormats';
import styles from './VerdictSign.module.css';

type VerdictSignProps = { verdict: Verdict; mode: Mode; years: number };

/** The bottom line as a yellow diversion sign. */
export function VerdictSign({ verdict, mode, years }: VerdictSignProps) {
  const t = useTranslations('verdict');
  const f = useFormats();
  const span = t('span', { years });
  const perMonth = (eur: number) => f.eur(eur / (years * 12));

  const [main, sub] = (() => {
    switch (verdict.kind) {
      case 'tie':
        return [t('tie', { span }), t('tieSub')];
      case 'evCheaper':
        return [
          t('evCheaper', { mode, amount: f.eur(verdict.diff), span }),
          t('evCheaperSub', { perMonth: perMonth(verdict.diff) }),
        ];
      case 'iceCheaper':
        return [
          t('iceCheaper', { mode, amount: f.eur(verdict.diff), span }),
          t('iceCheaperSub', { perMonth: perMonth(verdict.diff) }),
        ];
    }
  })();

  return (
    <div className={styles.verdict}>
      <span className={styles.main}>{main}</span>
      <span className={styles.sub}>{sub}</span>
    </div>
  );
}
