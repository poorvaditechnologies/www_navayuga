import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { fadeUp, stagger } from '@/lib/motion';

interface StaggerProps {
  children: ReactNode;
  className?: string;
  gap?: number;
}

/** Container whose StaggerItem children reveal one after another on scroll. */
export function Stagger({ children, className, gap = 0.1 }: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={stagger(gap)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
