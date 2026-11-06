import {
  community,
  education,
  empowerment,
  environment,
  healthcare,
  ruralDevelopment,
} from '@/assets/images';
import { useT } from '@/i18n';
import type { Program } from '@/types';

// Order matches t.programs.items.
const PROGRAM_MEDIA = [
  { id: 1, image: ruralDevelopment },
  { id: 2, image: empowerment },
  { id: 3, image: education },
  { id: 4, image: healthcare },
  { id: 5, image: community },
  { id: 6, image: environment },
];

export function usePrograms(): Program[] {
  const t = useT();
  return PROGRAM_MEDIA.map((media, i) => ({ ...media, ...t.programs.items[i] }));
}
