'use client';

import { useId } from 'react';
import { useTranslations } from 'next-intl';
import { NumberField } from '@/components/fields/NumberField';
import block from '@/components/ui/Block.module.css';
import { FieldGroup } from '@/components/ui/FieldGroup';
import { Swatch } from '@/components/ui/Swatch';
import type { EvInputs, ScenarioInputs } from '@/domain/inputs';
import { evTaxExemption } from '@/domain/tax';
import type { TcoResult } from '@/domain/tco';
import { EvChargingFields } from './EvChargingFields';
import { EvRunningCostFields } from './EvRunningCostFields';
import type { GroupSetter, NumericKey } from './inputsReducer';
import { ResidualField } from './ResidualField';

type EvSectionProps = {
  ev: EvInputs;
  scenario: ScenarioInputs;
  result: TcoResult;
  set: GroupSetter<'ev'>;
};

export function EvSection({ ev, scenario, result, set }: EvSectionProps) {
  const t = useTranslations('ev');
  const tUnits = useTranslations('units');
  const headingId = useId();
  const bind = (key: NumericKey<EvInputs>) => ({
    value: ev[key],
    onChange: (value: number) => set(key, value),
  });

  const exemption = evTaxExemption(ev.firstRegistrationYear, scenario.startYear, result.years);
  const exemptionHint =
    exemption.kind === 'expired'
      ? t('exemptionExpired', { year: exemption.untilYear })
      : t.rich('exemptionActive', {
          year: exemption.untilYear,
          free: exemption.freeYears,
          years: result.years,
          b: (chunks) => <b>{chunks}</b>,
        });

  return (
    <section className={block.block} aria-labelledby={headingId}>
      <div className={block.head}>
        <Swatch side="ev" />
        <h2 id={headingId}>{t('heading')}</h2>
        <span className={block.sub}>{t('sub')}</span>
      </div>
      <FieldGroup>
        <NumberField label={t('price')} unit={tUnits('eur')} {...bind('priceEur')} min={0} step={250} />
        <NumberField
          label={t('firstRegistration')}
          hint={exemptionHint}
          {...bind('firstRegistrationYear')}
          min={2011}
          max={2030}
          step={1}
        />
        <NumberField
          label={t('depreciation')}
          hint={t('depreciationHint')}
          unit={tUnits('pctPerYear')}
          {...bind('depreciationPct')}
          min={0}
          max={40}
          step={0.5}
        />
        <ResidualField
          endYear={scenario.startYear + scenario.years}
          depreciationPct={ev.depreciationPct}
          autoResidualEur={result.ev.autoResidualValue}
          value={ev.residualOverrideEur}
          onChange={(value) => set('residualOverrideEur', value)}
        />
      </FieldGroup>

      <EvChargingFields ev={ev} mix={result.mix} scenario={scenario} set={set} />
      <EvRunningCostFields ev={ev} taxAfterExemptionEur={result.evTaxAfterExemption} set={set} />

      <FieldGroup title={t('oneOffGroup')}>
        <NumberField
          label={t('wallbox')}
          hint={t('wallboxHint')}
          unit={tUnits('eur')}
          {...bind('wallboxEur')}
          min={0}
          step={50}
        />
        <NumberField
          label={t('purchaseFees')}
          hint={t('purchaseFeesHint')}
          unit={tUnits('eur')}
          {...bind('purchaseFeesEur')}
          min={0}
          step={10}
        />
      </FieldGroup>
    </section>
  );
}
