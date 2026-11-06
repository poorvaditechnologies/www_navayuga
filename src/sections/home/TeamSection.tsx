import { Stagger, StaggerItem, TiltCard } from '@/components/animations';
import { Container, SectionHeading } from '@/components/ui';
import { useTeam } from '@/data/team';
import { useT } from '@/i18n';
import styles from './TeamSection.module.css';

export function TeamSection() {
  const t = useT();
  const team = useTeam();
  return (
    <section id="team" className={styles.section}>
      <Container>
        <SectionHeading
          eyebrow={t.team.eyebrow}
          title={t.team.title}
          description={t.team.description}
          align="center"
        />

        <Stagger className={styles.grid} gap={0.12}>
          {team.map((member, i) => (
            <StaggerItem key={i}>
              <TiltCard className={styles.card} max={6}>
                <div className={styles.avatarRing}>
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className={styles.avatar}
                      loading="lazy"
                    />
                  ) : (
                    <span className={`${styles.avatar} ${styles.initials}`} aria-hidden>
                      {member.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h3>{member.name}</h3>
                <p className={styles.position}>{member.position}</p>
                <p className={styles.bio}>{member.bio}</p>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
