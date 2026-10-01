import type { Variants } from 'motion/react';

// Shared animation presets so motion feels consistent across the site.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const stagger = (staggerChildren = 0.12): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren } },
});
