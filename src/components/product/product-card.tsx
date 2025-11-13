'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import type { Wig } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/context/cart-context';
import { Badge } from '../ui/badge';

interface ProductCardProps {
  product: Wig;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents the link from navigating
    addToCart(product, 1);
  };

  return (
    <Link href={`/shop/${product.id}`} className="group block">
      <Card className="w-full overflow-hidden transition-all group-hover:shadow-lg h-full flex flex-col">
        <CardHeader className="p-0">
          <div className="aspect-[3/4] relative">
            {product.isNew && (
              <Badge className="absolute top-2 left-2 z-10 bg-accent text-accent-foreground">
                New
              </Badge>
            )}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-semibold tracking-normal font-body">{product.name}</CardTitle>
          <CardDescription className="text-sm mt-1">{product.style} | {product.color}</CardDescription>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center mt-auto">
          <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
          <Button size="icon" onClick={handleAddToCart} aria-label="Add to cart">
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
