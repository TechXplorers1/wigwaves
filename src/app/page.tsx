
'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart as ShoppingCartIcon, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { products } from "@/lib/products";
import TestimonialCarousel from "@/components/testimonial-carousel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const categories = [
  { name: 'Wigs', image: 'https://www.atozhair.net/wp-content/uploads/2021/03/women-natural-hair-wig-500x500-1.jpg', href: '/shop?category=wigs' },
  { name: 'Hair Extension', image: 'https://frontrow.co.za/cdn/shop/files/brownblackkinkystraightextensionsf.jpg?v=1701087156', href: '/shop?category=extensions' },
  { name: 'Toupees', image: 'https://i.etsystatic.com/22505350/r/il/0d83c3/6352668740/il_fullxfull.6352668740_tdmi.jpg', href: '/shop?category=toupees' },
];

const galleryImages = [
    { src: 'https://picsum.photos/seed/gallery1/600/400', alt: 'Woman applying hair extensions', hint: 'hair extensions application'},
    { src: 'https://picsum.photos/seed/gallery2/600/400', alt: 'A collection of various hair extensions', hint: 'hair extensions display'},
    { src: 'https://picsum.photos/seed/gallery3/600/400', alt: 'Close-up of hair extensions being fitted', hint: 'hair fitting'},
]

export default function Home() {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="relative w-full h-[50vh] md:h-[70vh] bg-gray-900 text-white">
        <Image
          src="https://images.unsplash.com/photo-1596755094514-935154a18903?q=80&w=2070&auto=format&fit=crop"
          alt="Woman with beautiful hair"
          fill
          className="object-cover object-center opacity-40"
          priority
        />
        <div className="relative h-full flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-6xl font-headline tracking-tight text-white">
            Get The Best Quality
          </h1>
          <p className="mt-2 text-2xl md:text-4xl text-white/90">
            Hair and Wig Extensions Here
          </p>
          <Button asChild size="lg" className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/shop">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-headline tracking-tighter">Category</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.name} href={category.href} className="group">
                <Card className="overflow-hidden text-center h-full">
                  <CardHeader className="p-0">
                    <div className="aspect-square relative">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-xl font-bold">{category.name}</CardTitle>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-headline tracking-tighter">Products</h2>
          </div>
           <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {featuredProducts.map((product) => (
                  <CarouselItem key={product.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-2 md:pl-4">
                    <Card className="h-full">
                       <CardHeader className="p-0">
                          <div className="aspect-[3/4] relative">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover rounded-t-lg"
                            />
                          </div>
                        </CardHeader>
                      <CardContent className="p-4 text-center">
                        <h3 className="text-sm font-semibold h-10 line-clamp-2">{product.name}</h3>
                      </CardContent>
                      <CardFooter className="flex flex-col items-center gap-2 p-4 pt-0">
                          <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
                          <Button size="sm" variant="outline" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                              <ShoppingCartIcon className="mr-2 h-4 w-4" /> Add
                          </Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-headline tracking-tighter">Gallery</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             {galleryImages.map((img, index) => (
                <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                    <Image src={img.src} alt={img.alt} fill className="object-cover" data-ai-hint={img.hint} />
                </div>
             ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-headline tracking-tighter">Videos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
                <div className="relative aspect-video overflow-hidden rounded-lg group">
                    <Image src="https://picsum.photos/seed/video1/1280/720" alt="How to wear extensions" fill className="object-cover" data-ai-hint="woman tutorial"/>
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <PlayCircle className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform" />
                    </div>
                </div>
                <h3 className="font-semibold mt-4 text-lg">How to wear extension the right way</h3>
            </div>
             <div className="text-center">
                <div className="relative aspect-video overflow-hidden rounded-lg group">
                    <Image src="https://picsum.photos/seed/video2/1280/720" alt="Ultimate guide to hair extensions" fill className="object-cover" data-ai-hint="beauty vlogger"/>
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <PlayCircle className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform" />
                    </div>
                </div>
                <h3 className="font-semibold mt-4 text-lg">Ultimate guide to hair extensions</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
           <TestimonialCarousel />
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-headline tracking-tighter">Contact Us</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <Input placeholder="Full Name" />
                    <Input placeholder="Mobile Number" type="tel" />
                    <Input placeholder="Email ID" type="email" />
                </div>
                <div className="flex flex-col space-y-4">
                    <Textarea placeholder="Message" className="flex-grow" />
                    <Button type="submit" className="w-full md:w-auto md:self-end bg-accent text-accent-foreground hover:bg-accent/90">Submit</Button>
                </div>
            </form>
          </div>
        </div>
      </section>


      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-headline tracking-tighter">About Us</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-lg/relaxed mx-auto lg:mx-0">
              We, GG Wig at Malad West in Mumbai, Maharashtra, are one of the most reputed hair & wig extensions suppliers in the city. You can choose from various colours of hair extension and different lengths to choose in the wigs. You can definitely find the one that suits you & your personality perfectly. We are always pursuing better hair quality and at the same time, keeping our customers as our only priority.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://img.freepik.com/free-photo/hair-extension-color-palette-from-blond-brown-brunette-with-golden-highlights-curls-texture_101239-160.jpg"
              width={500}
              height={500}
              alt="Hair color swatches"
              className="mx-auto aspect-square overflow-hidden rounded-full object-cover"
              data-ai-hint="hair color palette"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
