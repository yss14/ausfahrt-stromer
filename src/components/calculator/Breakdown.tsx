'use client';

import { useTranslations } from 'next-intl';
import fieldStyles from '@/components/fields/Field.module.css';
import block from '@/components/ui/Block.module.css';
import type { CalculatorInputs } from '@/domain/inputs';
import { co2Tonnes, KG_CO2_PER_KWH } from '@/domain/insights';
import { COST_CATEGORIES, type TcoResult } from '@/domain/tco';
import { useFormats } from '@/i18n/useFormats';
import { CostTable, isBlank, type CostRow } from './CostTable';
import { YearlyTable } from './YearlyTable';

export function Breakdown({ inputs, result }: { inputs: CalculatorInputs; result: TcoResult }) {
  const t = useTranslations('breakdown');
  const tVerdict = useTranslations('verdict');
  const f = useFormats();
  const { ice, ev, years } = result;

  const rows: CostRow[] = COST_CATEGORIES.filter(
    ({ key }) => !isBlank(ice.costs[key]) || !isBlank(ev.costs[key]),
  ).map(({ key }) => ({ key, label: t(`categories.${key}`), ice: ice.costs[key], ev: ev.costs[key] }));

  const co2 = co2Tonnes(result, inputs);

  return (
    <div className={block.block}>
      <h3>{t('title', { years })}</h3>
      <CostTable
        firstColumn={t('item')}
        rows={rows}
        footer={{ key: 'total', label: t('total'), ice: ice.total, ev: ev.total }}
      />
      <YearlyTable result={result} startYear={inputs.scenario.startYear} />
      <p className={fieldStyles.hint}>
        {t('co2', {
          span: tVerdict('span', { years }),
          ice: f.oneDecimal(co2.ice),
          ev: f.oneDecimal(co2.ev),
          gridFactor: f.number(KG_CO2_PER_KWH),
        })}
      </p>
    </div>
  );
}
