import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import styles from './ScrollText.module.css';

interface ScrollTextProps {
  rows: string[];
  tone?: 'light' | 'dark';
}

/** Oversized words that slide sideways as the band scrolls past, alternating direction per row. */
export function ScrollText({ rows, tone = 'dark' }: ScrollTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const forward = useTransform(scrollYProgress, [0, 1], ['5%', '-35%']);
  const backward = useTransform(scrollYProgress, [0, 1], ['-35%', '5%']);

  return (
    <div ref={ref} className={`${styles.band} ${styles[tone]}`} aria-hidden>
      {rows.map((row, i) => (
        <motion.div
          key={row}
          className={styles.row}
          style={{ x: i % 2 === 0 ? forward : backward }}
        >
          {Array.from({ length: 3 }, (_, k) => (
            <span key={k} className={k % 2 === 1 ? styles.outline : undefined}>
              {row}
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
