import { ImageResponse } from 'next/og';
import { THEME_COLOR } from '@/config/site';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** The exit-sign arrow from icon.svg, full bleed because iOS rounds the corners itself. */
export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', background: THEME_COLOR.light }}>
      <svg width="180" height="180" viewBox="0 0 32 32">
        <rect x="2.5" y="2.5" width="27" height="27" rx="4" fill="none" stroke="#fff" strokeWidth="1.5" />
        <path d="M9 23L21 11M13 10h9v9" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="square" />
      </svg>
    </div>,
    size,
  );
}
