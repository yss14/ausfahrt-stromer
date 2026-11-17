/** Public origin used for canonical URLs, the sitemap and social previews. */
export const SITE_URL = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ausfahrt-stromer.vercel.app');

export const THEME_COLOR = { light: '#1d4f91', dark: '#2257a3' } as const;
