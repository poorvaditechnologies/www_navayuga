import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Droplets, HandCoins, Sprout, Tractor } from 'lucide-react';
import { aboutPhoto, healthcare } from '@/assets/images';
import { FadeIn, SplitText, Stagger, StaggerItem } from '@/components/animations';
import { Button, Container } from '@/components/ui';
import { useT } from '@/i18n';
import { EASE_OUT } from '@/lib/motion';
import styles from './AboutSection.module.css';

const HIGHLIGHT_ICONS = [HandCoins, Droplets, Tractor, Sprout];

export function AboutSection() {
  const t = useT();
  const mediaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: mediaRef, offset: ['start end', 'end start'] });
  const mainY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const backY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const dotsY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section id="about" className={styles.about}>
      <Container>
        <div className={styles.grid}>
          <div ref={mediaRef} className={styles.media}>
            <motion.div className={styles.dots} style={{ y: dotsY }} aria-hidden />
            <motion.div
              className={styles.imageWrap}
              initial={{ clipPath: 'inset(100% 0 0 0 round 24px)' }}
              whileInView={{ clipPath: 'inset(0% 0 0 0 round 24px)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: EASE_OUT }}
            >
              <motion.img
                src={aboutPhoto}
                alt={t.about.imageAlt}
                className={styles.image}
                style={{ y: mainY }}
                loading="lazy"
              />
            </motion.div>
            <motion.div className={styles.backImage} style={{ y: backY }}>
              <motion.img
                src={healthcare}
                alt=""
                loading="lazy"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3, ease: EASE_OUT }}
              />
            </motion.div>
            <motion.div className={styles.badgeWrap} style={{ y: badgeY }}>
              <motion.div
                className={styles.badge}
                initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 200, damping: 14 }}
              >
                <strong>2016</strong>
                <span>{t.about.badge}</span>
              </motion.div>
            </motion.div>
          </div>

          <div>
            <FadeIn>
              <span className="eyebrow">{t.about.eyebrow}</span>
            </FadeIn>
            <SplitText text={t.about.title} className={styles.title} />
            <FadeIn delay={0.2}>
              <p className={styles.lead}>{t.about.lead}</p>
              <p className={styles.text}>{t.about.body}</p>
            </FadeIn>

            <Stagger className={styles.highlights} gap={0.08}>
              {t.about.highlights.map((label, i) => {
                const Icon = HIGHLIGHT_ICONS[i];
                return (
                  <StaggerItem key={label} className={styles.highlight}>
                    <span className={styles.highlightIcon}>
                      <Icon size={20} />
                    </span>
                    {label}
                  </StaggerItem>
                );
              })}
            </Stagger>

            <FadeIn delay={0.1}>
              <Button to="/details">
                {t.about.more} <ArrowRight size={18} />
              </Button>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
