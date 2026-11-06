import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useAnimate, useReducedMotion, type PanInfo } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useT } from '@/i18n';
import { EASE_OUT } from '@/lib/motion';
import { setScrollLocked } from '@/lib/smoothScroll';
import type { GalleryItem } from '@/types';
import styles from './Lightbox.module.css';

interface LightboxProps {
  items: GalleryItem[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

const FLIGHT = { duration: 0.55, ease: EASE_OUT };

function thumbRect(id: string) {
  const el = document.querySelector<HTMLElement>(`[data-gallery-id="${id}"]`);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  const visible = r.bottom > 0 && r.top < window.innerHeight;
  return visible ? r : null;
}

/** Transform + clip that makes the frame sit exactly over a cover-cropped thumbnail. */
function flightFrom(from: DOMRect, to: DOMRect) {
  const scale = Math.max(from.width / to.width, from.height / to.height);
  const insetX = (to.width - from.width / scale) / 2;
  const insetY = (to.height - from.height / scale) / 2;
  const radius = 16 / scale;
  return {
    x: from.left + from.width / 2 - (to.left + to.width / 2),
    y: from.top + from.height / 2 - (to.top + to.height / 2),
    scale,
    clipPath: `inset(${insetY}px ${insetX}px ${insetY}px ${insetX}px round ${radius}px)`,
  };
}

const RESTING = { x: 0, y: 0, scale: 1, clipPath: 'inset(0px 0px 0px 0px round 14px)' };

export function Lightbox({ items, index, onIndexChange, onClose }: LightboxProps) {
  const t = useT();
  const reduce = useReducedMotion();
  const [scope, animate] = useAnimate();
  const frameRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState(0);
  const [closing, setClosing] = useState(false);
  const item = items[index];

  const go = useCallback(
    (step: number) => {
      setDirection(step);
      onIndexChange((index + step + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  const requestClose = useCallback(async () => {
    if (closing) return;
    setClosing(true);
    const frame = frameRef.current;
    const from = thumbRect(item.id);
    const backdrop = animate('[data-backdrop]', { opacity: 0 }, { duration: 0.4 });
    const chrome = animate('[data-chrome]', { opacity: 0 }, { duration: 0.2 });
    if (frame && from && !reduce) {
      await animate(frame, flightFrom(from, frame.getBoundingClientRect()), FLIGHT);
    } else if (frame) {
      await animate(frame, { opacity: 0, scale: 0.94 }, { duration: 0.25 });
    }
    await Promise.all([backdrop, chrome]);
    onClose();
  }, [animate, closing, item.id, onClose, reduce]);

  // Fly the frame out of the clicked thumbnail.
  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    animate('[data-backdrop]', { opacity: [0, 1] }, { duration: 0.4 });
    animate('[data-chrome]', { opacity: [0, 1] }, { duration: 0.4, delay: 0.25 });
    const from = thumbRect(item.id);
    if (from && !reduce) {
      const start = flightFrom(from, frame.getBoundingClientRect());
      animate(
        frame,
        {
          x: [start.x, 0],
          y: [start.y, 0],
          scale: [start.scale, 1],
          clipPath: [start.clipPath, RESTING.clipPath],
        },
        FLIGHT,
      );
    } else {
      animate(frame, { opacity: [0, 1], scale: [0.96, 1] }, { duration: 0.3 });
    }
    // Opening animation runs once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    setScrollLocked(true);
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      setScrollLocked(false);
      previous?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, requestClose]);

  useEffect(() => {
    const active = stripRef.current?.querySelector<HTMLElement>('[aria-current="true"]');
    active?.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [index, reduce]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80 || info.velocity.x < -500) go(1);
    else if (info.offset.x > 80 || info.velocity.x > 500) go(-1);
  };

  const ratio = item.width / item.height;

  return createPortal(
    <div
      ref={scope}
      className={styles.root}
      role="dialog"
      aria-modal="true"
      aria-label={`${t.gallery.viewer}: ${item.caption}`}
    >
      <div data-backdrop className={styles.backdrop} onClick={requestClose} />

      <div data-chrome className={styles.topBar}>
        <span className={styles.counter}>
          <strong>{String(index + 1).padStart(2, '0')}</strong> /{' '}
          {String(items.length).padStart(2, '0')}
        </span>
        <button
          ref={closeRef}
          type="button"
          className={styles.iconButton}
          onClick={requestClose}
          aria-label={t.gallery.close}
        >
          <X size={22} />
        </button>
      </div>

      <div className={styles.stage} onClick={(e) => e.target === e.currentTarget && requestClose()}>
        <div
          ref={frameRef}
          className={styles.frame}
          style={{ width: `min(92vw, 1280px, calc(68svh * ${ratio}))`, aspectRatio: `${ratio}` }}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={item.id}
              src={item.src}
              alt={item.caption}
              className={styles.image}
              custom={direction}
              variants={{
                enter: (d: number) => ({ x: d > 0 ? '30%' : '-30%', opacity: 0, scale: 0.96 }),
                center: { x: 0, opacity: 1, scale: 1 },
                exit: (d: number) => ({ x: d > 0 ? '-30%' : '30%', opacity: 0, scale: 0.96 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: EASE_OUT }}
              drag={closing ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={onDragEnd}
              draggable={false}
            />
          </AnimatePresence>
        </div>

        <button
          data-chrome
          type="button"
          className={`${styles.iconButton} ${styles.nav} ${styles.prev}`}
          onClick={() => go(-1)}
          aria-label={t.gallery.previousPhoto}
        >
          <ChevronLeft size={26} />
        </button>
        <button
          data-chrome
          type="button"
          className={`${styles.iconButton} ${styles.nav} ${styles.next}`}
          onClick={() => go(1)}
          aria-label={t.gallery.nextPhoto}
        >
          <ChevronRight size={26} />
        </button>
      </div>

      <div data-chrome className={styles.bottom}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={item.id}
            className={styles.caption}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <span className={styles.category}>{item.category}</span>
            <p>{item.caption}</p>
          </motion.div>
        </AnimatePresence>

        <div ref={stripRef} className={styles.strip}>
          {items.map((it, i) => (
            <button
              key={it.id}
              type="button"
              className={styles.thumb}
              aria-current={i === index}
              aria-label={`${t.gallery.showPhoto} ${i + 1}: ${it.caption}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                onIndexChange(i);
              }}
            >
              <img src={it.thumb} alt="" loading="lazy" />
              {i === index && (
                <motion.span
                  layoutId="lightbox-thumb-ring"
                  className={styles.thumbRing}
                  transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
