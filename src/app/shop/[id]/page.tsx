'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { Star, Truck, ShieldCheck, Tag } from 'lucide-react';
import Breadcrumb from '@/components/layout/breadcrumb';
import ProductCard from '@/components/product/product-card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  const { addToCart } = useCart();

  const product = products.find(p => p.id === id);
  const relatedProducts = products.filter(p => p.style === product?.style && p.id !== product?.id).slice(0, 3);

  if (!product) {
    return <div className="container py-24 text-center">Product not found.</div>;
  }

  return (
    <div className="container py-8 md:py-16">
      <Breadcrumb />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Product Image Gallery */}
        <div className="aspect-[3/4] relative rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl lg:text-5xl font-headline tracking-tight mb-2">{product.name}</h1>
          <p className="text-3xl font-bold text-primary mb-4">${product.price.toFixed(2)}</p>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-primary stroke-primary" />)}
            </div>
            <span className="text-sm text-muted-foreground">(125 reviews)</span>
          </div>

          <p className="text-lg text-muted-foreground mb-6">{product.description}</p>
          
          <Button size="lg" className="w-full mb-8 bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => addToCart(product, 1)}>
            Add to Cart
          </Button>

          <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                  <Truck className="w-5 h-5 text-primary"/>
                  <p>Fast Shipping: <span className="font-semibold">Get it in 3-5 business days.</span></p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                  <ShieldCheck className="w-5 h-5 text-primary"/>
                  <p>Hassle-Free Returns: <span className="font-semibold">30-day return policy.</span></p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                  <Tag className="w-5 h-5 text-primary"/>
                  <p>Special Offer: <span className="font-semibold">Free shipping on orders over $100.</span></p>
              </div>
          </div>
          
           <Accordion type="single" collapsible className="w-full mt-8">
            <AccordionItem value="details">
              <AccordionTrigger>Product Details</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-2">
                  <li><span className="font-semibold">Style:</span> {product.style}</li>
                  <li><span className="font-semibold">Color:</span> {product.color}</li>
                  <li><span className="font-semibold">Length:</span> {product.length}</li>
                  <li><span className="font-semibold">Material:</span> {product.material}</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care">
              <AccordionTrigger>Care Instructions</AccordionTrigger>
              <AccordionContent>
                Wash gently with wig-safe shampoo and conditioner. Air dry on a wig stand. Avoid excessive heat styling to prolong the life of your wig. Store in a cool, dry place away from direct sunlight.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>
      </div>
      
       {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24">
          <h2 className="text-3xl font-headline text-center mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
