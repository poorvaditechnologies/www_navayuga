import { useState } from 'react';
import { motion } from 'motion/react';
import { Maximize2 } from 'lucide-react';
import { Lightbox } from '@/components/gallery/Lightbox';
import { Container, PageHeader } from '@/components/ui';
import { GALLERY_COVER, useGallery } from '@/data/gallery';
import { useT } from '@/i18n';
import { EASE_OUT } from '@/lib/motion';
import type { GalleryItem } from '@/types';
import styles from './GalleryPage.module.css';

function tileShape(item: GalleryItem) {
  const ratio = item.width / item.height;
  if (ratio < 0.9) return styles.tall;
  if (ratio > 1.65) return styles.wide;
  return '';
}

export function GalleryPage() {
  const t = useT();
  const GALLERY = useGallery();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <PageHeader
        title={t.gallery.title}
        description={t.gallery.description}
        crumb={t.gallery.crumb}
        image={GALLERY_COVER}
      />

      <section className={styles.section}>
        <Container>
          <ul className={styles.grid}>
            {GALLERY.map((item, i) => (
              <li key={item.id} className={`${styles.tile} ${tileShape(item)}`}>
                <motion.button
                  type="button"
                  data-gallery-id={item.id}
                  className={styles.tileButton}
                  onClick={() => setOpenIndex(i)}
                  aria-label={`${t.gallery.openPhoto}: ${item.caption}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease: EASE_OUT }}
                >
                  <img
                    src={item.thumb}
                    alt={item.caption}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    className={styles.image}
                  />
                  <span className={styles.info}>
                    <span>
                      <small>{item.category}</small>
                      {item.caption}
                    </span>
                    <Maximize2 size={18} />
                  </span>
                </motion.button>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {openIndex !== null && (
        <Lightbox
          items={GALLERY}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
