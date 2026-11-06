import { useCallback, useEffect, useState, type ReactNode } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useT } from '@/i18n';
import styles from './Carousel.module.css';

interface CarouselProps {
  children: ReactNode[];
  autoplayMs?: number;
  slideClassName?: string;
  label: string;
}

export function Carousel({ children, autoplayMs, slideClassName = '', label }: CarouselProps) {
  const t = useT();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [paused, setPaused] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => {
      setSelected(emblaApi.selectedScrollSnap());
      setSnapCount(emblaApi.scrollSnapList().length);
    };
    emblaApi.on('select', sync).on('reInit', sync);
    sync();
    return () => {
      emblaApi.off('select', sync).off('reInit', sync);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !autoplayMs || paused) return;
    const id = window.setInterval(() => emblaApi.scrollNext(), autoplayMs);
    return () => window.clearInterval(id);
  }, [emblaApi, autoplayMs, paused]);

  return (
    <div
      className={styles.wrapper}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {children.map((child, index) => (
            <div className={`${styles.slide} ${slideClassName}`} key={index}>
              {child}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.dots}>
          {Array.from({ length: snapCount }, (_, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.dot} ${index === selected ? styles.dotActive : ''}`}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`${t.common.goToSlide} ${index + 1}`}
            />
          ))}
        </div>
        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            onClick={scrollPrev}
            aria-label={t.common.previous}
          >
            <ArrowLeft size={20} />
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={scrollNext}
            aria-label={t.common.next}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
