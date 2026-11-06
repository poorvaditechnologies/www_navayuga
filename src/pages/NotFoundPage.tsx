import { Button, Container, PageHeader } from '@/components/ui';
import { useT } from '@/i18n';

interface NotFoundPageProps {
  title?: string;
  message?: string;
}

export function NotFoundPage({ title, message }: NotFoundPageProps) {
  const t = useT();
  return (
    <>
      <PageHeader
        title={title ?? t.notFound.title}
        description={message ?? t.notFound.message}
        crumb="404"
      />
      <section style={{ padding: '4rem 0 6rem' }}>
        <Container>
          <Button to="/">{t.common.backHome}</Button>
        </Container>
      </section>
    </>
  );
}
