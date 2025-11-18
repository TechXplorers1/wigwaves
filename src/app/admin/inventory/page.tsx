
'use client';

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

export default function InventoryPage() {
  const inventoryItems = [
    { name: 'Ngozi', sku: 'W1', stock: 15, status: 'In Stock' },
    { name: 'Nkem (Natural Black)', sku: 'W2', stock: 8, status: 'In Stock' },
    { name: 'Chika', sku: 'W3', stock: 0, status: 'Out of Stock' },
    { name: 'Amarachi (Jet Black)', sku: 'W4', stock: 2, status: 'Low Stock' },
    { name: 'Ogechi 2.0', sku: 'W5', stock: 20, status: 'In Stock' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Management</CardTitle>
        <CardDescription>
          Track and manage your product inventory.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end">
            <Button>Add Product</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
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
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
