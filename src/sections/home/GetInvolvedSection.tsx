import { Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa6';
import { FadeIn, Stagger, StaggerItem } from '@/components/animations';
import { Button, Container, SectionHeading } from '@/components/ui';
import { useConsent } from '@/consent';
import { PHONE_HREF, SITE, SOCIAL_LINKS } from '@/constants/site';
import { useT } from '@/i18n';
import styles from './GetInvolvedSection.module.css';

const ICONS: Record<string, typeof FaFacebookF> = {
  facebook: FaFacebookF,
  twitter: FaTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
};

export function GetInvolvedSection() {
  const t = useT();
  const { choice, setChoice } = useConsent();

  const contacts = [
    { icon: MapPin, label: t.reach.address, value: t.org.address, href: SITE.mapsUrl },
    { icon: Phone, label: t.reach.phone, value: SITE.phone, href: PHONE_HREF },
    { icon: Mail, label: t.reach.email, value: SITE.email, href: `mailto:${SITE.email}` },
  ];

  return (
    <section id="getinvolved" className={styles.section}>
      <Container>
        <SectionHeading
          eyebrow={t.reach.eyebrow}
          title={t.reach.title}
          description={t.reach.description}
        />

        <div className={styles.grid}>
          <div className={styles.info}>
            <Stagger className={styles.contacts} gap={0.08}>
              {contacts.map(({ icon: Icon, label, value, href }) => (
                <StaggerItem key={href}>
                  <a
                    href={href}
                    className={styles.contact}
                    {...(href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    <span className={styles.contactIcon}>
                      <Icon size={20} />
                    </span>
                    <span>
                      <small>{label}</small>
                      {value}
                    </span>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>

            <FadeIn className={styles.hoursCard}>
              <h3>
                <Clock size={18} /> {t.reach.officeHours}
              </h3>
              <ul className={styles.hours}>
                {t.reach.hours.map((item) => (
                  <li key={item.label}>
                    <span>{item.label}</span>
                    <strong data-closed={item.closed}>{item.value}</strong>
                  </li>
                ))}
              </ul>

              <h3>{t.reach.followUs}</h3>
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
                    >
                      <Icon size={17} />
                    </a>
                  );
                })}
              </div>
            </FadeIn>
          </div>

          <FadeIn direction="right" className={styles.mapCard}>
            <div className={styles.mapHeader}>
              <MapPin size={18} />
              <span>
                <strong>{t.reach.ourLocation}</strong>
                {t.org.fullName}, {t.org.city}
              </span>
            </div>
            {choice === 'all' ? (
              <iframe
                src={SITE.mapEmbedUrl}
                className={styles.map}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t.reach.mapTitle}
              />
            ) : (
              <div className={styles.mapPlaceholder}>
                <span className={styles.mapPin}>
                  <MapPin size={26} />
                </span>
                <h4>{t.reach.mapConsentTitle}</h4>
                <p>{t.reach.mapConsentBody}</p>
                <div className={styles.mapActions}>
                  <Button onClick={() => setChoice('all')}>{t.reach.mapConsentAccept}</Button>
                  <Button
                    href={SITE.mapsUrl}
                    variant="outline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.reach.mapOpenExternal} <ExternalLink size={16} />
                  </Button>
                </div>
              </div>
            )}
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
