'use client';

import { useLayoutEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useFormats } from '@/i18n/useFormats';
import styles from './CostChart.module.css';

type ChartTooltipProps = {
  year: number;
  inForecast: boolean;
  iceEur: number;
  evEur: number;
  /** Horizontal position of the crosshair in pixels from the chart's left edge. */
  anchorX: number;
  containerWidth: number;
};

const OFFSET = 12;

export function ChartTooltip({
  year,
  inForecast,
  iceEur,
  evEur,
  anchorX,
  containerWidth,
}: ChartTooltipProps) {
  const t = useTranslations('chart');
  const f = useFormats();
  const ref = useRef<HTMLDivElement>(null);
  const diff = evEur - iceEur;

  // Placement depends on the rendered width, so it is measured after layout.
  useLayoutEffect(() => {
    const tip = ref.current;
    if (!tip) return;
    const tipWidth = tip.offsetWidth;
    const preferred = anchorX > containerWidth / 2 ? anchorX - tipWidth - OFFSET : anchorX + OFFSET;
    tip.style.left = `${Math.max(0, Math.min(containerWidth - tipWidth, preferred))}px`;
  }, [anchorX, containerWidth]);

  return (
    <div className={styles.tip} ref={ref}>
      <span className={styles.tipHead}>
        {year === 0
          ? t('tooltipToday')
          : t(inForecast ? 'tooltipForecast' : 'tooltipSoldAfter', { years: year })}
      </span>
      <span className={styles.tipRow}>
        <span>
          <i style={{ background: 'var(--ice)' }} />
          {t('ice')}
        </span>
        <b>{f.eur(iceEur)}</b>
      </span>
      <span className={styles.tipRow}>
        <span>
          <i style={{ background: 'var(--ev)' }} />
          {t('ev')}
        </span>
        <b>{f.eur(evEur)}</b>
      </span>
      <span className={styles.tipRow}>
        <span>{diff > 0 ? t('iceAhead') : diff < 0 ? t('evAhead') : t('even')}</span>
        <b>{f.eur(Math.abs(diff))}</b>
      </span>
    </div>
  );
}
