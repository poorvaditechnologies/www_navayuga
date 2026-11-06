import { canara, karnatakaGov, lakshmi, veeresh, vidya } from '@/assets/images';
import { useT } from '@/i18n';
import type { Testimonial } from '@/types';

// Order matches t.testimonials.items.
const TESTIMONIAL_IMAGES = [veeresh, vidya, canara, karnatakaGov, lakshmi, karnatakaGov];

export function useTestimonials(): Testimonial[] {
  const t = useT();
  return t.testimonials.items.map((item, i) => ({ ...item, image: TESTIMONIAL_IMAGES[i] }));
}
