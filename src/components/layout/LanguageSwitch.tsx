import { motion } from 'motion/react';
import { useLanguage, type Lang } from '@/i18n';
import styles from './LanguageSwitch.module.css';

const OPTIONS: { value: Lang; label: string; full: string }[] = [
  { value: 'en', label: 'EN', full: 'English' },
  { value: 'kn', label: 'ಕನ್ನಡ', full: 'ಕನ್ನಡ' },
];

export function LanguageSwitch({ id }: { id: string }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className={styles.switch} role="group" aria-label={t.nav.language}>
      {OPTIONS.map((option) => {
        const active = option.value === lang;
        return (
          <button
            key={option.value}
            type="button"
            lang={option.value}
            className={styles.option}
            aria-pressed={active}
            aria-label={option.full}
            onClick={() => setLang(option.value)}
          >
            {active && (
              <motion.span
                layoutId={`lang-pill-${id}`}
                className={styles.pill}
                transition={{ type: 'spring', stiffness: 450, damping: 34 }}
              />
            )}
            <span className={styles.label}>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
