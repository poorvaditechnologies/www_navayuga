import { Container } from '@/components/ui';
import { SITE } from '@/constants/site';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <Container>
        <p>
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
        <p>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
      </Container>
    </footer>
  );
}
