import { useTranslations } from 'next-intl';
import { DEFAULT_INPUTS } from '@/domain/defaults';
import { breakEvenKmPerYear } from '@/domain/insights';
import { chargingMix } from '@/domain/tco';
import { useFormats } from '@/i18n/useFormats';
import block from '@/components/ui/Block.module.css';
import { JsonLd } from './JsonLd';
import styles from './Faq.module.css';

const QUESTIONS = ['worthIt', 'tax', 'thg', 'insurance', 'maintenance', 'charging', 'battery'] as const;

/** Answers quote the calculator's default inputs, so they stay in sync with them. */
function useDefaultFigures() {
  const { eur, integer, oneDecimal } = useFormats();
  const { scenario, ice, ev } = DEFAULT_INPUTS;
  const breakEven = breakEvenKmPerYear(DEFAULT_INPUTS);
  if (breakEven.kind !== 'at') {
    throw new Error(`FAQ expects a finite break-even for the default inputs, got "${breakEven.kind}"`);
  }
  return {
    iceValue: eur(ice.valueEur),
    evPrice: eur(ev.priceEur),
    years: scenario.years,
    breakEvenKm: integer(breakEven.km),
    thg: eur(ev.thgPremiumEur),
    evInsurance: eur(ev.insuranceEur),
    iceInsurance: eur(ice.insuranceEur),
    evMaintenance: eur(ev.maintenanceEur),
    iceMaintenance: eur(ice.maintenanceEur),
    evTires: eur(ev.tiresEur),
    iceTires: eur(ice.tiresEur),
    homeShare: ev.homeSharePct,
    avgCt: oneDecimal(chargingMix(ev).avgPriceEurPerKwh * 100),
  };
}

export function Faq() {
  const t = useTranslations('faq');
  const figures = useDefaultFigures();
  const entries = QUESTIONS.map((key) => ({
    key,
    question: t(`items.${key}.q`),
    answer: t(`items.${key}.a`, figures),
  }));

  return (
    <section className={block.block} aria-labelledby="faq-heading">
      <h2 id="faq-heading">{t('title')}</h2>
      <div className={styles.grid}>
        {entries.map(({ key, question, answer }) => (
          <div key={key} className={styles.item}>
            <h3>{question}</h3>
            <p>{answer}</p>
          </div>
        ))}
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: entries.map(({ question, answer }) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: { '@type': 'Answer', text: answer },
          })),
        }}
      />
    </section>
  );
}
