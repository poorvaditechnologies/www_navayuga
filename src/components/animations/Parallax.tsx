import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Pixels travelled in each direction across the element's time in view. Negative moves the other way. */
  offset?: number;
  /** Scale the content up so its edges never show while it moves. */
  scale?: number;
}

/** Shifts children vertically as the element scrolls through the viewport. */
export function Parallax({ children, className, offset = 60, scale = 1 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, scale, height: '100%' }}>{children}</motion.div>
    </div>
  );
}
