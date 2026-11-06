import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { Compass, Target } from 'lucide-react';
import { FadeIn, ScrollText, TiltCard } from '@/components/animations';
import { Container, SectionHeading } from '@/components/ui';
import { useT } from '@/i18n';
import styles from './MissionSection.module.css';

type TabKey = 'values' | 'goals';

export function MissionSection() {
  const t = useT();
  const [tab, setTab] = useState<TabKey>('values');
  const STATEMENTS = [
    { icon: Target, title: t.mission.missionTitle, body: t.mission.missionBody },
    { icon: Compass, title: t.mission.visionTitle, body: t.mission.visionBody },
  ];
  const TABS = [
    { key: 'values' as const, label: t.mission.valuesTab, items: t.mission.values },
    { key: 'goals' as const, label: t.mission.goalsTab, items: t.mission.goals },
  ];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const glowY = useTransform(scrollYProgress, [0, 1], ['-20%', '60%']);
  const current = TABS.find((t) => t.key === tab)!;

  return (
    <section id="mission" className={styles.section} ref={ref}>
      <motion.div className={styles.glowLayer} style={{ y: glowY }} aria-hidden>
        <div className={styles.glow} />
      </motion.div>
      <ScrollText rows={t.mission.scrollRows} />
      <Container>
        <SectionHeading eyebrow={t.mission.eyebrow} title={t.mission.title} tone="light" />

        <div className={styles.statements}>
          {STATEMENTS.map(({ icon: Icon, title, body }, i) => (
            <FadeIn key={title} delay={i * 0.12}>
              <TiltCard className={styles.statement} max={4}>
                <span className={styles.statementIcon}>
                  <Icon size={24} />
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </TiltCard>
            </FadeIn>
          ))}
        </div>

        <FadeIn className={styles.tabsWrap}>
          <div className={styles.tabs} role="tablist">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={tab === t.key}
                className={styles.tab}
                onClick={() => setTab(t.key)}
              >
                {tab === t.key && (
                  <motion.span
                    layoutId="mission-tab"
                    className={styles.tabPill}
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className={styles.tabLabel}>{t.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.ol
              key={current.key}
              className={styles.list}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {current.items.map((item, i) => (
                <motion.li
                  key={item.title}
                  className={styles.item}
                  variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                >
                  <span className={styles.itemNum}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </AnimatePresence>
        </FadeIn>
      </Container>
    </section>
  );
}
