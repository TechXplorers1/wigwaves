
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
                Palm Court Bldg M 501/8, 5th Floor, New Link Road, Beside Goregaon Sports Complex, Malad West, Mumbai, Maharashtra 400064
            </address>
          </div>
           <div className="flex flex-col gap-2">
            <Mail className='w-7 h-7 text-primary mb-2'/>
            <h3 className="font-semibold text-lg">General Enquiries</h3>
            <p className="text-muted-foreground">
                <Link href="mailto:websupport@justdial.com" className="hover:text-primary">websupport@justdial.com</Link>
            </p>
          </div>
           <div className="flex flex-col gap-2">
            <Phone className='w-7 h-7 text-primary mb-2'/>
            <h3 className="font-semibold text-lg">Call Us</h3>
             <p className="text-muted-foreground">
                <Link href="tel:+918888888888" className="hover:text-primary">+91-8888888888</Link>
            </p>
          </div>
           <div className="flex flex-col gap-2">
            <Clock className='w-7 h-7 text-primary mb-2'/>
            <h3 className="font-semibold text-lg">Our Timings</h3>
             <p className="text-muted-foreground">
                Mon - Sun: 10:00 AM - 07:00 PM
            </p>
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
