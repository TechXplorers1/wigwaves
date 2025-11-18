

import Image from 'next/image';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderImages } from '@/lib/placeholder-images';
import Breadcrumb from '@/components/layout/breadcrumb';

const ExperienceCenterPage = () => {
  const heroImage = placeholderImages.find(p => p.id === 'experience-hero');

  return (
    <div className="bg-background">
      
      {heroImage && (
        <section className="relative w-full h-[40vh] md:h-[50vh] mb-16">
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover object-center"
            priority
            data-ai-hint={heroImage.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </section>
      )}

      <div className="container mx-auto -mt-32 sm:-mt-48 px-4 md:px-8 relative z-10">
        <Breadcrumb />
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-headline tracking-tight text-foreground">
            Our Flagship Experience Center
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-base md:text-lg text-foreground/90">
            Our Flagship store consists of a Shop, Salon, and Training Open Space. It's a hub for everyone to explore our products, for our members to style their hair, and a training area where we organize regular workshops and events. We call our Flagship store an "EXPERIENCE CENTER".
          </p>
          <p className="mt-2 max-w-3xl mx-auto text-base md:text-lg text-foreground/90">
            Customers can touch, feel, wear, and get to know our products before they buy them. Come and let us enhance your beauty.
          </p>
        </div>

        {/* Location Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="w-full h-80 sm:h-96 lg:h-full rounded-lg overflow-hidden">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.743469992083!2d3.402224074749365!3d6.427181893568853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b30f81a1671%3A0x8a949b39d6756456!2sElegaza%20House!5e0!3m2!1sen!2sus!4v1717866345678!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="bg-card p-6 md:p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl md:text-3xl font-headline mb-6 text-foreground">Location Details</h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Address</h3>
                    <p>Eleganza House, 15B Joseph Street, Marina, Lagos, Nigeria</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Hours</h3>
                    <p>Mon - Fri: 10:00 - 17:00</p>
                    <p>Sat & Sun: Closed</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Contact Us</h3>
                    <p>+234 909 810 1010</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p>ng-contact@wigverse.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-12 md:gap-16">
          
          {/* Try Wigs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl md:text-3xl font-headline text-foreground mb-4">Try Any Wigs You Want</h3>
              <p className="text-base md:text-lg text-muted-foreground">
                You can try on the Wigs in our store. This is a great way to check the style and fit before you buy. You can also have on-the-spot product training and have all your questions answered. It's a shopping experience tailored to all your needs.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <Image src="https://picsum.photos/seed/experience-store/600/400" alt="WigVerse Store Interior" width={600} height={400} className="rounded-lg shadow-md object-cover" data-ai-hint="store interior" />
            </div>
          </div>

          {/* Professional Stylists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <Image src="https://picsum.photos/seed/experience-stylist/600/400" alt="Professional stylist station" width={600} height={400} className="rounded-lg shadow-md object-cover" data-ai-hint="salon chair" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-headline text-foreground mb-4">Professional Stylists Are Here For You</h3>
              <ul className="list-disc list-inside text-base md:text-lg text-muted-foreground space-y-2">
                <li>Special prices in the salon for our members.</li>
                <li>We care for your natural hair.</li>
                <li>We care & style your Wigs & Weaves.</li>
                <li>Make Wigs from our Weave products.</li>
              </ul>
              <p className="text-base md:text-lg text-muted-foreground mt-4">Trust us with all your styling needs! <br /><em className="text-sm">*Advance booking is recommended.</em></p>
            </div>
          </div>

          {/* Feedback & Workshops */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
             <div className="order-2 md:order-1">
              <h3 className="text-2xl md:text-3xl font-headline text-foreground mb-4">We Cherish Your Feedback</h3>
              <p className="text-base md:text-lg text-muted-foreground mb-4">
                Seminars, Trainings and Workshops are held on the first floor. We organize seminars and trainings for stylists to help them develop their skills and increase their knowledge.
              </p>
              <p className="text-base md:text-lg text-muted-foreground">
                The workshop sessions give our users the opportunity to take part in product development. <a href="#" className="underline text-primary">Click Here</a> for the latest information on seminars, trainings and workshops.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <Image src="https://picsum.photos/seed/experience-workshop/600/400" alt="Workshop and training area" width={600} height={400} className="rounded-lg shadow-md object-cover" data-ai-hint="workshop room" />
            </div>
          </div>

          {/* Patronage Reward */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <Image src="https://picsum.photos/seed/experience-reward/600/400" alt="Customer being attended to" width={600} height={400} className="rounded-lg shadow-md object-cover" data-ai-hint="salon reception" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-headline text-foreground mb-4">Patronage Reward</h3>
              <p className="text-base md:text-lg text-muted-foreground mb-4">
                Our patronage reward is free to join. The patronage reward status is changed according to the amount spent within a certain period of time (1 year).
              </p>
              <p className="text-base md:text-lg text-muted-foreground">
                <a href="#" className="underline text-primary">Click Here</a> for more information!
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExperienceCenterPage;

    