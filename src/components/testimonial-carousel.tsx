
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

const testimonials = [
  {
    name: 'Atul Mistry',
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
      className="w-full max-w-5xl mx-auto"
    >
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index} className="md:basis-1/2">
            <div className="p-1">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center sm:text-left">
                    <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex-shrink-0">
                        <Image
                            src={testimonial.image}
                            alt="Sleek Hair product box"
                            fill
                            className="rounded-lg object-cover"
                            data-ai-hint={testimonial.imageHint}
                        />
                    </div>
                    <div className="flex flex-col items-center sm:items-start">
                        <p className="text-lg md:text-xl font-semibold italic text-muted-foreground max-w-xs">
                         &ldquo;{testimonial.quote}&rdquo;
                        </p>
                        <p className="mt-4 text-base font-bold text-foreground">
                          - {testimonial.name}
                        </p>
                    </div>
                </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-[-1rem] top-1/2 -translate-y-1/2 z-10" />
      <CarouselNext className="absolute right-[-1rem] top-1/2 -translate-y-1/2 z-10" />
    </Carousel>
  );
}
