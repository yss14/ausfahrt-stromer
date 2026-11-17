import { createNavigation } from 'next-intl/navigation';
import type { Locale } from 'next-intl';
import { routing } from './routing';

export const { getPathname } = createNavigation(routing);

export const homePath = (locale: Locale) => getPathname({ locale, href: '/' });

/** hreflang map for the home page, including x-default. */
export function homeLanguageAlternates(): Record<string, string> {
  return Object.fromEntries([
    ...routing.locales.map((locale) => [locale, homePath(locale)]),
    ['x-default', homePath(routing.defaultLocale)],
  ]);
}
