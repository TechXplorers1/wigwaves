

'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart as ShoppingCartIcon, PlayCircle, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import TestimonialCarousel from "@/components/testimonial-carousel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProducts } from "@/context/product-context";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const categories = [
  { name: 'Wigs', image: 'https://www.atozhair.net/wp-content/uploads/2021/03/women-natural-hair-wig-500x500-1.jpg', href: '/shop?category=wigs' },
  { name: 'Hair Extension', image: 'https://frontrow.co.za/cdn/shop/files/brownblackkinkystraightextensionsf.jpg?v=1701087156', href: '/shop?category=extensions' },
  { name: 'Toupees', image: 'https://i.etsystatic.com/22505350/r/il/0d83c3/6352668740/il_fullxfull.6352668740_tdmi.jpg', href: '/shop?category=toupees' },
];

const galleryImages = [
    { src: '/Woman_applying.png', alt: 'Woman applying hair extensions', hint: 'hair extensions application'},
    { src: '/various_hair.png', alt: 'A collection of various hair extensions', hint: 'hair extensions display'},
    { src: '/closeup_hair.png', alt: 'Close-up of hair extensions being fitted', hint: 'hair fitting'},
];

const heroItems = [
  {
     image: "https://plus.unsplash.com/premium_photo-1706377274456-885d63f5ea2a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Get The Best Quality",
    subtitle: "Hair and Wig Extensions Here",
    alt: "Woman with beautiful natural afro hair smiling",
  },
  {
   
     image: "https://cdn.pixabay.com/photo/2024/01/06/15/26/ai-generated-8491587_1280.jpg",
    title: "Summer Styles Are Here",
    subtitle: "Find your perfect look for the season",
    alt: "Megan Thee Stallion on her Hot Girl Summer Tour",
  },
  {
    image: "https://www.billboard.com/wp-content/uploads/2023/03/Megan-Thee-Stallion-vanity-fair-oscar-party-billboard-1548.jpg",
    title: "Hollywood Glamour",
    subtitle: "Shine like a star",
    alt: "Megan Thee Stallion at an Oscar party",
  }
];

export default function Home() {
  const { products, loading: productsLoading } = useProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const featuredProducts = products.slice(0, 8);

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section id="home" className="relative w-full h-[50vh] md:h-[70vh] bg-gray-900 text-white">
        <Carousel
          className="w-full h-full"
          opts={{ loop: true }}
        >
          <CarouselContent>
            {heroItems.map((item, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-[50vh] md:h-[70vh]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover object-center opacity-40"
                    priority={index === 0}
                  />
                  <div className="relative h-full flex flex-col items-center justify-center text-center p-4">
                    <h1 className="text-4xl md:text-6xl font-headline tracking-tight text-white">
                      {item.title}
                    </h1>
                    <p className="mt-2 text-2xl md:text-4xl text-white/90">
                      {item.subtitle}
                    </p>
                    <Button asChild size="lg" className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
                      <Link href="/shop">
                        Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex bg-black/50 text-white border-none hover:bg-black" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex bg-black/50 text-white border-none hover:bg-black" />
        </Carousel>
      </section>

      <section id="category" className="w-full py-12 md:py-24 bg-background">
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

      <section id="products" className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-headline tracking-tighter">Products</h2>
          </div>
          {productsLoading ? (
            <div className="w-full max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardHeader className="p-0">
                    <Skeleton className="aspect-[3/4] rounded-t-lg" />
                  </CardHeader>
                  <CardContent className="p-4 text-center">
                    <Skeleton className="h-5 w-3/4 mx-auto" />
                  </CardContent>
                  <CardFooter className="flex flex-col items-center gap-2 p-4 pt-0">
                    <Skeleton className="h-7 w-1/2" />
                    <Skeleton className="h-9 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
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
                          <Button size="sm" variant="outline" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => handleAddToCart(product)}>
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
            )}
             <div className="text-center mt-8">
              <Button asChild size="lg">
                <Link href="/shop">View All Products</Link>
              </Button>
            </div>
        </div>
      </section>
      
      <section id="about" className="w-full bg-zinc-900 text-white">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-headline tracking-tighter">About Us</h2>
              <p className="text-base md:text-lg text-zinc-300 leading-relaxed">
                We, WigWaves at Malad West in Mumbai, Maharashtra, are one of the most reputed hair & wig extensions suppliers in the city. You can choose from various colours of hair extension and different lengths to choose in the wigs. You can definitely find the one that suits you & your personality perfectly. We are always pursuing better hair quality and at the same time, keeping our customers as our only priority.
              </p>
            </div>
            <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden">
                <Image
                  src="https://www.elevatestyles.com/cdn/shop/products/QHMPPWNW20_WW-Natural-Wave-20_Left_200x.jpg?v=1645560724"
                  alt="Woman with black bob haircut"
                  fill
                  className="object-cover"
                  data-ai-hint="woman model"
                />
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="w-full py-12 md:py-24 bg-gray-50">
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

      {/* <section id="videos" className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-headline tracking-tighter">Videos</h2>
          </div>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-video overflow-hidden rounded-lg">
              <iframe
                src="https://www.youtube.com/embed/KgpnfT5bgLY"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="aspect-video overflow-hidden rounded-lg">
              <iframe
                src="https://www.youtube.com/embed/MKUDHKf_pkg"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section> */}

      <section id="testimonials" className="w-full py-12 md:py-24 bg-zinc-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-headline tracking-tighter">Testimonials</h2>
          </div>
           <TestimonialCarousel />
        </div>
      </section>

      <section id="contact" className="w-full py-12 md:py-24 bg-background">
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

      <section className="w-full h-[400px] md:h-[500px]">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.743469992083!2d3.402224074749365!3d6.427181893568853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b30f81a1671%3A0x8a949b3s6756456!2sElegaza%20House!5e0!3m2!1sen!2sus!4v1717866345678!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>
      </section>
    </div>
  );
}

    

    




    

    

    




    

    

    

    

    
