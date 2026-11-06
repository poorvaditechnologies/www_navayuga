import { Sparkle } from 'lucide-react';
import { useT } from '@/i18n';
import styles from './FocusMarquee.module.css';

export function FocusMarquee() {
  const t = useT();
  const areas = t.focus.items;
  const items = [...areas, ...areas];
  return (
    <div className={styles.band} aria-label={t.focus.label}>
      <div className={styles.track}>
        {items.map((item, i) => (
          <span className={styles.item} key={i} aria-hidden={i >= areas.length}>
            <Sparkle size={16} className={styles.icon} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
