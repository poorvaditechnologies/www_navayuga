import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { logo } from '@/assets/images';
import { Button, Container } from '@/components/ui';
import { NAV_LINKS } from '@/constants/site';
import { useT } from '@/i18n';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrolled } from '@/hooks/useScrolled';
import { setScrollLocked } from '@/lib/smoothScroll';
import { LanguageSwitch } from './LanguageSwitch';
import styles from './Navbar.module.css';

const SECTION_IDS = NAV_LINKS.filter((l) => l.href.startsWith('#')).map((l) => l.href.slice(1));

interface NavItemProps {
  href: string;
  isHome: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

/** In-page links scroll on the home page and route back to it elsewhere; page links use the router. */
function NavItem({ href, isHome, className, onClick, children }: NavItemProps) {
  if (href.startsWith('#')) {
    return (
      <a href={isHome ? href : `/${href}`} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export function Navbar() {
  const t = useT();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const scrolled = useScrolled(24);
  const [isOpen, setIsOpen] = useState(false);
  const active = useActiveSection(isHome ? SECTION_IDS : []);

  const transparent = !scrolled && !isOpen;
  const hrefFor = (hash: string) => (isHome ? hash : `/${hash}`);

  useEffect(() => {
    setScrollLocked(isOpen);
    return () => setScrollLocked(false);
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <header className={`${styles.navbar} ${transparent ? styles.transparent : styles.solid}`}>
      <Container>
        <nav className={styles.inner} aria-label={t.nav.main}>
          <a href={hrefFor('#home')} className={styles.logo} onClick={close}>
            <img src={logo} alt="" className={styles.logoImg} width={44} height={44} />
            <span className={styles.logoText}>
              {t.org.name}
              <small>{t.org.subtitle}</small>
            </span>
          </a>

          <ul className={styles.links}>
            {NAV_LINKS.map((link) => {
              const isActive = link.href.startsWith('#')
                ? isHome && active === link.href.slice(1)
                : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <NavItem
                    href={link.href}
                    isHome={isHome}
                    className={isActive ? styles.active : ''}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className={styles.pill}
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className={styles.linkLabel}>{t.nav[link.key]}</span>
                  </NavItem>
                </li>
              );
            })}
          </ul>

          <div className={styles.actions}>
            <LanguageSwitch id="bar" />
            <div className={styles.cta}>
              <Button to="/contact" variant="accent">
                {t.nav.contact}
              </Button>
            </div>

            <button
              type="button"
              className={styles.menuToggle}
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }}
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }}
                >
                  <NavItem href={link.href} isHome={isHome} onClick={close}>
                    {t.nav[link.key]}
                  </NavItem>
                </motion.li>
              ))}
            </motion.ul>
            <Button to="/contact" variant="accent" onClick={close} className={styles.mobileCta}>
              {t.nav.contactUs}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
