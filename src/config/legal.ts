export type PostalAddress = { name: string; street: string; postalCode: string; city: string };

/** Site operator, as required in the imprint (§ 5 DDG) and the privacy policy. */
export const OPERATOR = {
  name: 'Yannick Stachelscheid',
  street: 'Feldkirchenerstraße 18',
  postalCode: '85622',
  city: 'Weißenfeld',
  email: 'kontakt@ausfahrt-stromer.de',
} as const satisfies PostalAddress & { email: string };

/** Supervisory authority for a private operator in Bavaria (Art. 77 DSGVO). */
export const DATA_PROTECTION_AUTHORITY = {
  name: 'Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)',
  street: 'Promenade 18',
  postalCode: '91522',
  city: 'Ansbach',
  url: 'https://www.lda.bayern.de',
} as const satisfies PostalAddress & { url: string };

export const SOURCE_CODE_URL = 'https://github.com/yss14/ausfahrt-stromer';
