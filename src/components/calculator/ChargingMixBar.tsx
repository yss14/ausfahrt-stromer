'use client';

import { useTranslations } from 'next-intl';
import type { ChargingMix } from '@/domain/tco';
import { useFormats } from '@/i18n/useFormats';
import styles from './ChargingMixBar.module.css';

const SEGMENTS = ['home', 'ac', 'dc'] as const;

export function ChargingMixBar({ mix }: { mix: ChargingMix }) {
  const t = useTranslations('ev.mix');
  const f = useFormats();

  return (
    <div className={styles.wrap}>
      <div className={styles.bar} aria-hidden>
        {SEGMENTS.filter((segment) => mix[segment] > 0).map((segment) => (
          <span key={segment} className={styles[segment]} style={{ flex: mix[segment] }} />
        ))}
      </div>
      <div className={styles.legend}>
        {SEGMENTS.map((segment) => (
          <span key={segment}>
            <i className={styles[segment]} />
            {t(segment, { pct: f.integer(mix[segment] * 100) })}
          </span>
        ))}
        <span>
          {t.rich('average', {
            price: f.oneDecimal(mix.avgPriceEurPerKwh * 100),
            b: (chunks) => <b>{chunks}</b>,
          })}
        </span>
      </div>
    </div>
  );
}
