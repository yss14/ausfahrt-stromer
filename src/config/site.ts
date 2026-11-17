/** Public origin used for canonical URLs, the sitemap and social previews. */
export const SITE_URL = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ausfahrt-stromer.vercel.app');

export const THEME_COLOR = { light: '#1d4f91', dark: '#2257a3' } as const;

/** Colors for generated images, which cannot read the CSS tokens. */
export const BRAND_COLOR = { sign: THEME_COLOR.light, yellow: '#f2b705' } as const;
