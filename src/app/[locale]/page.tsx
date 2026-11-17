import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Calculator } from '@/components/calculator/Calculator';
import { Notes } from '@/components/content/Notes';
import { PageHeader } from '@/components/content/PageHeader';
import { routing } from '@/i18n/routing';
import styles from './page.module.css';

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <main className={styles.page}>
      <PageHeader />
      <Calculator />
      <Notes />
    </main>
  );
}
