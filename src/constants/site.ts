import type { NavLink } from '@/types';

// Site-wide content and settings. Edit here instead of hard-coding in components.
export const SITE = {
  name: 'Navayuga',
  tagline: 'Building the next era, today.',
  email: 'hello@example.com',
  phone: '+91 00000 00000',
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];
