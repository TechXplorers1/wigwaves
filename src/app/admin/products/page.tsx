
'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ProductForm } from '@/components/admin/product-form';
import Image from 'next/image';
import { useProducts } from '@/context/product-context';
import type { Wig as Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductsPage() {
  const { products, addProduct, updateProduct, loading } = useProducts();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

  const handleAddProduct = () => {
    setEditingProduct(undefined);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: Omit<Product, 'id'>) => {
    if (editingProduct) {
      updateProduct({ ...editingProduct, ...data });
    } else {
      addProduct(data);
    }
    setIsFormOpen(false);
    setEditingProduct(undefined);
  };
  
  const getStatus = (stock: number): 'In Stock' | 'Out of Stock' | 'Low Stock' => {
      if (stock === 0) return 'Out of Stock';
      if (stock > 0 && stock <= 5) return 'Low Stock';
      return 'In Stock';
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Product Management</CardTitle>
          <CardDescription>
            Track and manage your products.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-end">
              <Button onClick={handleAddProduct}>Add Product</Button>
          </div>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-16 w-16 rounded-md" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <Skeleton className="h-8 w-20" />
                </div>
              ))}
            </div>
          ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">Image</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image 
                      src={item.image || "https://placehold.co/60x80"}
                      alt={item.name}
                      width={60}
                      height={80}
                      className="rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{(item as any).stock ?? 10}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                          getStatus((item as any).stock ?? 10) === 'In Stock' ? 'secondary' :
                          getStatus((item as any).stock ?? 10) === 'Low Stock' ? 'default' : 'destructive'
                      }
                      className={getStatus((item as any).stock ?? 10) === 'Low Stock' ? 'bg-yellow-500 text-white' : ''}
                    >
                      {getStatus((item as any).stock ?? 10)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleEditProduct(item)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          )}
        </CardContent>
      </Card>

      <ProductForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        product={editingProduct}
      />
    </>
  );
}
