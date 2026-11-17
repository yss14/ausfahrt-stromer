'use client';

import { useTranslations } from 'next-intl';
import { Swatch } from '@/components/ui/Swatch';
import { useFormats } from '@/i18n/useFormats';
import styles from './CostTable.module.css';

/** Amounts below half a euro render as a dash. */
export const isBlank = (eur: number) => Math.abs(eur) < 0.5;

export type CostRow = { key: string | number; label: string; ice: number; ev: number };

type CostTableProps = {
  firstColumn: string;
  rows: CostRow[];
  footer?: CostRow;
};

/** Side-by-side costs with a coloured EV-minus-ICE difference column. */
export function CostTable({ firstColumn, rows, footer }: CostTableProps) {
  const t = useTranslations('breakdown');
  const f = useFormats();

  const amount = (eur: number) => (isBlank(eur) ? <span className={styles.muted}>–</span> : f.eur(eur));
  const diffCell = (diff: number) =>
    isBlank(diff) ? (
      <td className={styles.muted}>–</td>
    ) : (
      <td className={diff > 0 ? styles.evMore : styles.evLess}>{f.signedEur(diff)}</td>
    );
  const cells = (row: CostRow) => (
    <>
      <td>{row.label}</td>
      <td>{amount(row.ice)}</td>
      <td>{amount(row.ev)}</td>
      {diffCell(row.ev - row.ice)}
    </>
  );

  return (
    <div className={styles.scroll}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{firstColumn}</th>
            <th>
              <Swatch side="ice" small />
              {t('ice')}
            </th>
            <th>
              <Swatch side="ev" small />
              {t('ev')}
            </th>
            <th>{t('difference')}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>{cells(row)}</tr>
          ))}
        </tbody>
        {footer && (
          <tfoot>
            <tr>{cells(footer)}</tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
