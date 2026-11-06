import { achyuth } from '@/assets/images';
import { useT } from '@/i18n';
import type { TeamMember } from '@/types';

// Order matches t.team.members; undefined means no photo yet (initials are shown).
const TEAM_PHOTOS: (string | undefined)[] = [achyuth, undefined, undefined];

export function useTeam(): TeamMember[] {
  const t = useT();
  return t.team.members.map((member, i) => ({ ...member, image: TEAM_PHOTOS[i] }));
}
