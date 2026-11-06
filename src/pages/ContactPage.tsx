import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { contactPhoto } from '@/assets/images';
import { FadeIn } from '@/components/animations';
import { Button, Container, PageHeader } from '@/components/ui';
import { PHONE_HREF, SITE } from '@/constants/site';
import { useT } from '@/i18n';
import styles from './ContactPage.module.css';

interface FormState {
  fullName: string;
  email: string;
  message: string;
}

type Field = keyof FormState;

const EMPTY_FORM: FormState = { fullName: '', email: '', message: '' };
const NO_ERRORS: Record<Field, boolean> = { fullName: false, email: false, message: false };

export function ContactPage() {
  const [formData, setFormData] = useState<FormState>(EMPTY_FORM);
  const t = useT();
  const [errors, setErrors] = useState(NO_ERRORS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const info: { icon: typeof MapPin; label: string; value: string; href?: string }[] = [
    { icon: MapPin, label: t.contactPage.visit, value: t.org.address },
    { icon: Phone, label: t.contactPage.call, value: SITE.phone, href: PHONE_HREF },
    { icon: Mail, label: t.contactPage.emailUs, value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Clock, label: t.contactPage.hours, value: t.contactPage.hoursValue },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validate = () => {
    const next = {
      fullName: !formData.fullName.trim(),
      email: !/\S+@\S+\.\S+/.test(formData.email),
      message: !formData.message.trim(),
    };
    setErrors(next);
    return !next.fullName && !next.email && !next.message;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    window.setTimeout(() => {
      setSent(true);
      setFormData(EMPTY_FORM);
      setIsSubmitting(false);
    }, 900);
  };

  const fieldClass = (name: Field) => `${styles.field} ${errors[name] ? styles.invalid : ''}`;

  return (
    <>
      <PageHeader
        title={t.contactPage.title}
        description={t.contactPage.description}
        crumb={t.contactPage.crumb}
        image={contactPhoto}
      />

      <section className={styles.section}>
        <Container>
          <div className={styles.grid}>
            <FadeIn direction="left" className={styles.infoCol}>
              {info.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <>
                    <span className={styles.infoIcon}>
                      <Icon size={20} />
                    </span>
                    <span>
                      <small>{label}</small>
                      {value}
                    </span>
                  </>
                );
                return href ? (
                  <a key={label} href={href} className={styles.info}>
                    {content}
                  </a>
                ) : (
                  <div key={label} className={styles.info}>
                    {content}
                  </div>
                );
              })}
            </FadeIn>

            <FadeIn direction="right" className={styles.formCard}>
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    className={styles.sent}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <CheckCircle2 size={60} />
                    <h2>{t.contactPage.sentTitle}</h2>
                    <p>{t.contactPage.sentBody}</p>
                    <Button variant="outline" onClick={() => setSent(false)}>
                      {t.contactPage.sendAnother}
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h2>{t.contactPage.formTitle}</h2>

                    <div className={fieldClass('fullName')}>
                      <label htmlFor="fullName">{t.contactPage.fullName}</label>
                      <input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder={t.contactPage.fullNamePlaceholder}
                      />
                      <AnimatePresence>
                        {errors.fullName && <ErrorText text={t.contactPage.errors.fullName} />}
                      </AnimatePresence>
                    </div>

                    <div className={fieldClass('email')}>
                      <label htmlFor="email">{t.contactPage.email}</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.contactPage.emailPlaceholder}
                      />
                      <AnimatePresence>
                        {errors.email && <ErrorText text={t.contactPage.errors.email} />}
                      </AnimatePresence>
                    </div>

                    <div className={fieldClass('message')}>
                      <label htmlFor="message">{t.contactPage.message}</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t.contactPage.messagePlaceholder}
                      />
                      <AnimatePresence>
                        {errors.message && <ErrorText text={t.contactPage.errors.message} />}
                      </AnimatePresence>
                    </div>

                    <Button type="submit" disabled={isSubmitting} className={styles.submit}>
                      {isSubmitting ? (
                        t.contactPage.sending
                      ) : (
                        <>
                          {t.contactPage.send} <Send size={16} />
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}

function ErrorText({ text }: { text: string }) {
  return (
    <motion.p
      className={styles.error}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      {text}
    </motion.p>
  );
}
