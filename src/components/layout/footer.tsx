
import Link from 'next/link';
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone, Clock } from 'lucide-react';

import Logo from '@/components/logo';

export default function Footer() {

  return (
    <footer className="bg-card border-t">
      <div className="container py-12">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <MapPin className='w-7 h-7 text-primary mb-2'/>
            <h3 className="font-semibold text-lg">Our Office Address</h3>
            <address className="not-italic text-muted-foreground">
                Eleganza House, 15B Joseph Street, Marina, Lagos, Nigeria
            </address>
          </div>
           <div className="flex flex-col gap-2">
            <Mail className='w-7 h-7 text-primary mb-2'/>
            <h3 className="font-semibold text-lg">General Enquiries</h3>
            <p className="text-muted-foreground">
                <Link href="mailto:ng-contact@wigwaves.com" className="hover:text-primary">ng-contact@wigwaves.com</Link>
            </p>
          </div>
           <div className="flex flex-col gap-2">
            <Phone className='w-7 h-7 text-primary mb-2'/>
            <h3 className="font-semibold text-lg">Call Us</h3>
             <p className="text-muted-foreground">
                <Link href="tel:+2349098101010" className="hover:text-primary">+234 909 810 1010</Link>
            </p>
          </div>
           <div className="flex flex-col gap-2">
             <h3 className="font-semibold text-lg">Follow Us</h3>
            <div className="flex gap-4 mt-2">
                <Link href="#" className="text-muted-foreground hover:text-primary">
                    <Facebook className="w-6 h-6" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                    <Instagram className="w-6 h-6" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                    <Twitter className="w-6 h-6" />
                </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} WigWaves. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
