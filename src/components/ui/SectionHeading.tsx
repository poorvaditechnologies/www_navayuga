import { FadeIn, SplitText } from '@/components/animations';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'default' | 'light';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'default',
}: SectionHeadingProps) {
  return (
    <div
      className={`${styles.heading} ${align === 'center' ? styles.center : ''} ${tone === 'light' ? styles.light : ''}`}
    >
      {eyebrow && (
        <FadeIn>
          <span className="eyebrow">{eyebrow}</span>
        </FadeIn>
      )}
      <SplitText text={title} className={styles.title} />
      {description && (
        <FadeIn delay={0.25}>
          <p className={styles.description}>{description}</p>
        </FadeIn>
      )}
    </div>
  );
}
