import type { TcoResult } from '@/domain/tco';

export const CHART_HEIGHT = 250;
export const MIN_CHART_WIDTH = 280;
const PAD = { left: 58, right: 74, top: 14, bottom: 30 };

/** Round step for about four gridlines: 1, 2, 2.5, 5 or 10 times a power of ten. */
function niceStep(range: number): number {
  const raw = range / 4;
  const magnitude = Math.pow(10, Math.floor(Math.log10(raw)));
  const n = raw / magnitude;
  const factor = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return factor * magnitude;
}

export type ChartGeometry = {
  width: number;
  height: number;
  plotLeft: number;
  plotRight: number;
  plotTop: number;
  plotBottom: number;
  x: (years: number) => number;
  y: (eur: number) => number;
  yTicks: number[];
  xTicks: number[];
  /** Nearest whole year for a horizontal position in chart units. */
  yearAt: (chartX: number) => number;
};

export function chartGeometry(result: TcoResult, containerWidth: number): ChartGeometry {
  const width = Math.max(MIN_CHART_WIDTH, containerWidth);
  const height = CHART_HEIGHT;
  const { years } = result;
  const values = [...result.ice.curve, ...result.ev.curve];
  const low = Math.min(0, ...values);
  const highRaw = Math.max(1, ...values);
  const step = niceStep(highRaw - low);
  const yMax = Math.ceil(highRaw / step) * step;
  const yMin = Math.floor(low / step) * step;

  const plotLeft = PAD.left;
  const plotRight = width - PAD.right;
  const plotTop = PAD.top;
  const plotBottom = height - PAD.bottom;
  const x = (t: number) => plotLeft + ((plotRight - plotLeft) * t) / years;
  const y = (v: number) => plotTop + (plotBottom - plotTop) * (1 - (v - yMin) / (yMax - yMin));

  const yTickCount = Math.round((yMax - yMin) / step);
  const xTickEvery = years > 8 ? 2 : 1;

  return {
    width,
    height,
    plotLeft,
    plotRight,
    plotTop,
    plotBottom,
    x,
    y,
    yTicks: Array.from({ length: yTickCount + 1 }, (_, i) => yMin + i * step),
    xTicks: Array.from({ length: Math.floor(years / xTickEvery) + 1 }, (_, i) => i * xTickEvery),
    yearAt: (chartX) =>
      Math.max(0, Math.min(years, Math.round(((chartX - plotLeft) / (plotRight - plotLeft)) * years))),
  };
}

const MIN_LABEL_GAP = 16;

/** Vertical label positions for the two line ends, pushed apart when they would overlap. */
export function endLabelPositions(iceY: number, evY: number): { ice: number; ev: number } {
  if (Math.abs(iceY - evY) >= MIN_LABEL_GAP) return { ice: iceY, ev: evY };
  const mid = (iceY + evY) / 2;
  const half = MIN_LABEL_GAP / 2;
  return iceY < evY ? { ice: mid - half, ev: mid + half } : { ice: mid + half, ev: mid - half };
}
