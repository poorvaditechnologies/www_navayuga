import { Container } from '@/components/ui';
import { NAV_LINKS, SITE } from '@/constants/site';
import { useScrolled } from '@/hooks/useScrolled';
import styles from './Navbar.module.css';

export function Navbar() {
  const scrolled = useScrolled();

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <Container>
        <nav className={styles.inner}>
          <a href="#top" className={styles.logo}>
            {SITE.name}
          </a>
          <ul className={styles.links}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
