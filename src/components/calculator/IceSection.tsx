'use client';

import { useId } from 'react';
import { useTranslations } from 'next-intl';
import { NumberField } from '@/components/fields/NumberField';
import { SelectField } from '@/components/fields/SelectField';
import block from '@/components/ui/Block.module.css';
import { FieldGroup } from '@/components/ui/FieldGroup';
import { Swatch } from '@/components/ui/Swatch';
import { FUELS, type Fuel, type IceInputs, type ScenarioInputs } from '@/domain/inputs';
import { IceRunningCostFields } from './IceRunningCostFields';
import type { GroupSetter, NumericKey } from './inputsReducer';
import { ResidualField } from './ResidualField';

type IceSectionProps = {
  ice: IceInputs;
  scenario: ScenarioInputs;
  autoResidualEur: number;
  set: GroupSetter<'ice'>;
  onFuelChange: (fuel: Fuel) => void;
  onApplyTaxHelper: () => void;
};

export function IceSection({
  ice,
  scenario,
  autoResidualEur,
  set,
  onFuelChange,
  onApplyTaxHelper,
}: IceSectionProps) {
  const t = useTranslations('ice');
  const tUnits = useTranslations('units');
  const headingId = useId();
  const { mode } = scenario;
  const bind = (key: NumericKey<IceInputs>) => ({
    value: ice[key],
    onChange: (value: number) => set(key, value),
  });

  return (
    <section className={block.block} aria-labelledby={headingId}>
      <div className={block.head}>
        <Swatch side="ice" />
        <h2 id={headingId}>{t('heading')}</h2>
        <span className={block.sub}>{t('sub', { mode })}</span>
      </div>
      <FieldGroup>
        <SelectField
          label={t('fuel')}
          value={ice.fuel}
          options={FUELS.map((fuel) => ({ value: fuel, label: t(`fuels.${fuel}`) }))}
          onChange={onFuelChange}
        />
        <NumberField
          label={t('consumption')}
          unit={tUnits('litersPer100Km')}
          {...bind('consumptionLPer100')}
          min={2}
          max={20}
          step={0.1}
        />
        <NumberField
          label={t('fuelPrice')}
          hint={t('fuelPriceHint')}
          unit={tUnits('eurPerLiter')}
          {...bind('fuelPriceEurPerL')}
          min={0.5}
          max={4}
          step={0.01}
        />
        <NumberField
          label={t('fuelPriceGrowth')}
          hint={t('fuelPriceGrowthHint')}
          unit={tUnits('pctPerYear')}
          {...bind('fuelPriceGrowthPct')}
          min={-5}
          max={15}
          step={0.5}
        />
      </FieldGroup>

      <FieldGroup title={t('valueGroup')}>
        <NumberField
          label={t('value', { mode })}
          hint={t('valueHint', { mode })}
          unit={tUnits('eur')}
          {...bind('valueEur')}
          min={0}
          step={250}
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
          wide
          endYear={scenario.startYear + scenario.years}
          depreciationPct={ice.depreciationPct}
          autoResidualEur={autoResidualEur}
          value={ice.residualOverrideEur}
          onChange={(value) => set('residualOverrideEur', value)}
        />
      </FieldGroup>

      <IceRunningCostFields ice={ice} mode={mode} set={set} onApplyTaxHelper={onApplyTaxHelper} />
    </section>
  );
}
