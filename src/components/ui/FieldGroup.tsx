import type { ReactNode } from 'react';
import block from './Block.module.css';

/** A titled two-column grid of fields inside a section. */
export function FieldGroup({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <>
      {title && <div className={block.groupLabel}>{title}</div>}
      <div className={block.grid}>{children}</div>
    </>
  );
}
