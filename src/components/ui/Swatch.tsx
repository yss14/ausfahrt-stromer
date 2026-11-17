import styles from './Swatch.module.css';

export type Side = 'ice' | 'ev';

export function Swatch({ side, small }: { side: Side; small?: boolean }) {
  return <span aria-hidden className={`${styles.swatch} ${styles[side]} ${small ? styles.small : ''}`} />;
}
