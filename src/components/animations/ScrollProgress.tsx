import { motion, useScroll, useSpring } from 'motion/react';
import styles from './ScrollProgress.module.css';

/** Thin bar at the top of the page that tracks scroll position. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div className={styles.bar} style={{ scaleX }} />;
}
