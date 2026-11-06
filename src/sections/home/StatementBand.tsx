import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { environment } from '@/assets/images';
import { SplitText } from '@/components/animations';
import { useT } from '@/i18n';
import styles from './StatementBand.module.css';

export function StatementBand() {
  const t = useT();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-18%', '18%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.25, 1.1, 1.25]);
  const textY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const lineScale = useTransform(scrollYProgress, [0.2, 0.55], [0, 1]);

  return (
    <section ref={ref} className={styles.band}>
      <motion.div className={styles.imageLayer} style={{ y: imageY, scale: imageScale }}>
        <img src={environment} alt="" loading="lazy" />
      </motion.div>
      <div className={styles.overlay} />

      <motion.div className={styles.content} style={{ y: textY }}>
        <motion.span className={styles.line} style={{ scaleX: lineScale }} />
        <SplitText as="p" text={t.statement.quote} className={styles.quote} />
        <p className={styles.sub}>{t.statement.sub}</p>
      </motion.div>
    </section>
  );
}
