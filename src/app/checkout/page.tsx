
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CreditCard, Landmark, Wallet } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Breadcrumb from '@/components/layout/breadcrumb';

export default function CheckoutPage() {
  const { cartItems, cartTotal, itemCount } = useCart();
  
  if (itemCount === 0) {
    return (
        <div className="container text-center py-24">
            <Breadcrumb />
            <h1 className="text-2xl font-semibold">Your cart is empty.</h1>
            <Button asChild className="mt-4">
                <Link href="/shop">Go Shopping</Link>
            </Button>
        </div>
    )
  }

  const shippingCost = 15.00;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shippingCost + tax;

  return (
    <div className="container py-12 md:py-24">
      <Breadcrumb />
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline tracking-tight">Checkout</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="lg:order-2">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Image src={item.image} alt={item.name} width={60} height={80} className="rounded-md" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Product price</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between text-muted-foreground">
                  <span>Taxes</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-xl pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
               <Button size="lg" className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
                Place Order
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:order-1">
          <h2 className="text-2xl font-headline mb-6">Shipping Information</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john.doe@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="123 Wig Lane" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2 col-span-1 sm:col-span-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Styleville" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" placeholder="12345" />
              </div>
            </div>
          </form>

          <h2 className="text-2xl font-headline my-6 pt-6 border-t">Payment Method</h2>
          <RadioGroup defaultValue="card" className="space-y-4">
            <Label
              htmlFor="card"
              className="flex items-center gap-4 rounded-lg border p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground has-[input:checked]:bg-primary has-[input:checked]:text-primary-foreground has-[input:checked]:border-primary"
            >
              <RadioGroupItem value="card" id="card" className="sr-only" />
              <CreditCard className="h-6 w-6" />
              <span className="font-semibold">Credit Card</span>
            </Label>
            <Label
              htmlFor="paypal"
              className="flex items-center gap-4 rounded-lg border p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground has-[input:checked]:bg-primary has-[input:checked]:text-primary-foreground has-[input:checked]:border-primary"
            >
              <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
              <Landmark className="h-6 w-6" />
              <span className="font-semibold">PayPal</span>
            </Label>
            <Label
              htmlFor="google-pay"
              className="flex items-center gap-4 rounded-lg border p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground has-[input:checked]:bg-primary has-[input:checked]:text-primary-foreground has-[input:checked]:border-primary"
            >
              <RadioGroupItem value="google-pay" id="google-pay" className="sr-only" />
              <Wallet className="h-6 w-6" />
              <span className="font-semibold">Google Pay</span>
            </Label>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}

    