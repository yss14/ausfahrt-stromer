import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Calculator } from '@/components/calculator/Calculator';
import { Faq } from '@/components/content/Faq';
import { Notes } from '@/components/content/Notes';
import { PageHeader } from '@/components/content/PageHeader';
import { WebApplicationJsonLd } from '@/components/content/WebApplicationJsonLd';
import { homeLanguageAlternates, homePath } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import styles from './page.module.css';

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'meta' });
  const url = homePath(locale);
  const title = t('title');
  const description = t('description');
  return {
    title,
    description,
    alternates: { canonical: url, languages: homeLanguageAlternates() },
    openGraph: { type: 'website', url, siteName: t('siteName'), locale: t('ogLocale'), title, description },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <main className={styles.page}>
      <WebApplicationJsonLd />
      <PageHeader />
      <Calculator />
      <Faq />
      <Notes />
    </main>
  );
}
