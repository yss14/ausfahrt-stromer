import type { MetadataRoute } from 'next';
import { getTranslations } from 'next-intl/server';
import { THEME_COLOR } from '@/config/site';
import { routing } from '@/i18n/routing';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations({ locale: routing.defaultLocale, namespace: 'meta' });
  return {
    name: t('siteName'),
    short_name: t('siteName'),
    description: t('description'),
    lang: routing.defaultLocale,
    start_url: '/',
    display: 'standalone',
    background_color: '#eef1f5',
    theme_color: THEME_COLOR.light,
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
