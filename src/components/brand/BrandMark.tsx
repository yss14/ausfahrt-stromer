import { BRAND_COLOR } from '@/config/site';

/**
 * Exit-sign arrow whose shaft is a lightning bolt, on a 32×32 grid. Keep in
 * sync with `src/app/icon.svg`, which has to stay a static file.
 */
export function BrandMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <polygon
        points="7.2,25.2 15.2,17.6 11.3,16.9 20.3,9.9 21.2,11.6 16.1,15.2 19.6,15.8"
        fill={BRAND_COLOR.yellow}
      />
      <path d="M14 10h8v8" fill="none" stroke={BRAND_COLOR.yellow} strokeWidth="2.8" strokeLinecap="square" />
    </svg>
  );
}
