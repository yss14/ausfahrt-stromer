import type { PostalAddress } from '@/config/legal';
import styles from './LegalPage.module.css';

type AddressProps = PostalAddress & { email?: string; emailLabel?: string; url?: string };

export function Address({ name, street, postalCode, city, email, emailLabel, url }: AddressProps) {
  return (
    <address className={styles.address}>
      {name}
      <br />
      {street}
      <br />
      {postalCode} {city}
      {email && (
        <>
          <br />
          {emailLabel}: <a href={`mailto:${email}`}>{email}</a>
        </>
      )}
      {url && (
        <>
          <br />
          <a href={url} target="_blank" rel="noopener">
            {url.replace(/^https?:\/\//, '')}
          </a>
        </>
      )}
    </address>
  );
}
