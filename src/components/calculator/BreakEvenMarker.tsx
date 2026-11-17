'use client';

import { useTranslations } from 'next-intl';
import type { CurveCrossing } from '@/domain/insights';
import type { ChartGeometry } from './chartGeometry';
import styles from './CostChart.module.css';

/** Rough label width per character, to decide whether the label flips to the left. */
const CHAR_WIDTH = 7;

export function BreakEvenMarker({ crossing, g }: { crossing: CurveCrossing; g: ChartGeometry }) {
  const t = useTranslations('chart');
  const x = g.x(crossing.years);
  const y = g.y(crossing.costEur);
  const label = t(crossing.inForecast ? 'breakEvenForecast' : 'breakEven');
  const labelLeft = x > g.plotRight - label.length * CHAR_WIDTH;

  return (
    <g>
      <line x1={x} x2={x} y1={y} y2={g.plotBottom} stroke="var(--ink-3)" strokeDasharray="3 3" />
      <circle cx={x} cy={y} r={5} fill="var(--surface)" stroke="var(--ink)" strokeWidth={2} />
      <text
        x={x + (labelLeft ? -8 : 8)}
        y={y - 10}
        textAnchor={labelLeft ? 'end' : 'start'}
        className={styles.marker}
      >
        {label}
      </text>
    </g>
  );
}
