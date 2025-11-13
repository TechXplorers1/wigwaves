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
        { name: 'Long', href: '/shop?length=Long' },
        { name: 'Medium', href: '/shop?length=Medium' },
        { name: 'Short', href: '/shop?length=Short' },
    ]
  },
  { name: 'Weaves', href: '/shop?category=weaves' },
  { name: 'Crochet', href: '/shop?category=crochet' },
  { name: 'Ponytails', href: '/shop?category=ponytails' },
  { name: 'Shop', href: '/shop' },
];

export const NAV_LINKS = [...PRIMARY_NAV_LINKS, ...SECONDARY_NAV_LINKS];
