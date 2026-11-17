import { ImageResponse } from 'next/og';
import { BrandMark } from '@/components/brand/BrandMark';
import { BRAND_COLOR } from '@/config/site';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Full bleed without the sign frame, because iOS rounds the corners itself. */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        background: BRAND_COLOR.sign,
      }}
    >
      <BrandMark size={150} />
    </div>,
    size,
  );
}
