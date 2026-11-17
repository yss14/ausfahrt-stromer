'use client';

import { useTranslations } from 'next-intl';
import { NumberField } from '@/components/fields/NumberField';
import { RangeField } from '@/components/fields/RangeField';
import { FieldGroup } from '@/components/ui/FieldGroup';
import type { EvInputs } from '@/domain/inputs';
import type { ChargingMix } from '@/domain/tco';
import { ChargingMixBar } from './ChargingMixBar';
import type { GroupSetter, NumericKey } from './inputsReducer';

type EvChargingFieldsProps = { ev: EvInputs; mix: ChargingMix; set: GroupSetter<'ev'> };

export function EvChargingFields({ ev, mix, set }: EvChargingFieldsProps) {
  const t = useTranslations('ev');
  const tUnits = useTranslations('units');
  const tFormat = useTranslations('format');
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
        unit={tUnits('pctPerYear')}
        {...bind('electricityPriceGrowthPct')}
        min={-5}
        max={15}
        step={0.5}
      />
    </FieldGroup>
  );
}
