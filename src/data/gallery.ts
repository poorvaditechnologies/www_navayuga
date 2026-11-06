import achyuth from '@/assets/gallery/achyuth.webp';
import achyuthThumb from '@/assets/gallery/achyuth-thumb.webp';
import childrenLearning from '@/assets/gallery/children-learning.webp';
import childrenLearningThumb from '@/assets/gallery/children-learning-thumb.webp';
import office from '@/assets/gallery/office.webp';
import officeThumb from '@/assets/gallery/office-thumb.webp';
import officeVisit from '@/assets/gallery/office-visit.webp';
import officeVisitThumb from '@/assets/gallery/office-visit-thumb.webp';
import planting from '@/assets/gallery/planting.webp';
import plantingThumb from '@/assets/gallery/planting-thumb.webp';
import shgGathering from '@/assets/gallery/shg-gathering.webp';
import shgGatheringThumb from '@/assets/gallery/shg-gathering-thumb.webp';
import veeresh from '@/assets/gallery/veeresh.webp';
import veereshThumb from '@/assets/gallery/veeresh-thumb.webp';
import villageLife from '@/assets/gallery/village-life.webp';
import villageLifeThumb from '@/assets/gallery/village-life-thumb.webp';
import volunteer from '@/assets/gallery/volunteer.webp';
import volunteerThumb from '@/assets/gallery/volunteer-thumb.webp';
import volunteersTogether from '@/assets/gallery/volunteers-together.webp';
import volunteersTogetherThumb from '@/assets/gallery/volunteers-together-thumb.webp';
import womenEnterprise from '@/assets/gallery/women-enterprise.webp';
import womenEnterpriseThumb from '@/assets/gallery/women-enterprise-thumb.webp';
import womenLivelihoods from '@/assets/gallery/women-livelihoods.webp';
import womenLivelihoodsThumb from '@/assets/gallery/women-livelihoods-thumb.webp';
import { useT, type Dictionary } from '@/i18n';
import type { GalleryItem } from '@/types';

type CategoryKey = keyof Dictionary['gallery']['categories'];
type CaptionKey = keyof Dictionary['gallery']['captions'];

// To add a photo: drop a large and a ~640px "-thumb" WebP into src/assets/gallery, add an entry
// here, and add its caption under gallery.captions in both src/i18n/en.ts and kn.ts.
const GALLERY_MEDIA: {
  id: CaptionKey;
  src: string;
  thumb: string;
  category: CategoryKey;
  width: number;
  height: number;
}[] = [
  {
    id: 'shg-gathering',
    src: shgGathering,
    thumb: shgGatheringThumb,
    category: 'women',
    width: 6720,
    height: 4480,
  },
  {
    id: 'office-visit',
    src: officeVisit,
    thumb: officeVisitThumb,
    category: 'people',
    width: 664,
    height: 854,
  },
  {
    id: 'children-learning',
    src: childrenLearning,
    thumb: childrenLearningThumb,
    category: 'education',
    width: 6067,
    height: 3467,
  },
  {
    id: 'women-enterprise',
    src: womenEnterprise,
    thumb: womenEnterpriseThumb,
    category: 'women',
    width: 2560,
    height: 1707,
  },
  {
    id: 'volunteer',
    src: volunteer,
    thumb: volunteerThumb,
    category: 'volunteering',
    width: 4000,
    height: 6000,
  },
  {
    id: 'planting',
    src: planting,
    thumb: plantingThumb,
    category: 'environment',
    width: 5045,
    height: 3363,
  },
  { id: 'office', src: office, thumb: officeThumb, category: 'people', width: 1280, height: 383 },
  {
    id: 'village-life',
    src: villageLife,
    thumb: villageLifeThumb,
    category: 'rural',
    width: 6000,
    height: 4000,
  },
  { id: 'veeresh', src: veeresh, thumb: veereshThumb, category: 'people', width: 596, height: 691 },
  {
    id: 'women-livelihoods',
    src: womenLivelihoods,
    thumb: womenLivelihoodsThumb,
    category: 'women',
    width: 2560,
    height: 1707,
  },
  {
    id: 'volunteers-together',
    src: volunteersTogether,
    thumb: volunteersTogetherThumb,
    category: 'volunteering',
    width: 3984,
    height: 2496,
  },
  {
    id: 'achyuth',
    src: achyuth,
    thumb: achyuthThumb,
    category: 'people',
    width: 1439,
    height: 1423,
  },
];

export const GALLERY_COVER = GALLERY_MEDIA[0].src;

export function useGallery(): GalleryItem[] {
  const t = useT();
  return GALLERY_MEDIA.map((item) => ({
    ...item,
    caption: t.gallery.captions[item.id],
    category: t.gallery.categories[item.category],
  }));
}
