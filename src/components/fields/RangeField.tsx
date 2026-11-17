'use client';

import { useId } from 'react';
import styles from './RangeField.module.css';

type RangeFieldProps = {
  label: string;
  output: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  outputStyle?: 'plain' | 'kmStone';
  wide?: boolean;
};

export function RangeField({
  label,
  output,
  value,
  min,
  max,
  step,
  onChange,
  outputStyle = 'plain',
  wide,
}: RangeFieldProps) {
  const id = useId();
  return (
    <div className={`${styles.row} ${wide ? styles.wide : ''}`}>
      <div className={styles.top}>
        <label htmlFor={id}>{label}</label>
        <output
          className={`${styles.output} ${outputStyle === 'kmStone' ? styles.kmStone : ''}`}
          htmlFor={id}
        >
          {output}
        </output>
      </div>
      <input
        className={styles.range}
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={output}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}
