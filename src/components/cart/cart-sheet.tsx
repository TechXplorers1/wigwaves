'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus, Minus, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';

export default function CartSheet() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, itemCount } = useCart();

  const shippingCost = cartTotal > 0 ? 15.00 : 0;
  const tax = cartTotal * 0.08;
  const total = cartTotal > 0 ? cartTotal + shippingCost + tax : 0;

  return (
    <>
      <SheetHeader>
        <SheetTitle className="font-headline text-2xl">Shopping Cart ({itemCount})</SheetTitle>
      </SheetHeader>
      {cartItems.length > 0 ? (
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 -mx-6">
            <div className="px-6 divide-y divide-border">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 py-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={100}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
          <SheetFooter className="mt-auto pt-6 border-t">
            <div className="w-full space-y-4">
               <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Product price</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Charge</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between">
                  <span>Taxes (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex flex-col gap-2">
                <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full">
                  <Link href="/cart">View Cart</Link>
                </Button>
              </div>
            </div>
          </SheetFooter>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <ShoppingBag className="h-24 w-24 text-muted-foreground/30 mb-4" />
          <h3 className="text-xl font-semibold">Your Cart is Empty</h3>
          <p className="text-muted-foreground mt-2">Looks like you haven't added anything yet.</p>
          <Button asChild className="mt-6">
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      )}
    </>
  );
}
