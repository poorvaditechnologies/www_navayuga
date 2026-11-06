import { Quote } from 'lucide-react';
import { FadeIn } from '@/components/animations';
import { Carousel, Container, SectionHeading } from '@/components/ui';
import { useTestimonials } from '@/data/testimonials';
import { useT } from '@/i18n';
import styles from './TestimonialsSection.module.css';

export function TestimonialsSection() {
  const t = useT();
  const testimonials = useTestimonials();
  return (
    <section id="testimonialPage" className={styles.section}>
      <Container>
        <SectionHeading
          eyebrow={t.testimonials.eyebrow}
          title={t.testimonials.title}
          description={t.testimonials.description}
        />

        <FadeIn>
          <Carousel label={t.testimonials.label} autoplayMs={6000} slideClassName={styles.slide}>
            {testimonials.map((item, index) => (
              <figure className={styles.card} key={index}>
                <Quote size={36} className={styles.quoteIcon} />
                <blockquote className={styles.quote}>{item.feedback}</blockquote>
                <figcaption className={styles.author}>
                  <img src={item.image} alt="" loading="lazy" />
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.position}</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </Carousel>
        </FadeIn>
      </Container>
    </section>
  );
}
