'use client';

import { useId } from 'react';
import { useTranslations } from 'next-intl';
import { SeriesChip } from '@/components/ui/SeriesChip';
import type { Side } from '@/components/ui/Swatch';
import type { ScenarioInputs } from '@/domain/inputs';
import type { Verdict } from '@/domain/insights';
import type { TcoResult } from '@/domain/tco';
import { useFormats } from '@/i18n/useFormats';
import styles from './ResultSign.module.css';

/** Like a motorway sign: keeping the car is straight on, switching is the exit. */
const ARROWS: Record<Side, string> = {
  ice: 'M16 28V8M8 15l8-8 8 8',
  ev: 'M8 24L24 8M12 8h12v12',
};

const WINNER: Record<Verdict['kind'], Side | null> = { tie: null, evCheaper: 'ev', iceCheaper: 'ice' };

type ResultSignProps = { result: TcoResult; scenario: ScenarioInputs; verdict: Verdict };

/** The result as a blue motorway direction sign with one destination per option. */
export function ResultSign({ result, scenario, verdict }: ResultSignProps) {
  const t = useTranslations('result');
  const f = useFormats();
  const months = result.years * 12;
  const totalKm = result.years * scenario.kmPerYear;
  const winner = WINNER[verdict.kind];
  const titleId = useId();

  const destination = (side: Side) => {
    const { total } = result[side];
    return (
      <div className={styles.destination}>
        <svg viewBox="0 0 32 32" aria-hidden>
          <path d={ARROWS[side]} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" />
        </svg>
        <span className={styles.name}>
          <span className={styles.nameRow}>
            <SeriesChip side={side} />
            <span>{t(side === 'ice' ? 'iceName' : 'evName', { mode: scenario.mode })}</span>
            {winner === side && <span className={styles.badge}>{t('cheaper')}</span>}
          </span>
          <small>
            {t('perMonthAndKm', {
              perMonth: f.eur(total / months),
              ctPerKm: f.oneDecimal((total / totalKm) * 100),
            })}
          </small>
        </span>
        <span className={styles.total}>{f.eur(total)}</span>
      </div>
    );
  };

  return (
    <div className={styles.sign} role="group" aria-labelledby={titleId}>
      <div className={styles.top}>
        <span id={titleId}>{t('signTitle', { years: result.years })}</span>
        <span className={styles.km}>{t('kmPerYear', { km: f.integer(scenario.kmPerYear) })}</span>
      </div>
      {destination('ice')}
      {destination('ev')}
    </div>
  );
}
