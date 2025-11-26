

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CreditCard, Landmark, Loader2, Wallet } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Breadcrumb from '@/components/layout/breadcrumb';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/context/auth-context';
import { useOrders } from '@/context/order-context';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


const checkoutSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    zip: z.string().min(1, 'ZIP code is required'),
    paymentMethod: z.enum(['card', 'paypal', 'google-pay']),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;


export default function CheckoutPage() {
  const { cartItems, cartTotal, itemCount, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useOrders();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: user?.email || '',
      address: '',
      city: '',
      zip: '',
      paymentMethod: 'card',
    },
  });


  if (itemCount === 0 && !isLoading) {
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

  const onSubmit = async (data: CheckoutFormData) => {
    if (!user) {
        toast({
            variant: 'destructive',
            title: 'Authentication Error',
            description: 'You must be logged in to place an order.',
        });
        router.push('/login');
        return;
    }
    
    setIsLoading(true);

    const orderData = {
        userId: user.uid,
        items: cartItems.map(({ id, name, price, quantity, image }) => ({ id, name, price, quantity, image })),
        total: total,
        status: 'Pending' as const,
        customerInfo: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            address: data.address,
            city: data.city,
            zip: data.zip,
        },
    };

    try {
        await addOrder(orderData);
        clearCart();
        toast({
            title: 'Order Placed Successfully!',
            description: 'Thank you for your purchase. We will notify you when it ships.',
        });
        router.push('/profile');
    } catch (error) {
        console.error('Failed to place order:', error);
        toast({
            variant: 'destructive',
            title: 'Order Failed',
            description: 'There was a problem placing your order. Please try again.',
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-12 md:py-24">
      <Breadcrumb />
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline tracking-tight">Checkout</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
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
                <Button type="submit" size="lg" className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90" disabled={isLoading}>
                   {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Place Order
                </Button>
                </CardContent>
            </Card>
            </div>

            <div className="lg:order-1">
                <h2 className="text-2xl font-headline mb-6">Shipping Information</h2>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="firstName" render={({ field }) => (
                            <FormItem><FormLabel>First Name</FormLabel><FormControl><Input placeholder="John" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="lastName" render={({ field }) => (
                            <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input placeholder="Doe" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                     <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="john.doe@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem><FormLabel>Address</FormLabel><FormControl><Input placeholder="123 Wig Lane" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                         <FormField control={form.control} name="city" render={({ field }) => (
                            <FormItem className="col-span-1 sm:col-span-2"><FormLabel>City</FormLabel><FormControl><Input placeholder="Styleville" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField control={form.control} name="zip" render={({ field }) => (
                            <FormItem><FormLabel>ZIP Code</FormLabel><FormControl><Input placeholder="12345" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                </div>

                <h2 className="text-2xl font-headline my-6 pt-6 border-t">Payment Method</h2>
                <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                             <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-4">
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
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </form>
      </Form>
    </div>
  );
}
