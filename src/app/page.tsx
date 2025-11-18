
'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart as ShoppingCartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { products } from "@/lib/products";
import ProductCard from "@/components/product/product-card";

const categories = [
  { name: 'Wigs', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzB_tHlS6o5nJk5hY2x_mYd2k1Z5fXz7g3g&s', href: '/shop?category=wigs' },
  { name: 'Hair Extension', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5_VwZJgH8s7sQ3wXy3R4E6d3d9K7_vYw&s', href: '/shop?category=extensions' },
  { name: 'Toupees', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLb-p2hF4-9q3fJp2eH-jB7U9W5xW8fC-Q&s', href: '/shop?category=toupees' },
];

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

      <section className="w-full py-12 md:py-24 bg-gray-50">
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

      <section className="w-full py-12 md:py-24">
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
                          <div className="aspect-square relative">
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

      <section className="w-full py-12 md:py-24 bg-gray-50">
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
