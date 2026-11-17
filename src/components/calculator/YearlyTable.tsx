'use client';

import { useTranslations } from 'next-intl';
import type { TcoResult } from '@/domain/tco';
import { CostTable, type CostRow } from './CostTable';
import styles from './YearlyTable.module.css';

/** Cumulative cost per option if the car is sold at the start of each year. */
export function YearlyTable({ result, startYear }: { result: TcoResult; startYear: number }) {
  const t = useTranslations('breakdown');

  const rows: CostRow[] = Array.from({ length: result.years }, (_, i) => {
    const afterYears = i + 1;
    return {
      key: afterYears,
      label: t('yearRow', { year: startYear + afterYears, years: afterYears }),
      ice: result.ice.curve[afterYears],
      ev: result.ev.curve[afterYears],
    };
  });

  return (
    <details className={styles.yearly}>
      <summary>{t('yearlySummary')}</summary>
      <CostTable firstColumn={t('soldAtStartOf')} rows={rows} />
    </details>
  );
}
