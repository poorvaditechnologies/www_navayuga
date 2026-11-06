import { Fragment } from 'react';
import { motion } from 'motion/react';
import { EASE_OUT } from '@/lib/motion';
import styles from './SplitText.module.css';

interface SplitTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  delay?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
}

/** Reveals text word by word, each word rising out of a clipped line. */
export function SplitText({
  text,
  as = 'h2',
  className,
  delay = 0,
  immediate = false,
}: SplitTextProps) {
  const Tag = motion[as];
  const words = text.split(' ');
  const trigger = immediate
    ? { animate: 'visible' }
    : { whileInView: 'visible', viewport: { once: true, amount: 0.4 } };

  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      {...trigger}
      variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className={styles.mask} aria-hidden>
            <motion.span
              className={styles.word}
              variants={{
                hidden: { y: '110%', rotate: 4 },
                visible: { y: '0%', rotate: 0, transition: { duration: 0.8, ease: EASE_OUT } },
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </Tag>
  );
}
