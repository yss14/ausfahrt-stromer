import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/site';
import { homeLanguageAlternates, homePath } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const absolute = (path: string) => new URL(path, SITE_URL).href;

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    Object.entries(homeLanguageAlternates()).map(([lang, path]) => [lang, absolute(path)]),
  );
  return [
    {
      url: absolute(homePath(routing.defaultLocale)),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages },
    },
  ];
}
