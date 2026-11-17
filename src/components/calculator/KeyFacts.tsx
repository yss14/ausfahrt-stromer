'use client';

import { useTranslations } from 'next-intl';
import block from '@/components/ui/Block.module.css';
import type { CalculatorInputs } from '@/domain/inputs';
import {
  BREAK_EVEN_KM_CAP,
  breakEvenKmPerYear,
  breakEvenYear,
  cashNeededToday,
  type BreakEvenKm,
  type BreakEvenYear,
} from '@/domain/insights';
import type { TcoResult } from '@/domain/tco';
import { useFormats, type Formats } from '@/i18n/useFormats';
import styles from './KeyFacts.module.css';

type FactsT = ReturnType<typeof useTranslations<'facts'>>;
type Fact = { label: string; value: string; detail: string };

function breakEvenKmFact(km: BreakEvenKm, t: FactsT, f: Formats): Fact {
  const label = t('breakEvenKm');
  switch (km.kind) {
    case 'always':
      return { label, value: t('breakEvenKmAlways'), detail: t('breakEvenKmAlwaysSub') };
    case 'tooHigh':
      return {
        label,
        value: t('breakEvenKmTooHigh', { km: f.integer(BREAK_EVEN_KM_CAP) }),
        detail: t('breakEvenKmTooHighSub'),
      };
    case 'at':
      return { label, value: t('breakEvenKmAt', { km: f.integer(km.km) }), detail: t('breakEvenKmAtSub') };
    case 'never':
      return { label, value: t('breakEvenKmNever'), detail: t('breakEvenKmNeverSub') };
  }
}

function breakEvenYearFact(
  year: BreakEvenYear,
  result: TcoResult,
  kmPerYear: number,
  t: FactsT,
  f: Formats,
): Fact {
  const label = t('breakEvenYear');
  switch (year.kind) {
    case 'at': {
      const km = Math.round((year.years * kmPerYear) / 1000) * 1000;
      return {
        label,
        value: t('breakEvenYearAt', { years: f.oneDecimal(year.years) }),
        detail: t('breakEvenYearAtSub', { km: f.integer(km) }),
      };
    }
    case 'immediately':
      return { label, value: t('breakEvenYearImmediately'), detail: t('breakEvenYearImmediatelySub') };
    case 'notWithin':
      return {
        label,
        value: t('breakEvenYearNotWithin', { years: result.years }),
        detail: t(year.evBehind ? 'breakEvenYearEvBehind' : 'breakEvenYearLeadShrinks'),
      };
  }
}

export function KeyFacts({ inputs, result }: { inputs: CalculatorInputs; result: TcoResult }) {
  const t = useTranslations('facts');
  const f = useFormats();
  const cash = cashNeededToday(inputs);

  const facts: Fact[] = [
    breakEvenKmFact(breakEvenKmPerYear(inputs), t, f),
    breakEvenYearFact(breakEvenYear(result), result, inputs.scenario.kmPerYear, t, f),
    { label: t('cash'), value: f.signedEur(cash.eur), detail: t(`cashBasis.${cash.basis}`) },
  ];

  return (
    <div className={block.block}>
      <div className={styles.facts}>
        {facts.map((fact) => (
          <div key={fact.label} className={styles.fact}>
            <span className={styles.label}>{fact.label}</span>
            <span className={styles.value}>{fact.value}</span>
            <span className={styles.detail}>{fact.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
