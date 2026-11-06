import {
  ArrowRight,
  GraduationCap,
  HandHelping,
  HeartPulse,
  Leaf,
  Sprout,
  Waves,
} from 'lucide-react';
import { motion } from 'motion/react';
import { aboutPhoto } from '@/assets/images';
import { FadeIn } from '@/components/animations';
import { Button, Container, PageHeader } from '@/components/ui';
import { ABOUT_DETAIL_ICONS } from '@/data/values';
import { useT } from '@/i18n';
import styles from './AboutDetailsPage.module.css';

const ICONS: Record<string, typeof HandHelping> = {
  'hand-helping': HandHelping,
  waves: Waves,
  leaf: Leaf,
  'heart-pulse': HeartPulse,
  'graduation-cap': GraduationCap,
  sprout: Sprout,
};

export function AboutDetailsPage() {
  const t = useT();
  return (
    <>
      <PageHeader
        title={t.aboutDetails.title}
        description={t.aboutDetails.description}
        crumb={t.aboutDetails.crumb}
        image={aboutPhoto}
      />

      <section className={styles.section}>
        <Container>
          <FadeIn className={styles.story}>
            <span className="eyebrow">{t.aboutDetails.storyEyebrow}</span>
            <p>
              {t.about.lead} {t.about.body}
            </p>
          </FadeIn>

          <div className={styles.grid}>
            {t.aboutDetails.cards.map((card, index) => {
              const Icon = ICONS[ABOUT_DETAIL_ICONS[index]];
              return (
                <motion.article
                  key={card.title}
                  className={styles.card}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className={styles.iconWrap}>
                    <Icon size={26} />
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </motion.article>
              );
            })}
          </div>

          <FadeIn className={styles.closing}>
            <p>{t.aboutDetails.closing}</p>
            <Button href="/#join" variant="accent">
              {t.aboutDetails.joinUs} <ArrowRight size={18} />
            </Button>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
