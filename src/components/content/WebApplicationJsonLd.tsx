import { useLocale, useTranslations } from 'next-intl';
import { SITE_URL } from '@/config/site';
import { pagePath } from '@/i18n/navigation';
import { JsonLd } from './JsonLd';

export function WebApplicationJsonLd() {
  const locale = useLocale();
  const t = useTranslations('meta');
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: t('siteName'),
        url: new URL(pagePath(locale, '/'), SITE_URL).href,
        description: t('description'),
        inLanguage: locale,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: 0, priceCurrency: 'EUR' },
      }}
    />
  );
}
