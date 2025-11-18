
import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

import Logo from '@/components/logo';

export default function Footer() {
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
  ];

  const legalLinks = [
    { name: 'Policies', href: '/policies' },
    { name: 'FAQ', href: '/faq' },
  ];

  const shopLinks = [
    { name: 'Braids', href: '/shop?category=braids' },
    { name: 'Weaves', href: '/shop?category=weaves' },
    { name: 'Crochet', href: '/shop?category=crochet' },
    { name: 'Ponytails', href: '/shop?category=ponytails' },
    { name: 'Shop All', href: '/shop' },
    { name: 'Hair Care Tips', href: '/hair-care-tips' },
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Experience Center', href: '/experience-center' },
    { name: 'Style 101', href: '/style-101' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container py-12">
        <div className="grid gap-8 grid-cols-2 md:grid-cols-12">
          <div className="col-span-2 md:col-span-12 lg:col-span-4 space-y-4">
            <Logo />
            <p className="text-muted-foreground max-w-xs">
              Find your perfect style with our high-quality wigs and AI-powered recommendations.
            </p>
          </div>
          <div className="md:col-span-2">
             <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2">
                {shopLinks.map(link => (
                    <li key={link.name}>
                        <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                            {link.name}
                        </Link>
                    </li>
                ))}
              </ul>
          </div>
           <div className="md:col-span-2">
             <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {companyLinks.map(link => (
                    <li key={link.name}>
                        <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                            {link.name}
                        </Link>
                    </li>
                ))}
              </ul>
          </div>
          <div className="md:col-span-2">
             <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                 {legalLinks.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
          </div>
          <div className="col-span-2 md:col-span-12 lg:col-span-2">
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <Link
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <social.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} WigVerse. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

    