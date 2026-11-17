import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Address } from '@/components/legal/Address';
import { LegalPage, LegalSection } from '@/components/legal/LegalPage';
import styles from '@/components/legal/LegalPage.module.css';
import { OPERATOR } from '@/config/legal';
import { pageMetadata } from '@/i18n/pageMetadata';
import { routing } from '@/i18n/routing';

export async function generateMetadata({ params }: PageProps<'/[locale]/impressum'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'imprint' });
  return pageMetadata(locale, '/impressum', { title: t('metaTitle'), description: t('metaDescription') });
}

export default async function ImprintPage({ params }: PageProps<'/[locale]/impressum'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('imprint');
  const tLegal = await getTranslations('legal');
  const { email, ...address } = OPERATOR;

  return (
    <LegalPage title={t('title')}>
      <LegalSection title={t('provider')}>
        <Address {...address} />
      </LegalSection>
      <LegalSection title={t('contact')}>
        <p>
          {tLegal('emailLabel')}: <a href={`mailto:${email}`}>{email}</a>
        </p>
      </LegalSection>
      <LegalSection title={t('responsible')}>
        <Address {...address} />
      </LegalSection>
      <p className={styles.muted}>{t('note')}</p>
    </LegalPage>
  );
}
