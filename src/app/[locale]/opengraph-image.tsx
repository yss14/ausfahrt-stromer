import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { BrandMark } from '@/components/brand/BrandMark';
import { BRAND_COLOR } from '@/config/site';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const fontFile = (weight: 600 | 800) =>
  readFile(join(process.cwd(), `src/assets/fonts/Overpass-${weight}.ttf`));

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: 'meta' });
  const [semibold, extrabold] = await Promise.all([fontFile(600), fontFile(800)]);

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        padding: 28,
        background: BRAND_COLOR.sign,
        fontFamily: 'Overpass',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          border: '6px solid #fff',
          borderRadius: 28,
          padding: '56px 64px',
          color: '#fff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <BrandMark size={72} />
          <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }}>
            {t('siteName')}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <span
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: BRAND_COLOR.yellow,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            {t('ogImage.kicker')}
          </span>
          <span style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.02 }}>{t('ogImage.title')}</span>
          <span style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.3, opacity: 0.88 }}>
            {t('ogImage.subtitle')}
          </span>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Overpass', data: semibold, weight: 600, style: 'normal' },
        { name: 'Overpass', data: extrabold, weight: 800, style: 'normal' },
      ],
    },
  );
}
