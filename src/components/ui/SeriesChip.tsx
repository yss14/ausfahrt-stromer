import styles from './SeriesChip.module.css';
import type { Side } from './Swatch';

export function SeriesChip({ side }: { side: Side }) {
  return <span aria-hidden className={`${styles.chip} ${styles[side]}`} />;
}
