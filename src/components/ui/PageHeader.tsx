import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SplitText } from '@/components/animations';
import { useT } from '@/i18n';
import { EASE_OUT } from '@/lib/motion';
import { Container } from './Container';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
  title: string;
  description?: string;
  crumb: string;
  image?: string;
}

export function PageHeader({ title, description, crumb, image }: PageHeaderProps) {
  const t = useT();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <header ref={ref} className={styles.header}>
      {image && (
        <motion.div className={styles.imageLayer} style={{ y: imageY }}>
          <motion.img
            src={image}
            alt=""
            className={styles.image}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 1.8, ease: EASE_OUT }}
          />
        </motion.div>
      )}
      {image && <div className={styles.overlay} />}
      <Container>
        <motion.div className={styles.content} style={{ y: contentY, opacity: contentOpacity }}>
          <motion.nav
            className={styles.crumbs}
            aria-label={t.common.breadcrumb}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <Link to="/">{t.common.breadcrumbHome}</Link>
            <ChevronRight size={14} />
            <span>{crumb}</span>
          </motion.nav>
          <SplitText as="h1" text={title} immediate delay={0.1} />
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: EASE_OUT }}
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </Container>
    </header>
  );
}
