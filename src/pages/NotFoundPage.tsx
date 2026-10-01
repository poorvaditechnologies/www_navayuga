import { Button, Container } from '@/components/ui';

export function NotFoundPage() {
  return (
    <section
      style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', textAlign: 'center' }}
    >
      <Container>
        <h1>404</h1>
        <p>This page doesn&apos;t exist.</p>
        <Button href="/">Back home</Button>
      </Container>
    </section>
  );
}
