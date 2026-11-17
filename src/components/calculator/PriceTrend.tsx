'use client';

import { useId, useState, type PointerEvent } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import styles from './PriceTrend.module.css';

type PriceTrendProps = {
  title: string;
  /** Price in each year of the period, first year first. */
  prices: number[];
  startYear: number;
  formatPrice: (price: number) => string;
  color: string;
};

/**
 * Hint button that reveals how a price develops year by year under the
 * entered growth rate. Opens on mouse hover, keyboard focus, or a tap.
 */
export function PriceTrend({ title, prices, startYear, formatPrice, color }: PriceTrendProps) {
  const t = useTranslations('priceTrend');
  const format = useFormatter();
  const id = useId();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tapped, setTapped] = useState(false);
  const visible = hovered || focused || tapped;

  const onMouse = (value: boolean) => (event: PointerEvent) => {
    if (event.pointerType === 'mouse') setHovered(value);
  };
  const max = Math.max(...prices.map(Math.abs), Number.EPSILON);
  const first = prices[0];
  const last = prices[prices.length - 1];
  const change = first === 0 ? 0 : last / first - 1;

  return (
    <span className={styles.wrap} onPointerEnter={onMouse(true)} onPointerLeave={onMouse(false)}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={visible}
        aria-controls={id}
        onClick={() => setTapped((open) => !open)}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          setTapped(false);
        }}
        onKeyDown={(event) => {
          if (event.key !== 'Escape') return;
          setFocused(false);
          setTapped(false);
          setHovered(false);
        }}
      >
        {t('trigger')}
      </button>
      <span id={id} className={styles.pop} hidden={!visible}>
        <span className={styles.title}>{title}</span>
        <span className={styles.rows}>
          {prices.map((price, i) => (
            <span key={i} className={styles.row}>
              <span className={styles.year}>{startYear + i}</span>
              <span className={styles.track}>
                <span
                  className={styles.bar}
                  style={{ width: `${(Math.abs(price) / max) * 100}%`, background: color }}
                />
              </span>
              <span className={styles.value}>{formatPrice(price)}</span>
            </span>
          ))}
        </span>
        <span className={styles.summary}>
          {t('change', {
            change: format.number(change, {
              style: 'percent',
              maximumFractionDigits: 1,
              signDisplay: 'exceptZero',
            }),
            year: startYear + prices.length - 1,
          })}
        </span>
      </span>
    </span>
  );
}
