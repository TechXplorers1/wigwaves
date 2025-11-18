
'use client';

import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';

const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'returns', label: 'Returns' },
    { value: 'exchanges', label: 'Exchanges' },
    { value: 'canceled', label: 'Canceled' },
    { value: 'details', label: 'Order Details' },
];

export default function OrdersPage() {
    const [activeTab, setActiveTab] = useState(tabs[0].value);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Management</CardTitle>
        <CardDescription>
          Manage upcoming orders, returns, exchanges, and cancellations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="sm:hidden">
              <Select onValueChange={setActiveTab} value={activeTab}>
                  <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                      {tabs.map(tab => (
                          <SelectItem key={tab.value} value={tab.value}>{tab.label}</SelectItem>
                      ))}
                  </SelectContent>
              </Select>
          </div>
          <div className="hidden sm:block overflow-x-auto pb-2">
            <TabsList>
              {tabs.map(tab => (
                  <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
              ))}
            </TabsList>
          </div>
          <TabsContent value="overview">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="p-2 text-xs">Customer</TableHead>
                  <TableHead className="hidden sm:table-cell p-2 text-xs">Order ID</TableHead>
                  <TableHead className="hidden sm:table-cell p-2 text-xs">Status</TableHead>
                  <TableHead className="hidden md:table-cell p-2 text-xs">
                    Date
                  </TableHead>
                  <TableHead className="text-right p-2 text-xs">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="p-2">
                    <div className="font-medium text-xs">Liam Johnson</div>
                    <div className="hidden text-xs text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell p-2 text-xs">#ORD-001</TableCell>
                  <TableCell className="hidden sm:table-cell p-2 text-xs">
                    <Badge className="text-xs" variant="outline">
                      Pending
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell p-2 text-xs">
                    2023-07-15
                  </TableCell>
                  <TableCell className="text-right p-2 text-xs">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-2">
                    <div className="font-medium text-xs">Olivia Smith</div>
                    <div className="hidden text-xs text-muted-foreground md:inline">
                      olivia@example.com
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell p-2 text-xs">#ORD-002</TableCell>
                  <TableCell className="hidden sm:table-cell p-2 text-xs">
                    <Badge className="text-xs" variant="outline">
                      Processing
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell p-2 text-xs">
                    2023-07-16
                  </TableCell>
                  <TableCell className="text-right p-2 text-xs">$150.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-2">
                    <div className="font-medium text-xs">Noah Williams</div>
                    <div className="hidden text-xs text-muted-foreground md:inline">
                      noah@example.com
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell p-2 text-xs">#ORD-003</TableCell>
                  <TableCell className="hidden sm:table-cell p-2 text-xs">
                    <Badge className="text-xs" variant="outline">
                      Pending
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell p-2 text-xs">
                    2023-07-17
                  </TableCell>
                  <TableCell className="text-right p-2 text-xs">$350.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-2">
                    <div className="font-medium text-xs">Emma Brown</div>
                    <div className="hidden text-xs text-muted-foreground md:inline">
                      emma@example.com
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell p-2 text-xs">#ORD-004</TableCell>
                  <TableCell className="hidden sm:table-cell p-2 text-xs">
                    <Badge className="text-xs" variant="outline">
                      Shipped
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell p-2 text-xs">
                    2023-07-18
                  </TableCell>
                  <TableCell className="text-right p-2 text-xs">$450.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-2">
                    <div className="font-medium text-xs">Liam Johnson</div>
                    <div className="hidden text-xs text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell p-2 text-xs">#ORD-005</TableCell>
                  <TableCell className="hidden sm:table-cell p-2 text-xs">
                    <Badge className="text-xs" variant="outline">
                      Delivered
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell p-2 text-xs">
                    2023-07-19
                  </TableCell>
                  <TableCell className="text-right p-2 text-xs">$550.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="upcoming">
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="p-2 text-xs">Customer</TableHead>
                  <TableHead className="hidden sm:table-cell p-2 text-xs">Order ID</TableHead>
                  <TableHead className="hidden md:table-cell p-2 text-xs">Date</TableHead>
                  <TableHead className="p-2 text-xs">Amount</TableHead>
                  <TableHead className="text-right p-2 text-xs">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="p-2">
                    <div className="font-medium text-xs">Liam Johnson</div>
                    <div className="hidden text-xs text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell p-2 text-xs">#ORD-001</TableCell>
                  <TableCell className="hidden md:table-cell p-2 text-xs">2023-07-15</TableCell>
                  <TableCell className="p-2 text-xs">$250.00</TableCell>
                  <TableCell className="text-right p-2">
                     <div className="flex flex-col sm:flex-row gap-2 justify-end">
                      <Button variant="outline" size="sm">Approve</Button>
                      <Button variant="destructive" size="sm">Decline</Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="p-2">
                    <div className="font-medium text-xs">Noah Williams</div>
                    <div className="hidden text-xs text-muted-foreground md:inline">
                      noah@example.com
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell p-2 text-xs">#ORD-003</TableCell>
                  <TableCell className="hidden md:table-cell p-2 text-xs">2023-07-17</TableCell>
                  <TableCell className="p-2 text-xs">$350.00</TableCell>
                   <TableCell className="text-right p-2">
                     <div className="flex flex-col sm:flex-row gap-2 justify-end">
                      <Button variant="outline" size="sm">Approve</Button>
                      <Button variant="destructive" size="sm">Decline</Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="returns">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="p-2 text-xs">Customer</TableHead>
                  <TableHead className="hidden sm:table-cell p-2 text-xs">Order ID</TableHead>
                  <TableHead className="hidden md:table-cell p-2 text-xs">Return Date</TableHead>
                  <TableHead className="p-2 text-xs">Amount</TableHead>
                  <TableHead className="text-right p-2 text-xs">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="p-2">
                    <div className="font-medium text-xs">Olivia Smith</div>
                    <div className="hidden text-xs text-muted-foreground md:inline">
                      olivia@example.com
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell p-2 text-xs">#ORD-002</TableCell>
                  <TableCell className="hidden md:table-cell p-2 text-xs">2023-07-20</TableCell>
                  <TableCell className="p-2 text-xs">$150.00</TableCell>
                  <TableCell className="text-right p-2">
                     <div className="flex flex-col sm:flex-row gap-2 justify-end">
                      <Button variant="outline" size="sm">Process</Button>
                      <Button variant="secondary" size="sm">Details</Button>
                    </div>
                  </TableCell>
                </TableRow>
                  <TableRow>
                  <TableCell className="p-2">
                    <div className="font-medium text-xs">Emma Brown</div>
                    <div className="hidden text-xs text-muted-foreground md:inline">
                      emma@example.com
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell p-2 text-xs">#ORD-004</TableCell>
                  <TableCell className="hidden md:table-cell p-2 text-xs">2023-07-22</TableCell>
                  <TableCell className="p-2 text-xs">$450.00</TableCell>
                  <TableCell className="text-right p-2">
                     <div className="flex flex-col sm:flex-row gap-2 justify-end">
                      <Button variant="outline" size="sm" disabled>Refunded</Button>
                      <Button variant="secondary" size="sm">Details</Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="exchanges">
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="p-2 text-xs">Customer</TableHead>
                  <TableHead className="hidden sm:table-cell p-2 text-xs">Order ID</TableHead>
                  <TableHead className="hidden md:table-cell p-2 text-xs">Date</TableHead>
                  <TableHead className="p-2 text-xs">New Item</TableHead>
                  <TableHead className="text-right p-2 text-xs">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="p-2">
                    <div className="font-medium text-xs">Jackson Lee</div>
                    <div className="hidden text-xs text-muted-foreground md:inline">
                      jackson.lee@email.com
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell p-2 text-xs">#ORD-006</TableCell>
                  <TableCell className="hidden md:table-cell p-2 text-xs">2023-07-25</TableCell>
                  <TableCell className="p-2 text-xs">Golden Waves</TableCell>
                  <TableCell className="text-right p-2">
                     <div className="flex flex-col sm:flex-row gap-2 justify-end">
                      <Button variant="outline" size="sm">Approve</Button>
                      <Button variant="destructive" size="sm">Decline</Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="canceled">
             <div className="flex items-center justify-center h-48">
              <p className="text-muted-foreground">No canceled orders to show.</p>
            </div>
          </TabsContent>
          <TabsContent value="details">
            <div className="space-y-4">
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                          <CardTitle>Order #ORD-001</CardTitle>
                          <CardDescription>
                              Date: July 15, 2023
                          </CardDescription>
                      </div>
                      <div>
                          <Badge variant="outline">Pending</Badge>
                      </div>
                  </CardHeader>
                  <CardContent>
                      <div className="grid gap-6">
                          <div className="grid gap-2">
                              <h3 className="font-semibold">Customer Details</h3>
                              <Separator />
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                  <p className="text-muted-foreground">Customer</p>
                                  <p>Liam Johnson</p>
                                  <p className="text-muted-foreground">Email</p>
                                  <p>liam@example.com</p>
                                  <p className="text-muted-foreground">Shipping Address</p>
                                  <p>123 Main St, Anytown, USA 12345</p>
                              </div>
                          </div>
                          <div className="grid gap-2">
                              <h3 className="font-semibold">Order Items</h3>
                              <Separator />
                              <Table>
                                  <TableHeader>
                                      <TableRow>
                                          <TableHead>Product</TableHead>
                                          <TableHead>Quantity</TableHead>
                                          <TableHead className="text-right">Price</TableHead>
                                      </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                      <TableRow>
                                          <TableCell>Ngozi</TableCell>
                                          <TableCell>1</TableCell>
                                          <TableCell className="text-right">$189.99</TableCell>
                                      </TableRow>
                                      <TableRow>
                                          <TableCell>Nkem (Natural Black)</TableCell>
                                          <TableCell>1</TableCell>
                                          <TableCell className="text-right">$60.01</TableCell>
                                      </TableRow>
                                  </TableBody>
                              </Table>
                          </div>
                          <div className="grid gap-2">
                              <h3 className="font-semibold">Payment Details</h3>
                              <Separator />
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                  <p className="text-muted-foreground">Subtotal</p>
                                  <p className="text-right">$250.00</p>
                                  <p className="text-muted-foreground">Shipping</p>
                                  <p className="text-right">$15.00</p>
                                  <p className="text-muted-foreground">Tax</p>
                                  <p className="text-right">$20.00</p>
                                  <p className="font-bold">Total</p>
                                  <p className="font-bold text-right">$285.00</p>
                              </div>
                          </div>
                      </div>
                  </CardContent>
              </Card>
              <Card>
                <CardHeader>
                    <CardTitle>Additional Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This is a new container for more order details.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
