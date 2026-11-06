import { AnimatePresence, motion } from 'motion/react';
import { Cookie } from 'lucide-react';
import { Button } from '@/components/ui';
import { useConsent } from '@/consent';
import { useT } from '@/i18n';
import { EASE_OUT } from '@/lib/motion';
import styles from './CookieBanner.module.css';

export function CookieBanner() {
  const t = useT();
  const { bannerOpen, setChoice } = useConsent();

  return (
    <AnimatePresence>
      {bannerOpen && (
        <motion.section
          className={styles.banner}
          role="region"
          aria-label={t.cookies.label}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.6, ease: EASE_OUT } }}
          exit={{ opacity: 0, y: 40, transition: { duration: 0.3 } }}
        >
          <div className={styles.head}>
            <span className={styles.icon}>
              <Cookie size={20} />
            </span>
            <h2>{t.cookies.title}</h2>
          </div>
          <p>{t.cookies.body}</p>
          <div className={styles.actions}>
            <Button onClick={() => setChoice('all')}>{t.cookies.accept}</Button>
            <Button variant="outline" onClick={() => setChoice('necessary')}>
              {t.cookies.necessary}
            </Button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
