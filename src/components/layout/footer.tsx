import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

import Logo from '@/components/logo';
import { NAV_LINKS } from '@/lib/constants';

export default function Footer() {
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground max-w-xs">
              Find your perfect style with our high-quality wigs and AI-powered recommendations.
            </p>
          </div>
          <div className="grid grid-cols-2 md:col-span-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {NAV_LINKS.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
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
