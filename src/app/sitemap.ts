import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/site';
import { languageAlternates, PAGES, pagePath } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const absolute = (path: string) => new URL(path, SITE_URL).href;

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((page) => ({
    url: absolute(pagePath(routing.defaultLocale, page)),
    changeFrequency: page === '/' ? 'monthly' : 'yearly',
    priority: page === '/' ? 1 : 0.3,
    alternates: {
      languages: Object.fromEntries(
        Object.entries(languageAlternates(page)).map(([lang, path]) => [lang, absolute(path)]),
      ),
    },
  }));
}
