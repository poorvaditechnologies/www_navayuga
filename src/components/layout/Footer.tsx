import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';
import { logo } from '@/assets/images';
import { FadeIn } from '@/components/animations';
import { Button, Container } from '@/components/ui';
import { useConsent } from '@/consent';
import { FOOTER_LINKS, PHONE_HREF, SITE, SOCIAL_LINKS } from '@/constants/site';
import { useT } from '@/i18n';
import styles from './Footer.module.css';

const ICONS: Record<string, typeof FaFacebookF> = {
  facebook: FaFacebookF,
  twitter: FaTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
};

export function Footer() {
  const t = useT();
  const { openBanner } = useConsent();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const wordRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wordRef, offset: ['start end', 'end end'] });
  const wordY = useTransform(scrollYProgress, [0, 1], ['60%', '0%']);
  const wordOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <footer className={styles.footer}>
      <Container>
        <FadeIn className={styles.cta}>
          <div>
            <h2>{t.footer.ctaTitle}</h2>
            <p>{t.footer.ctaBody}</p>
          </div>
          <div className={styles.ctaActions}>
            <Button href={isHome ? '#join' : '/#join'} variant="accent">
              {t.footer.getInvolved} <ArrowRight size={18} />
            </Button>
            <Button to="/contact" variant="outline" className={styles.ctaOutline}>
              {t.footer.contactUs}
            </Button>
          </div>
        </FadeIn>

        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <img src={logo} alt="" width={52} height={52} />
              <span>{t.org.fullName}</span>
            </Link>
            <p className={styles.text}>{t.about.short}</p>
            <div className={styles.social}>
              {SOCIAL_LINKS.map((social) => {
                const Icon = ICONS[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={styles.socialLink}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className={styles.heading}>{t.footer.quickLinks}</h3>
            <ul className={styles.list}>
              {FOOTER_LINKS.map((link) => {
                const href = link.href.startsWith('#') && !isHome ? `/${link.href}` : link.href;
                return (
                  <li key={link.key}>
                    {href.startsWith('/') && !href.startsWith('/#') ? (
                      <Link to={href}>{t.footer.links[link.key]}</Link>
                    ) : (
                      <a href={href}>{t.footer.links[link.key]}</a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className={styles.heading}>{t.footer.contact}</h3>
            <ul className={styles.contactList}>
              <li>
                <MapPin size={16} /> <span>{t.org.address}</span>
              </li>
              <li>
                <Phone size={16} /> <a href={PHONE_HREF}>{SITE.phone}</a>
              </li>
              <li>
                <Mail size={16} /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div ref={wordRef} className={styles.wordmarkWrap} aria-hidden>
          <motion.span className={styles.wordmark} style={{ y: wordY, opacity: wordOpacity }}>
            NAVAYUGA
          </motion.span>
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} NAVAYUGA. {t.footer.rights}{' '}
            <button type="button" className={styles.cookieLink} onClick={openBanner}>
              {t.footer.cookieSettings}
            </button>
          </p>
          <p>
            {t.footer.managedBy}{' '}
            <a href="https://poorvadi.com/" target="_blank" rel="noopener noreferrer">
              poorvadi.com
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
