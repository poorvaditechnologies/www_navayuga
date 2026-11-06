import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useScrolled } from '@/hooks/useScrolled';
import { useT } from '@/i18n';
import { scrollToTarget } from '@/lib/smoothScroll';
import styles from './BackToTop.module.css';

export function BackToTop() {
  const t = useT();
  const visible = useScrolled(700);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className={styles.button}
          onClick={() => scrollToTarget(0)}
          aria-label={t.common.backToTop}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.92 }}
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
