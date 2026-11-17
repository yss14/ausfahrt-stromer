import { createNavigation } from 'next-intl/navigation';
import type { Locale } from 'next-intl';
import { routing } from './routing';

export const { Link, getPathname } = createNavigation(routing);

/** Every page of the site, in sitemap order. */
export const PAGES = ['/', '/impressum', '/datenschutz'] as const;
export type Page = (typeof PAGES)[number];

export const pagePath = (locale: Locale, page: Page) => getPathname({ locale, href: page });

/** hreflang map for a page, including x-default. */
export function languageAlternates(page: Page): Record<string, string> {
  return Object.fromEntries([
    ...routing.locales.map((locale) => [locale, pagePath(locale, page)]),
    ['x-default', pagePath(routing.defaultLocale, page)],
  ]);
}
