import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, HandHeart, Megaphone, Users } from 'lucide-react';
import { community } from '@/assets/images';
import { FadeIn, Parallax } from '@/components/animations';
import { Button, Container } from '@/components/ui';
import { sendJoinRequest } from '@/services/emailjs';
import { useT } from '@/i18n';
import styles from './JoinSection.module.css';

const FIELDS = [
  { name: 'firstName', required: true, half: true },
  { name: 'lastName', required: true, half: true },
  { name: 'phoneNumber', type: 'tel', half: true },
  { name: 'postalCode', half: true },
  { name: 'address' },
  { name: 'email', type: 'email', required: true },
] as const;

type FieldName = (typeof FIELDS)[number]['name'];
type JoinFormData = Record<FieldName, string>;

const EMPTY_FORM = Object.fromEntries(FIELDS.map((f) => [f.name, ''])) as JoinFormData;

const WAY_ICONS = [HandHeart, Users, Megaphone];

export function JoinSection() {
  const t = useT();
  const [formData, setFormData] = useState<JoinFormData>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await sendJoinRequest({
        from_name: `${formData.firstName} ${formData.lastName}`,
        ...formData,
      });
      setSuccess(true);
      setFormData(EMPTY_FORM);
    } catch {
      setError(t.join.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="join" className={styles.section}>
      <Parallax className={styles.bg} offset={80}>
        <img src={community} alt="" loading="lazy" />
      </Parallax>
      <div className={styles.overlay} />

      <Container>
        <div className={styles.grid}>
          <FadeIn direction="left" className={styles.intro}>
            <span className="eyebrow">{t.join.eyebrow}</span>
            <h2>{t.join.title}</h2>
            <p>{t.join.p1}</p>
            <p>{t.join.p2}</p>
            <ul className={styles.ways}>
              {t.join.ways.map((label, i) => {
                const Icon = WAY_ICONS[i];
                return (
                  <li key={label}>
                    <Icon size={18} /> {label}
                  </li>
                );
              })}
            </ul>
          </FadeIn>

          <FadeIn direction="right" className={styles.formCard}>
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  className={styles.success}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    <CheckCircle2 size={64} />
                  </motion.span>
                  <h3>{t.join.successTitle}</h3>
                  <p>{t.join.successBody}</p>
                  <Button variant="outline" onClick={() => setSuccess(false)}>
                    {t.join.submitAnother}
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className={styles.form}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3>{t.join.formTitle}</h3>
                  <div className={styles.fields}>
                    {FIELDS.map((field) => (
                      <div
                        key={field.name}
                        className={`${styles.field} ${'half' in field ? styles.half : ''}`}
                      >
                        <input
                          id={`join-${field.name}`}
                          name={field.name}
                          type={'type' in field ? field.type : 'text'}
                          value={formData[field.name]}
                          onChange={handleChange}
                          required={'required' in field}
                          placeholder=" "
                        />
                        <label htmlFor={`join-${field.name}`}>{t.join.fields[field.name]}</label>
                      </div>
                    ))}
                  </div>
                  {error && <p className={styles.error}>{error}</p>}
                  <Button type="submit" disabled={loading} className={styles.submit}>
                    {loading ? (
                      <span className={styles.spinner} aria-label={t.join.joining} />
                    ) : (
                      t.join.submit
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
