import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { fadeLeft, fadeRight, fadeUp, scaleIn } from '@/lib/motion';

const VARIANTS = { up: fadeUp, left: fadeLeft, right: fadeRight, scale: scaleIn };

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: keyof typeof VARIANTS;
}

/** Reveals children the first time they scroll into view. */
export function FadeIn({ children, delay = 0, className, direction = 'up' }: FadeInProps) {
  return (
    <motion.div
      className={className}
      variants={VARIANTS[direction]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
