
'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Prakash',
    quote: 'Volume and length of hair is too good. I am satisfied.',
    image: 'https://avatars.githubusercontent.com/u/192782454?v=4',
    imageHint: 'testimonial avatar'
  },
  {
    name: 'Prakriti Lilani',
    quote: 'They have the best wigs and extensions for each and every event.',
    image: 'https://avatars.githubusercontent.com/u/192782454?v=4',
    imageHint: 'testimonial avatar'
  },
   {
    name: 'Jessica Smith',
    quote: 'The quality is amazing and it looks so natural. I get compliments all the time!',
    image: 'https://avatars.githubusercontent.com/u/192782454?v=4',
    imageHint: 'testimonial avatar'
  },
];

export default function TestimonialCarousel() {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnInteraction: false,
        })
      ]}
      className="w-full max-w-3xl mx-auto"
    >
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index}>
            <div className="p-1 text-center text-white">
                <Quote className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="text-lg md:text-xl font-semibold italic max-w-2xl mx-auto">
                    {testimonial.quote}
                </p>
                <p className="mt-4 text-base font-bold">
                    - {testimonial.name}
                </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-[-2.5rem] top-1/2 -translate-y-1/2 z-10 bg-transparent border-none text-white hover:text-primary" />
      <CarouselNext className="absolute right-[-2.5rem] top-1/2 -translate-y-1/2 z-10 bg-transparent border-none text-white hover:text-primary" />
    </Carousel>
  );
}

    