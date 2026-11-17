'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import button from '@/components/ui/Button.module.css';
import type { CalculatorInputs } from '@/domain/inputs';
import { encodeShareFragment } from '@/domain/shareLink';
import styles from './ShareLink.module.css';

type Status = 'idle' | 'copied' | 'inAddressBar';

const FEEDBACK_MS = 2500;

export function ShareLink({ inputs }: { inputs: CalculatorInputs }) {
  const t = useTranslations('share');
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    if (status === 'idle') return;
    const timer = setTimeout(() => setStatus('idle'), FEEDBACK_MS);
    return () => clearTimeout(timer);
  }, [status]);

  const share = async () => {
    const url = `${location.origin}${location.pathname}#${encodeShareFragment(inputs)}`;
    if (navigator.share && matchMedia('(pointer: coarse)').matches) {
      // Rejects when the user closes the share sheet, which needs no feedback.
      await navigator.share({ url, title: document.title }).catch(() => {});
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setStatus('copied');
    } catch {
      history.replaceState(null, '', url);
      setStatus('inAddressBar');
    }
  };

  return (
    <div className={styles.row}>
      <button type="button" className={button.button} onClick={share}>
        {t('button')}
      </button>
      <span className={styles.hint} aria-live="polite">
        {t(status === 'idle' ? 'hint' : status)}
      </span>
    </div>
  );
}
