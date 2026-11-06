import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { home1, homeImage2, waterSanitization } from '@/assets/images';
import { SplitText } from '@/components/animations';
import { Button } from '@/components/ui';
import { useT } from '@/i18n';
import { EASE_OUT } from '@/lib/motion';
import styles from './HeroSection.module.css';

const SLIDE_IMAGES = [home1, homeImage2, waterSanitization];

const INTERVAL_MS = 7000;
const CROSSFADE_S = 1.6;

export function HeroSection() {
  const t = useT();
  const SLIDES = t.hero.slides.map((slide, i) => ({ ...slide, image: SLIDE_IMAGES[i] }));
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.6]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { stiffness: 60, damping: 18 };
  const bgX = useSpring(useTransform(mouseX, [-1, 1], [-18, 18]), spring);
  const bgMouseY = useSpring(useTransform(mouseY, [-1, 1], [-12, 12]), spring);
  const textX = useSpring(useTransform(mouseX, [-1, 1], [8, -8]), spring);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
    mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
  };

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDE_IMAGES.length), []);

  useEffect(() => {
    SLIDE_IMAGES.slice(1).forEach((src) => {
      new Image().src = src;
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(next, INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, next]);

  const slide = SLIDES[index];
  const upcoming = SLIDES[(index + 1) % SLIDES.length];

  return (
    <section
      ref={ref}
      id="home"
      className={styles.hero}
      onPointerMove={onPointerMove}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div className={styles.bgLayer} style={{ y: bgY }}>
        <motion.div className={styles.mouseLayer} style={{ x: bgX, y: bgMouseY }}>
          <AnimatePresence initial={false}>
            <motion.div
              key={index}
              className={styles.bg}
              initial={{ opacity: 0, zIndex: 1 }}
              animate={{ opacity: 1, zIndex: 1 }}
              // The outgoing photo stays fully visible underneath until the new one has faded in.
              exit={{ opacity: 0, zIndex: 0, transition: { delay: CROSSFADE_S, duration: 0.01 } }}
              transition={{ duration: CROSSFADE_S, ease: 'easeInOut' }}
            >
              <motion.img
                src={slide.image}
                alt=""
                className={styles.image}
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: INTERVAL_MS / 1000 + CROSSFADE_S,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                fetchPriority={index === 0 ? 'high' : 'auto'}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <div className={styles.overlay} />
      <motion.div className={styles.scrollShade} style={{ opacity: overlayOpacity }} />
      <div className={styles.grain} aria-hidden />

      <motion.div
        className={styles.content}
        style={{ y: contentY, opacity: contentOpacity, x: textX }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className={styles.text}
            exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeOut' } }}
          >
            <motion.span
              className={styles.eyebrow}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
            >
              <span className={styles.pulse} />
              {slide.eyebrow}
            </motion.span>
            <SplitText as="h1" text={slide.title} className={styles.title} immediate delay={0.2} />
            <motion.p
              className={styles.description}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.6 }}
            >
              {slide.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: EASE_OUT }}
        >
          <Button href="#about" variant="accent">
            {t.hero.discover} <ArrowRight size={18} />
          </Button>
          <Button href="#join" variant="outline" className={styles.outlineOnDark}>
            {t.hero.join}
          </Button>
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        className={styles.nextCard}
        onClick={next}
        style={{ opacity: contentOpacity }}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.7, ease: EASE_OUT }}
        aria-label={`${t.hero.nextSlide}: ${upcoming.short}`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={upcoming.image}
            src={upcoming.image}
            alt=""
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>
        <span>
          <small>{t.hero.upNext}</small>
          {upcoming.short}
        </span>
        <ArrowRight size={18} className={styles.nextArrow} />
      </motion.button>

      <div className={styles.indicators}>
        {SLIDES.map((s, i) => (
          <button
            key={s.image}
            type="button"
            className={styles.indicator}
            onClick={() => setIndex(i)}
            aria-label={`${t.common.goToSlide} ${i + 1}`}
            aria-current={i === index}
          >
            <span className={styles.indicatorNum}>{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.indicatorTrack}>
              <span
                className={styles.indicatorFill}
                data-active={i === index}
                data-paused={paused}
                style={{ animationDuration: `${INTERVAL_MS}ms` }}
                key={i === index ? `active-${index}` : `idle-${i}`}
              />
            </span>
          </button>
        ))}
      </div>

      <a href="#about" className={styles.scrollCue} aria-label={t.hero.scrollToContent}>
        <span>{t.hero.scroll}</span>
        <ChevronDown size={18} />
      </a>
    </section>
  );
}
