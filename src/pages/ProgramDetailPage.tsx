import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { FadeIn, Stagger, StaggerItem } from '@/components/animations';
import { Button, Container, PageHeader } from '@/components/ui';
import { usePrograms } from '@/data/programs';
import { useT } from '@/i18n';
import { NotFoundPage } from './NotFoundPage';
import styles from './ProgramDetailPage.module.css';

export function ProgramDetailPage() {
  const t = useT();
  const PROGRAMS = usePrograms();
  const { id } = useParams<{ id: string }>();
  const index = PROGRAMS.findIndex((p) => p.id === Number(id));

  if (index === -1) {
    return (
      <NotFoundPage title={t.programDetail.notFoundTitle} message={t.programDetail.notFoundBody} />
    );
  }

  const program = PROGRAMS[index];
  const prev = PROGRAMS[(index - 1 + PROGRAMS.length) % PROGRAMS.length];
  const next = PROGRAMS[(index + 1) % PROGRAMS.length];
  const others = PROGRAMS.filter((p) => p.id !== program.id);

  return (
    <>
      <PageHeader
        title={program.heading}
        description={program.summary}
        crumb={t.programDetail.crumb}
        image={program.image}
      />

      <section className={styles.section}>
        <Container>
          <div className={styles.layout}>
            <FadeIn className={styles.article}>
              <span className="eyebrow">
                {t.programDetail.label} {String(index + 1).padStart(2, '0')}
              </span>
              <p className={styles.details}>{program.details}</p>
              <div className={styles.imageWrap}>
                <img src={program.image} alt={program.heading} />
              </div>
              <div className={styles.pager}>
                <Link to={`/programs/${prev.id}`} className={styles.pagerLink}>
                  <ArrowLeft size={18} />
                  <span>
                    <small>{t.common.previous}</small>
                    {prev.heading}
                  </span>
                </Link>
                <Link
                  to={`/programs/${next.id}`}
                  className={`${styles.pagerLink} ${styles.pagerNext}`}
                >
                  <span>
                    <small>{t.common.next}</small>
                    {next.heading}
                  </span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </FadeIn>

            <aside className={styles.aside}>
              <h2>{t.programDetail.others}</h2>
              <Stagger className={styles.otherList} gap={0.06}>
                {others.map((p) => (
                  <StaggerItem key={p.id}>
                    <Link to={`/programs/${p.id}`} className={styles.other}>
                      <img src={p.image} alt="" loading="lazy" />
                      <span>{p.heading}</span>
                      <ArrowRight size={16} />
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
              <div className={styles.asideCta}>
                <p>{t.programDetail.supportPrompt}</p>
                <Button href="/#join" variant="accent">
                  {t.programDetail.getInvolved}
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
