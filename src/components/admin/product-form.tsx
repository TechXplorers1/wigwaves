
'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Wig as Product } from '@/lib/types';
import { Textarea } from '../ui/textarea';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  image: z.string().url('Must be a valid URL').min(1, 'Image URL is required'),
  description: z.string().min(1, 'Description is required'),
  style: z.enum(['Straight', 'Wavy', 'Curly', 'Pixie', 'Bob']),
  color: z.enum(['Blonde', 'Brunette', 'Black', 'Red', 'Grey', 'Pastel']),
  length: z.enum(['Short', 'Medium', 'Long']),
  material: z.enum(['Human Hair', 'Synthetic']),
  stock: z.coerce.number().min(0, 'Stock cannot be negative'),
  type: z.enum(['wig', 'extension', 'toupee']).optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Product, 'id'>) => void;
  product?: Product;
}

export function ProductForm({ isOpen, onClose, onSubmit, product }: ProductFormProps) {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: 0,
      image: '',
      description: '',
      style: 'Straight',
      color: 'Black',
      length: 'Medium',
      material: 'Synthetic',
      stock: 10,
      type: 'wig',
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        ...product,
        stock: (product as any).stock ?? 10,
      });
    } else {
      form.reset({
        name: '',
        price: 0,
        image: '',
        description: '',
        style: 'Straight',
        color: 'Black',
        length: 'Medium',
        material: 'Synthetic',
        stock: 10,
        type: 'wig',
      });
    }
  }, [product, form, isOpen]);

  const handleFormSubmit = (data: ProductFormData) => {
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          <DialogDescription>
            {product ? 'Update the details of your product.' : 'Fill in the details for the new product.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Ngozi Wig" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the product..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="style"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Style</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select style" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Straight">Straight</SelectItem>
                          <SelectItem value="Wavy">Wavy</SelectItem>
                          <SelectItem value="Curly">Curly</SelectItem>
                          <SelectItem value="Pixie">Pixie</SelectItem>
                          <SelectItem value="Bob">Bob</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select color" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Blonde">Blonde</SelectItem>
                          <SelectItem value="Brunette">Brunette</SelectItem>
                          <SelectItem value="Black">Black</SelectItem>
                          <SelectItem value="Red">Red</SelectItem>
                          <SelectItem value="Grey">Grey</SelectItem>
                          <SelectItem value="Pastel">Pastel</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
             <div className="grid grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="length"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Length</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select length" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Short">Short</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Long">Long</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="material"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select material" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Human Hair">Human Hair</SelectItem>
                          <SelectItem value="Synthetic">Synthetic</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
             <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="wig">Wig</SelectItem>
                      <SelectItem value="extension">Hair Extension</SelectItem>
                      <SelectItem value="toupee">Toupee</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">{product ? 'Save Changes' : 'Add Product'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
