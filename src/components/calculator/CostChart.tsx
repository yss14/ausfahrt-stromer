'use client';

import { useRef, useState, type PointerEvent } from 'react';
import { useTranslations } from 'next-intl';
import block from '@/components/ui/Block.module.css';
import { firstCurveCrossing } from '@/domain/insights';
import { FORECAST_YEARS, type TcoResult } from '@/domain/tco';
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

const toPath = (points: [number, number][]) =>
  points.map(([px, py], i) => `${i ? 'L' : 'M'}${px.toFixed(1)},${py.toFixed(1)}`).join('');

/**
 * Cumulative cost if the car is sold after n years, for both options. Solid
 * for the chosen period, dashed for the forecast years after it.
 */
export function CostChart({ result }: { result: TcoResult }) {
  const t = useTranslations('chart');
  const boxRef = useRef<HTMLDivElement>(null);
  const width = useElementWidth(boxRef, 560);
  const [hoverYear, setHoverYear] = useState<number | null>(null);

  const { years } = result;
  const g = chartGeometry(result, width);
  const series = {
    ice: [...result.ice.curve, ...result.ice.forecast],
    ev: [...result.ev.curve, ...result.ev.forecast],
  };
  const activeYear = hoverYear === null ? null : Math.min(hoverYear, g.lastYear);
  const crossing = firstCurveCrossing(result);
  const labels = endLabelPositions(g.y(series.ice[g.lastYear]), g.y(series.ev[g.lastYear]));
  const pathBetween = (values: number[], from: number, to: number) =>
    toPath(values.slice(from, to + 1).map((v, i) => [g.x(from + i), g.y(v)]));

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
          aria-label={t('ariaLabel', { years, forecast: FORECAST_YEARS })}
        >
          <rect
            className={styles.forecastZone}
            x={g.x(years)}
            y={g.plotTop}
            width={g.x(g.lastYear) - g.x(years)}
            height={g.plotBottom - g.plotTop}
          />
          <text x={g.x(years) + 6} y={g.plotBottom - 7} className={styles.axis}>
            {t('forecast')}
          </text>

          <ChartAxes g={g} />

          {SERIES.map(({ side, color }) => (
            <g
              key={side}
              fill="none"
              stroke={color}
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              <path d={pathBetween(series[side], 0, years)} />
              <path d={pathBetween(series[side], years, g.lastYear)} strokeDasharray="5 5" />
            </g>
          ))}

          {crossing && <BreakEvenMarker crossing={crossing} g={g} />}

          {SERIES.map(({ side, color }) => (
            <g key={side}>
              <circle
                cx={g.x(years)}
                cy={g.y(series[side][years])}
                r={4.5}
                fill={color}
                stroke="var(--surface)"
                strokeWidth={2}
              />
              <text x={g.x(g.lastYear) + 9} y={labels[side] + 4} className={styles.endLabel}>
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
                  cy={g.y(series[side][activeYear])}
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
            inForecast={activeYear > years}
            iceEur={series.ice[activeYear]}
            evEur={series.ev[activeYear]}
            anchorX={g.x(activeYear)}
            containerWidth={g.width}
          />
        )}
      </div>
      <p className={styles.note}>{t('note', { forecast: FORECAST_YEARS })}</p>
    </div>
  );
}
