import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { products } from "@/lib/products";
import ProductCard from "@/components/product/product-card";
import { placeholderImages } from "@/lib/placeholder-images";

export default function Home() {
  const featuredProducts = products.slice(0, 8);
  const heroImage = placeholderImages.find(p => p.id === 'hero');

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="relative w-full h-[60vh] md:h-[80vh]">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover object-top"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="relative h-full flex flex-col items-start justify-end p-4 md:p-12 lg:p-24">
          <div className="max-w-2xl text-left">
            <h1 className="text-4xl font-headline tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Discover Your Crown
            </h1>
            <p className="mt-4 text-lg text-foreground/90">
              Explore our exquisite collection of high-quality wigs and find the perfect style that expresses your unique beauty.
            </p>
            <div className="mt-6 flex gap-4">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/shop">
                  Shop All Wigs <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-headline tracking-tighter sm:text-5xl">Featured Styles</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Handpicked for you. Discover our most popular and trending wigs of the season.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-12">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {featuredProducts.map((product) => (
                  <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <ProductCard product={product} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-card">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-headline tracking-tighter sm:text-4xl md:text-5xl">Unsure Where To Start?</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
              Browse our curated collection of best-sellers and customer favorites. We have a style for every occasion and personality. Your perfect look is just a click away.
            </p>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/shop">
                Explore Best-Sellers
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://picsum.photos/seed/shop-now/600/600"
              width={600}
              height={600}
              alt="Woman trying on wigs"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
              data-ai-hint="fashion model"
            />
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-headline tracking-tighter text-center sm:text-5xl mb-12">What Our Customers Say</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-primary stroke-primary" />)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium text-lg">&ldquo;Absolutely in love!&rdquo;</p>
                <p className="text-muted-foreground">The quality is amazing and it looks so natural. I've received so many compliments since I started wearing it.</p>
                <footer className="font-semibold pt-2">- Sarah J.</footer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-primary stroke-primary" />)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium text-lg">&ldquo;A total confidence booster.&rdquo;</p>
                <p className="text-muted-foreground">I was hesitant about buying a wig online, but WigVerse made it so easy. My new wig is comfortable and stylish.</p>
                <footer className="font-semibold pt-2">- Maria K.</footer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map  ((_, i) => <Star key={i} className="w-5 h-5 fill-primary stroke-primary" />)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium text-lg">&ldquo;Fantastic customer service.&rdquo;</p>
                <p className="text-muted-foreground">The team was so helpful with my questions. Shipping was fast and the packaging was beautiful. Highly recommend!</p>
                <footer className="font-semibold pt-2">- Chloe T.</footer>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
