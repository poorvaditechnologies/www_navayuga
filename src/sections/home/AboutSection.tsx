import { FadeIn } from '@/components/animations';
import { Container } from '@/components/ui';
import styles from './AboutSection.module.css';

export function AboutSection() {
  return (
    <section id="about" className={styles.about}>
      <Container>
        <FadeIn>
          <h2>About us</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className={styles.text}>
            Placeholder copy. Replace this section with real content, or add new sections in
            src/sections/home and compose them in src/pages/HomePage.tsx.
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
