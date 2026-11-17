'use client';

import { useTranslations } from 'next-intl';
import { useFormats } from '@/i18n/useFormats';
import type { ChartGeometry } from './chartGeometry';
import styles from './CostChart.module.css';

/** Horizontal gridlines with euro labels, and year labels along the bottom. */
export function ChartAxes({ g }: { g: ChartGeometry }) {
  const t = useTranslations('chart');
  const f = useFormats();
  const euroLabel = (eur: number) =>
    Math.abs(eur) >= 1000
      ? t('thousandsEur', { value: f.oneDecimal(eur / 1000) })
      : t('eur', { value: f.integer(eur) });

  return (
    <g>
      {g.yTicks.map((eur) => (
        <g key={eur}>
          <line
            x1={g.plotLeft}
            x2={g.plotRight}
            y1={g.y(eur)}
            y2={g.y(eur)}
            stroke="var(--line)"
            strokeDasharray={eur === 0 ? undefined : '2 3'}
          />
          <text x={g.plotLeft - 8} y={g.y(eur) + 4} textAnchor="end" className={styles.axis}>
            {euroLabel(eur)}
          </text>
        </g>
      ))}
      {g.xTicks.map((year) => (
        <text key={year} x={g.x(year)} y={g.height - 8} textAnchor="middle" className={styles.axis}>
          {year === 0 ? t('today') : t('yearTick', { years: year })}
        </text>
      ))}
    </g>
  );
}
