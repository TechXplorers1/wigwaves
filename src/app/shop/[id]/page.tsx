

'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { Star, Truck, ShieldCheck, Tag, Heart, Minus, Plus, ShoppingBag, Leaf, Lock, Award, Eye } from 'lucide-react';
import Breadcrumb from '@/components/layout/breadcrumb';
import ProductCard from '@/components/product/product-card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from 'react';
import { useProducts } from '@/context/product-context';

const capSizes = ["Small 21\"", "Medium 22\"", "Large 23\""];
const lengths = ["18", "20", "22", "24", "26"];

const capSizeAdjustments: { [key: string]: number } = {
  "Small 21\"": 0,
  "Medium 22\"": 15,
  "Large 23\"": 30,
};

const lengthAdjustments: { [key: string]: number } = {
  "18": 0,
  "20": 25,
  "22": 50,
  "24": 75,
  "26": 100,
};


export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedCapSize, setSelectedCapSize] = useState(capSizes[1]);
  const [selectedLength, setSelectedLength] = useState(lengths[2]);
  const [currentPrice, setCurrentPrice] = useState(0);


  const product = products.find(p => p.id === id);
  const relatedProducts = products.filter(p => p.style === product?.style && p.id !== product?.id).slice(0, 3);

  useEffect(() => {
    if (product) {
      const basePrice = product.price;
      const capAdjustment = capSizeAdjustments[selectedCapSize] || 0;
      const lengthAdjustment = lengthAdjustments[selectedLength] || 0;
      setCurrentPrice(basePrice + capAdjustment + lengthAdjustment);
    }
  }, [product, selectedCapSize, selectedLength]);

  if (!product) {
    return <div className="container py-24 text-center">Product not found.</div>;
  }
  
  const salePrice = currentPrice * 0.9;
  const discount = Math.round(((currentPrice - salePrice) / currentPrice) * 100);

  const handleAddToCart = () => {
    const productWithOptions = {
        ...product,
        price: salePrice,
        name: `${product.name} - ${selectedLength}" / ${selectedCapSize}`
    }
    addToCart(productWithOptions, quantity);
  };
  
  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  return (
    <div className="container py-8 md:py-16">
      <Breadcrumb />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Product Image Gallery */}
        <div className="flex flex-col gap-4">
            <div className="aspect-square relative rounded-lg overflow-hidden border">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    priority
                />
            </div>
             <div className="grid grid-cols-5 gap-2 sm:gap-4">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="aspect-square relative rounded-md overflow-hidden border-2 border-primary">
                        <Image src={product.image} alt={`${product.name} thumbnail ${i + 1}`} fill className="object-cover" />
                    </div>
                ))}
             </div>
        </div>


        {/* Product Details */}
        <div>
          <div className="flex justify-between items-start">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2 uppercase">{product.name}</h1>
            <Button variant="ghost" size="icon">
              <Heart className="w-6 h-6"/>
            </Button>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 mb-4">
            <p className="text-xl sm:text-2xl font-bold text-destructive">${salePrice.toFixed(2)}</p>
            <p className="text-lg sm:text-xl text-muted-foreground line-through">${currentPrice.toFixed(2)}</p>
            {discount > 0 && (
                <span className="px-2 py-0.5 bg-destructive text-destructive-foreground text-xs font-semibold rounded-md">-{discount}%</span>
            )}
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm font-semibold mb-2">Cap Size : <span className="text-muted-foreground">{selectedCapSize}</span></p>
              <div className="flex gap-2 flex-wrap">
                {capSizes.map(size => (
                   <Button key={size} variant={selectedCapSize === size ? 'default' : 'outline'} size="sm" onClick={() => setSelectedCapSize(size)}>
                    {size}
                  </Button>
                ))}
              </div>
            </div>
             <div>
              <p className="text-sm font-semibold mb-2">Length : <span className="text-muted-foreground">{selectedLength}</span></p>
              <div className="flex gap-2 flex-wrap">
                {lengths.map(length => (
                  <Button key={length} variant={selectedLength === length ? 'default' : 'outline'} size="sm" onClick={() => setSelectedLength(length)}>
                    {length}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" onClick={decrementQuantity} className="h-11 w-11"><Minus className="w-4 h-4"/></Button>
              <span className="w-10 text-center font-bold text-lg">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={incrementQuantity} className="h-11 w-11"><Plus className="w-4 h-4"/></Button>
            </div>
            <Button size="lg" className="w-full" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center my-8">
              <div className="flex flex-col items-center gap-2">
                  <Leaf className="w-7 h-7 text-primary"/>
                  <p className="text-xs font-semibold">100% ethically sourced from Vietnam</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                  <Lock className="w-7 h-7 text-primary"/>
                  <p className="text-xs font-semibold">Secure payment</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                  <Award className="w-7 h-7 text-primary"/>
                  <p className="text-xs font-semibold">Premium Quality, Guaranteed</p>
              </div>
          </div>
          
           <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-base font-semibold">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5"/> Shipping Information
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Free standard shipping on all orders. Expedited shipping options available at checkout. Orders are processed within 1-2 business days.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care">
              <AccordionTrigger className="text-base font-semibold">
                 <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5"/> Care Guide
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Wash gently with wig-safe shampoo and conditioner. Air dry on a wig stand. Avoid excessive heat styling to prolong the life of your wig. Store in a cool, dry place away from direct sunlight.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
            <Eye className="w-4 h-4" />
            <span>21 customers are viewing this product</span>
          </div>

        </div>
      </div>

       <div className="my-16 md:my-24">
        <Tabs defaultValue="description">
            <TabsList className="w-full justify-start bg-transparent border-b rounded-none p-0 h-auto overflow-x-auto">
                <TabsTrigger value="description" className="text-base sm:text-lg font-semibold rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none -mb-px">Description</TabsTrigger>
                <TabsTrigger value="care" className="text-base sm:text-lg font-semibold rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none -mb-px">Care</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-6 text-muted-foreground text-base">
              <h4 className="font-bold text-foreground mb-2">Wig Specs:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Glueless 6*6 HD Closure</li>
                <li>Jet Black</li>
                <li>Comes Curled</li>
                <li>Plucked Hairline</li>
                <li>Bleached Knots</li>
                <li>Fully Customized</li>
              </ul>
            </TabsContent>
            <TabsContent value="care" className="py-6 text-muted-foreground text-base">
              Detailed care instructions here.
            </TabsContent>
        </Tabs>
      </div>
      
       {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 md:mt-24">
          <h2 className="text-3xl font-headline text-center mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

    
