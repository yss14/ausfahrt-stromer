import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { languageAlternates, pagePath, type Page } from './navigation';

/** Title, description, canonical, hreflang and social tags for one page. */
export async function pageMetadata(
  locale: Locale,
  page: Page,
  { title, description }: { title: string; description: string },
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  const url = pagePath(locale, page);
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(page) },
    openGraph: { type: 'website', url, siteName: t('siteName'), locale: t('ogLocale'), title, description },
    twitter: { card: 'summary_large_image', title, description },
  };
}
