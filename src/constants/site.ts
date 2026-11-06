import type { Dictionary } from '@/i18n';

// Language-independent site settings. All visible text lives in src/i18n.
export const SITE = {
  email: 'contact@navayuga.org.in',
  phone: '+91 8277699488',
  mapsUrl: 'https://maps.google.com/?q=Batawadi+Tumakuru+Karnataka+572103',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4595.051236754264!2d77.12910432571879!3d13.33238290686446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb02c420e38a5bd%3A0x228b75483b5674ad!2sBatawadi%2C%20Tumakuru%2C%20Karnataka%20572103%2C%20India!5e1!3m2!1sen!2sau!4v1723483774410!5m2!1sen!2sau',
} as const;

export const PHONE_HREF = `tel:${SITE.phone.replace(/\s/g, '')}`;

export const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com', icon: 'facebook' },
  { label: 'Twitter', href: 'https://www.twitter.com', icon: 'twitter' },
  { label: 'Instagram', href: 'https://www.instagram.com', icon: 'instagram' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: 'linkedin' },
  { label: 'YouTube', href: 'https://www.youtube.com', icon: 'youtube' },
] as const;

export const NAV_LINKS: { key: keyof Dictionary['nav']; href: string }[] = [
  { key: 'home', href: '#home' },
  { key: 'about', href: '#about' },
  { key: 'programs', href: '#programs' },
  { key: 'getInvolved', href: '#getinvolved' },
  { key: 'gallery', href: '/gallery' },
];

export const FOOTER_LINKS: { key: keyof Dictionary['footer']['links']; href: string }[] = [
  { key: 'home', href: '#home' },
  { key: 'aboutUs', href: '#about' },
  { key: 'ourPrograms', href: '#programs' },
  { key: 'gallery', href: '/gallery' },
  { key: 'contactUs', href: '/contact' },
  { key: 'getInvolved', href: '#getinvolved' },
];

export const EMAILJS = {
  serviceId: 'service_7nwixk3',
  joinTemplateId: 'template_s0htrv7',
  publicKey: 'G-p0XrbZc9fXRODSL',
} as const;
