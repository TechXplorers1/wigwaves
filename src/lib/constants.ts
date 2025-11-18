export const APP_NAME = 'WigVerse';

export const PRIMARY_NAV_LINKS = [
  { name: 'About Us', href: '/about' },
  { name: 'Experience Center', href: '/experience-center' },
  { name: 'Style 101', href: '/style-101' },
  { name: 'Contact Us', href: '/contact' },
];

export const SECONDARY_NAV_LINKS = [
  { name: 'Shop', href: '/shop' },
  { name: 'New', href: '/shop?category=new' },
  { name: 'Braids', href: '/shop?category=braids' },
  { name: 'Weaves', href: '/shop?category=weaves' },
  { name: 'Crochet', href: '/shop?category=crochet' },
  { name: 'Ponytails', href: '/shop?category=ponytails' },
];

export const NAV_LINKS = [...PRIMARY_NAV_LINKS, ...SECONDARY_NAV_LINKS];
