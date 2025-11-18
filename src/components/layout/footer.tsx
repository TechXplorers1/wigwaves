
import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

import Logo from '@/components/logo';

export default function Footer() {
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
  ];

  const mainLinks = [
    { name: 'Home', href: '/' },
    { name: 'Category', href: '/shop' },
    { name: 'Products', href: '/shop' },
    { name: 'About Us', href: '/about' },
    { name: 'Gallery', href: '#' },
    { name: 'Videos', href: '#' },
    { name: 'Testimonials', href: '#' },
    { name: 'Contact Us', href: '/contact' },
  ];


  return (
    <footer className="bg-card border-t">
      <div className="container py-12">
        <div className="grid gap-8 grid-cols-2 md:grid-cols-12">
          <div className="col-span-2 md:col-span-12 lg:col-span-4 space-y-4">
            <Logo />
            <p className="text-muted-foreground max-w-xs">
              The most reputed hair & wig extensions suppliers in the city.
            </p>
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
          <div className="md:col-span-4 lg:col-span-3 lg:col-start-7">
             <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
              <ul className="space-y-2 columns-2">
                {mainLinks.map(link => (
                    <li key={link.name}>
                        <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                            {link.name}
                        </Link>
                    </li>
                ))}
              </ul>
          </div>
          <div className="md:col-span-4 lg:col-span-3">
             <h3 className="font-semibold mb-4 text-lg">Contact Us</h3>
             <address className="not-italic text-muted-foreground space-y-2">
                <p>Malad West, Mumbai, Maharashtra</p>
                <p>
                  <Link href="tel:+918888888888" className="hover:text-primary">+91-8888888888</Link>
                </p>
                <p>
                  <Link href="mailto:websupport@justdial.com" className="hover:text-primary">websupport@justdial.com</Link>
                </p>
             </address>
          </div>

        </div>
        <div className="mt-12 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GG Wig. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
