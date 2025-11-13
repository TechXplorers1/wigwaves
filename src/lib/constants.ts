export const APP_NAME = 'WigVerse';

export const PRIMARY_NAV_LINKS = [
  { name: 'About Us', href: '/about' },
  { name: 'Experience Center', href: '/experience-center' },
  { name: 'Style 101', href: '/style-101' },
  { name: 'Contact Us', href: '/contact' },
];

export const SECONDARY_NAV_LINKS = [
  { name: 'New', href: '/shop?category=new' },
  { name: 'Braids', href: '/shop?category=braids' },
  { 
    name: 'Wigs', 
    href: '/shop?category=wigs',
    sublinks: [
        { name: 'Straight', href: '/shop?style=Straight' },
        { name: 'Wavy', href: '/shop?style=Wavy' },
        { name: 'Curly', href: '/shop?style=Curly' },
    ]
  },
  { name: 'Weaves', href: '/shop?category=weaves' },
  { name: 'Crochet', href: '/shop?category=crochet' },
  { name: 'Ponytails', href: '/shop?category=ponytails' },
  { name: 'Shop', href: '/shop' },
];

export const NAV_LINKS = [...PRIMARY_NAV_LINKS, ...SECONDARY_NAV_LINKS];
