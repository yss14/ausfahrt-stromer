'use client';

import { useRef, useState, type PointerEvent } from 'react';
import { useTranslations } from 'next-intl';
import block from '@/components/ui/Block.module.css';
import { firstCurveCrossing } from '@/domain/insights';
import type { TcoResult } from '@/domain/tco';
import { BreakEvenMarker } from './BreakEvenMarker';
import { ChartAxes } from './ChartAxes';
import { chartGeometry, endLabelPositions } from './chartGeometry';
import { ChartTooltip } from './ChartTooltip';
import styles from './CostChart.module.css';
import { useElementWidth } from './useElementWidth';

const SERIES = [
  { side: 'ice', color: 'var(--ice)' },
  { side: 'ev', color: 'var(--ev)' },
] as const;

/** Cumulative cost if the car is sold after n years, for both options. */
export function CostChart({ result }: { result: TcoResult }) {
  const t = useTranslations('chart');
  const boxRef = useRef<HTMLDivElement>(null);
  const width = useElementWidth(boxRef, 560);
  const [hoverYear, setHoverYear] = useState<number | null>(null);

  const { years } = result;
  const g = chartGeometry(result, width);
  const activeYear = hoverYear === null ? null : Math.min(hoverYear, years);
  const crossing = firstCurveCrossing(result);
  const labels = endLabelPositions(g.y(result.ice.curve[years]), g.y(result.ev.curve[years]));
  const path = (curve: number[]) =>
    curve.map((v, i) => `${i ? 'L' : 'M'}${g.x(i).toFixed(1)},${g.y(v).toFixed(1)}`).join('');

  const trackPointer = (event: PointerEvent<SVGRectElement>) => {
    const svg = event.currentTarget.ownerSVGElement;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setHoverYear(g.yearAt(((event.clientX - rect.left) * g.width) / rect.width));
  };

  return (
    <div className={block.block}>
      <div className={styles.head}>
        <h3>{t('title')}</h3>
        <div className={styles.legend}>
          {SERIES.map(({ side, color }) => (
            <span key={side}>
              <i style={{ background: color }} />
              {t(side)}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.box} ref={boxRef}>
        <svg
          viewBox={`0 0 ${g.width} ${g.height}`}
          width={g.width}
          height={g.height}
          role="img"
          aria-label={t('ariaLabel', { years })}
        >
          <ChartAxes g={g} />

          {SERIES.map(({ side, color }) => (
            <path
              key={side}
              d={path(result[side].curve)}
              fill="none"
              stroke={color}
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}

          {crossing && <BreakEvenMarker crossing={crossing} g={g} />}

          {SERIES.map(({ side, color }) => (
            <g key={side}>
              <circle
                cx={g.x(years)}
                cy={g.y(result[side].curve[years])}
                r={4.5}
                fill={color}
                stroke="var(--surface)"
                strokeWidth={2}
              />
              <text x={g.x(years) + 9} y={labels[side] + 4} className={styles.endLabel}>
                {t(side)}
              </text>
            </g>
          ))}

          {activeYear !== null && (
            <g>
              <line
                x1={g.x(activeYear)}
                x2={g.x(activeYear)}
                y1={g.plotTop}
                y2={g.plotBottom}
                stroke="var(--ink-3)"
              />
              {SERIES.map(({ side, color }) => (
                <circle
                  key={side}
                  cx={g.x(activeYear)}
                  cy={g.y(result[side].curve[activeYear])}
                  r={5}
                  fill={color}
                  stroke="var(--surface)"
                  strokeWidth={2}
                />
              ))}
            </g>
          )}

          <rect
            className={styles.hitArea}
            x={g.plotLeft - 10}
            y={0}
            width={g.plotRight - g.plotLeft + 20}
            height={g.height}
            onPointerMove={trackPointer}
            onPointerDown={trackPointer}
            onPointerLeave={() => setHoverYear(null)}
          />
        </svg>
        {activeYear !== null && (
          <ChartTooltip
            year={activeYear}
            iceEur={result.ice.curve[activeYear]}
            evEur={result.ev.curve[activeYear]}
            anchorX={g.x(activeYear)}
            containerWidth={g.width}
          />
        )}
      </div>
      <p className={styles.note}>{t('note')}</p>
    </div>
  );
}
