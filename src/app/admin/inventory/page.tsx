
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

export interface InventoryItem {
  sku: string;
  name: string;
  stock: number;
  status: 'In Stock' | 'Out of Stock' | 'Low Stock';
  image: string;
}

const initialInventoryItems: InventoryItem[] = [
  { name: 'Ngozi', sku: 'W1', stock: 15, status: 'In Stock', image: 'https://laidbyify.com/cdn/shop/files/34B90DCB-F114-469A-ACAD-7515530AE2BB.jpg?v=1756814058&width=2200' },
  { name: 'Nkem (Natural Black)', sku: 'W2', stock: 8, status: 'In Stock', image: 'https://laidbyify.com/cdn/shop/files/7D5C1F71-C620-45CB-95E6-A77B8EFD8E7E.jpg?v=1762186440&width=2200' },
  { name: 'Chika', sku: 'W3', stock: 0, status: 'Out of Stock', image: 'https://laidbyify.com/cdn/shop/files/IMG-3873.jpg?v=1760919015&width=2200' },
  { name: 'Amarachi (Jet Black)', sku: 'W4', stock: 2, status: 'Low Stock', image: 'https://laidbyify.com/cdn/shop/files/FullSizeRender_a768257a-8218-4c15-b0fa-8fe21b490d14.jpg?v=1742301306' },
  { name: 'Ogechi 2.0', sku: 'W5', stock: 20, status: 'In Stock', image: 'https://laidbyify.com/cdn/shop/files/FullSizeRender_918ee82c-59db-4d15-9ea9-a7370ddf1267.jpg?v=1741957669' },
];

export default function InventoryPage() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(initialInventoryItems);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<InventoryItem | undefined>(undefined);

  const handleAddProduct = () => {
    setEditingProduct(undefined);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: InventoryItem) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (product: InventoryItem) => {
    if (editingProduct) {
      // Update existing product
      setInventoryItems(prevItems => 
        prevItems.map(item => item.sku === product.sku ? product : item)
      );
    } else {
      // Add new product
      setInventoryItems(prevItems => [
        { ...product, sku: `W${prevItems.length + 1}` }, // Simple SKU generation
        ...prevItems
      ]);
    }
    setIsFormOpen(false);
    setEditingProduct(undefined);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Inventory Management</CardTitle>
          <CardDescription>
            Track and manage your product inventory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-end">
              <Button onClick={handleAddProduct}>Add Product</Button>
          </div>
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
              {inventoryItems.map((item) => (
                <TableRow key={item.sku}>
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
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                          item.status === 'In Stock' ? 'secondary' :
                          item.status === 'Low Stock' ? 'default' : 'destructive'
                      }
                      className={item.status === 'Low Stock' ? 'bg-yellow-500 text-white' : ''}
                    >
                      {item.status}
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
