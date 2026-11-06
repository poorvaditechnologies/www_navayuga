import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Stagger, StaggerItem, TiltCard } from '@/components/animations';
import { Container, SectionHeading } from '@/components/ui';
import { usePrograms } from '@/data/programs';
import { useT } from '@/i18n';
import type { Program } from '@/types';
import styles from './ProgramsSection.module.css';

function ProgramCard({ program, index }: { program: Program; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <TiltCard className={styles.tilt}>
      <Link ref={ref} to={`/programs/${program.id}`} className={styles.card}>
        <motion.div className={styles.imageLayer} style={{ y }}>
          <img src={program.image} alt="" loading="lazy" className={styles.image} />
        </motion.div>
        <div className={styles.shade} />
        <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
        <span className={styles.arrow}>
          <ArrowUpRight size={20} />
        </span>
        <div className={styles.body}>
          <h3>{program.heading}</h3>
          <p>{program.summary}</p>
        </div>
      </Link>
    </TiltCard>
  );
}

export function ProgramsSection() {
  const t = useT();
  const programs = usePrograms();
  return (
    <section id="programs" className={styles.programs}>
      <Container>
        <SectionHeading
          eyebrow={t.programs.eyebrow}
          title={t.programs.title}
          description={t.programs.description}
        />

        <Stagger className={styles.grid} gap={0.08}>
          {programs.map((program, index) => (
            <StaggerItem key={program.id} className={[0, 3, 4].includes(index) ? styles.wide : ''}>
              <ProgramCard program={program} index={index} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
