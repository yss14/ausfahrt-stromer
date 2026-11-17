import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Address } from '@/components/legal/Address';
import { LegalPage, LegalSection } from '@/components/legal/LegalPage';
import styles from '@/components/legal/LegalPage.module.css';
import { DATA_PROTECTION_AUTHORITY, OPERATOR } from '@/config/legal';
import { pageMetadata } from '@/i18n/pageMetadata';
import { routing } from '@/i18n/routing';

const SECTIONS = [
  'summary',
  'controller',
  'hosting',
  'analytics',
  'speedInsights',
  'localStorage',
  'shareLink',
  'fonts',
  'links',
  'rights',
] as const;

export async function generateMetadata({ params }: PageProps<'/[locale]/datenschutz'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return pageMetadata(locale, '/datenschutz', { title: t('metaTitle'), description: t('metaDescription') });
}

export default async function PrivacyPage({ params }: PageProps<'/[locale]/datenschutz'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('privacy');
  const tLegal = await getTranslations('legal');

  const appendix: Partial<Record<(typeof SECTIONS)[number], React.ReactNode>> = {
    controller: <Address {...OPERATOR} emailLabel={tLegal('emailLabel')} />,
    rights: <Address {...DATA_PROTECTION_AUTHORITY} />,
  };

  return (
    <LegalPage title={t('title')}>
      <p className={styles.muted}>{t('updated')}</p>
      {SECTIONS.map((key) => {
        const paragraphs: string[] = t.raw(`sections.${key}.paragraphs`);
        return (
          <LegalSection key={key} title={t(`sections.${key}.title`)}>
            {paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
            {appendix[key]}
          </LegalSection>
        );
      })}
    </LegalPage>
  );
}
