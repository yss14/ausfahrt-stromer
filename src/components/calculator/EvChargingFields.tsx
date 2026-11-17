'use client';

import { useTranslations } from 'next-intl';
import { NumberField } from '@/components/fields/NumberField';
import { RangeField } from '@/components/fields/RangeField';
import { FieldGroup } from '@/components/ui/FieldGroup';
import type { EvInputs, ScenarioInputs } from '@/domain/inputs';
import { priceTrajectory, type ChargingMix } from '@/domain/tco';
import { useFormats } from '@/i18n/useFormats';
import { ChargingMixBar } from './ChargingMixBar';
import type { GroupSetter, NumericKey } from './inputsReducer';
import { PriceTrend } from './PriceTrend';

type EvChargingFieldsProps = {
  ev: EvInputs;
  mix: ChargingMix;
  scenario: ScenarioInputs;
  set: GroupSetter<'ev'>;
};

export function EvChargingFields({ ev, mix, scenario, set }: EvChargingFieldsProps) {
  const t = useTranslations('ev');
  const tUnits = useTranslations('units');
  const tFormat = useTranslations('format');
  const f = useFormats();
  const bind = (key: NumericKey<EvInputs>) => ({
    value: ev[key],
    onChange: (value: number) => set(key, value),
  });

  return (
    <FieldGroup title={t('chargingGroup')}>
      <NumberField
        label={t('consumption')}
        hint={t('consumptionHint')}
        unit={tUnits('kwhPer100Km')}
        {...bind('consumptionKwhPer100')}
        min={8}
        max={40}
        step={0.5}
      />
      <NumberField
        label={t('chargingLoss')}
        hint={t('chargingLossHint')}
        unit={tUnits('pct')}
        {...bind('chargingLossPct')}
        min={0}
        max={35}
        step={1}
      />
      <RangeField
        wide
        label={t('homeShare')}
        output={tFormat('percent', { value: ev.homeSharePct })}
        {...bind('homeSharePct')}
        min={0}
        max={100}
        step={5}
      />
      <RangeField
        wide
        label={t('dcShare')}
        output={tFormat('percent', { value: ev.dcShareOfRestPct })}
        {...bind('dcShareOfRestPct')}
        min={0}
        max={100}
        step={5}
      />
      <ChargingMixBar mix={mix} />
      <NumberField
        label={t('homePrice')}
        hint={t('homePriceHint')}
        unit={tUnits('ctPerKwh')}
        {...bind('homePriceCt')}
        min={0}
        max={120}
        step={0.5}
      />
      <NumberField
        label={t('acPrice')}
        unit={tUnits('ctPerKwh')}
        {...bind('acPriceCt')}
        min={0}
        max={150}
        step={1}
      />
      <NumberField
        label={t('dcPrice')}
        unit={tUnits('ctPerKwh')}
        {...bind('dcPriceCt')}
        min={0}
        max={150}
        step={1}
      />
      <NumberField
        label={t('electricityPriceGrowth')}
        hint={
          <PriceTrend
            title={t('electricityPriceTrendTitle')}
            prices={priceTrajectory(
              mix.avgPriceEurPerKwh * 100,
              ev.electricityPriceGrowthPct,
              scenario.years,
            )}
            startYear={scenario.startYear}
            formatPrice={(ct) => tFormat('ct', { value: f.oneDecimal(ct) })}
            color="var(--ev)"
          />
        }
        unit={tUnits('pctPerYear')}
        {...bind('electricityPriceGrowthPct')}
        min={-5}
        max={15}
        step={0.5}
      />
    </FieldGroup>
  );
}
