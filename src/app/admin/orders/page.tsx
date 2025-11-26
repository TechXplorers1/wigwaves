
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
import { useOrders } from '@/context/order-context';
import type { Order } from '@/lib/types';
import { format } from 'date-fns';

const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'returns', label: 'Returns' },
    { value: 'exchanges', label: 'Exchanges' },
    { value: 'canceled', label: 'Canceled' },
];

const orderDetailsTabs = [
    { value: 'approved', label: 'Approved order' },
    { value: 'packing', label: 'Packing' },
    { value: 'shipping', label: 'Shipping' },
    { value: 'out-for-delivery', label: 'Out for Delivery' },
    { value: 'delivered', label: 'Delivered' },
];

export default function OrdersPage() {
    const { orders, loading, updateOrderStatus } = useOrders();
    const [activeTab, setActiveTab] = useState(tabs[0].value);
    const [activeTab2, setActiveTab2] = useState(orderDetailsTabs[0].value);

  const upcomingOrders = orders.filter(order => order.status === 'Pending');
  const approvedOrders = orders.filter(order => order.status === 'Approved');
  const packingOrders = orders.filter(order => order.status === 'Packing');
  const shippedOrders = orders.filter(order => order.status === 'Shipped');
  const outForDeliveryOrders = orders.filter(order => order.status === 'Out for Delivery');


  const onApprove = (orderId: string) => {
    updateOrderStatus(orderId, 'Approved');
  };

  const onMoveToPacking = (orderId: string) => {
    updateOrderStatus(orderId, 'Packing');
  };

  const onMoveToShipping = (orderId: string) => {
    updateOrderStatus(orderId, 'Shipped');
  };

  const onMoveToOutForDelivery = (orderId: string) => {
    updateOrderStatus(orderId, 'Out for Delivery');
  };

  const renderOrderTable = (orders: Order[], actions?: (order: Order) => React.ReactNode) => (
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
          {actions && <TableHead className="text-right p-2 text-xs">Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="p-2">
              <div className="font-medium text-xs">{order.customerInfo?.name || 'N/A'}</div>
              <div className="hidden text-xs text-muted-foreground md:inline">
                {order.customerInfo?.email || 'N/A'}
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell p-2 text-xs">{order.id}</TableCell>
            <TableCell className="hidden sm:table-cell p-2 text-xs">
              <Badge className="text-xs" variant={order.status === 'Pending' ? 'default' : 'outline'}>
                {order.status}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell p-2 text-xs">
              {order.createdAt && typeof order.createdAt.toDate === 'function' ? format(order.createdAt.toDate(), 'yyyy-MM-dd') : 'N/A'}
            </TableCell>
            <TableCell className="text-right p-2 text-xs">${order.total.toFixed(2)}</TableCell>
            {actions && <TableCell className="text-right p-2">{actions(order)}</TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <>
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
            {renderOrderTable(orders)}
          </TabsContent>
          <TabsContent value="upcoming">
             {renderOrderTable(upcomingOrders, (order) => (
                 <div className="flex flex-col sm:flex-row gap-2 justify-end">
                  <Button variant="outline" size="sm" onClick={() => onApprove(order.id)}>Approve</Button>
                  <Button variant="destructive" size="sm">Decline</Button>
                </div>
             ))}
          </TabsContent>
          <TabsContent value="returns">
            <div className="flex items-center justify-center h-48">
              <p className="text-muted-foreground">No returns to show.</p>
            </div>
          </TabsContent>
          <TabsContent value="exchanges">
            <div className="flex items-center justify-center h-48">
              <p className="text-muted-foreground">No exchanges to show.</p>
            </div>
          </TabsContent>
          <TabsContent value="canceled">
             <div className="flex items-center justify-center h-48">
              <p className="text-muted-foreground">No canceled orders to show.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Order Details</CardTitle>
        <CardDescription>
          Manage the order fulfillment process.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab2} onValueChange={setActiveTab2}>
          <div className="sm:hidden">
              <Select onValueChange={setActiveTab2} value={activeTab2}>
                  <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                      {orderDetailsTabs.map(tab => (
                          <SelectItem key={tab.value} value={tab.value}>{tab.label}</SelectItem>
                      ))}
                  </SelectContent>
              </Select>
          </div>
          <div className="hidden sm:block overflow-x-auto pb-2">
            <TabsList>
              {orderDetailsTabs.map(tab => (
                  <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
              ))}
            </TabsList>
          </div>
          <TabsContent value="approved">
            {renderOrderTable(approvedOrders, (order) => (
                <Button variant="outline" size="sm" onClick={() => onMoveToPacking(order.id)}>
                    Move to Packing
                </Button>
            ))}
          </TabsContent>
          <TabsContent value="packing">
            {renderOrderTable(packingOrders, (order) => (
                <Button variant="outline" size="sm" onClick={() => onMoveToShipping(order.id)}>
                    Move to Shipping
                </Button>
            ))}
          </TabsContent>
          <TabsContent value="shipping">
            {renderOrderTable(shippedOrders, (order) => (
                <Button variant="outline" size="sm" onClick={() => onMoveToOutForDelivery(order.id)}>
                    Move to Out for Delivery
                </Button>
            ))}
          </TabsContent>
          <TabsContent value="out-for-delivery">
             {renderOrderTable(outForDeliveryOrders)}
          </TabsContent>
          <TabsContent value="delivered">
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="p-2 text-xs">Customer</TableHead>
                  <TableHead className="hidden sm:table-cell p-2 text-xs">Order ID</TableHead>
                  <TableHead className="hidden md:table-cell p-2 text-xs">Date</TableHead>
                  <TableHead className="text-right p-2 text-xs">Amount</TableHead>
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
                  <TableCell className="hidden md:table-cell p-2 text-xs">
                    2023-07-20
                  </TableCell>
                  <TableCell className="text-right p-2 text-xs">$150.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
    </>
  );
}
