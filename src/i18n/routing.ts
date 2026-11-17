import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['de'],
  defaultLocale: 'de',
  localePrefix: 'as-needed',
  // With a single language a locale cookie remembers nothing, and the site stays cookie-free.
  localeCookie: false,
});
