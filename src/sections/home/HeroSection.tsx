import { motion } from 'motion/react';
import { Button, Container } from '@/components/ui';
import { SITE } from '@/constants/site';
import { fadeUp, stagger } from '@/lib/motion';
import styles from './HeroSection.module.css';

export function HeroSection() {
  return (
    <section id="top" className={styles.hero}>
      <Container>
        <motion.div variants={stagger()} initial="hidden" animate="visible">
          <motion.h1 variants={fadeUp} className={styles.title}>
            {SITE.name}
          </motion.h1>
          <motion.p variants={fadeUp} className={styles.tagline}>
            {SITE.tagline}
          </motion.p>
          <motion.div variants={fadeUp} className={styles.actions}>
            <Button href="#about">Learn more</Button>
            <Button href="#contact" variant="outline">
              Contact us
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
