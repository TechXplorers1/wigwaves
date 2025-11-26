
'use client';

import { useUsers } from '@/context/user-context';
import { useOrders } from '@/context/order-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import type { User, Order } from '@/lib/types';
import { format } from 'date-fns';

const getInitials = (name?: string | null) => {
  if (!name) return 'U';
  const names = name.split(' ');
  return names.length > 1
    ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    : names[0][0].toUpperCase();
};

export default function CustomersPage() {
  const { users, loading: usersLoading } = useUsers();
  const { orders, loading: ordersLoading } = useOrders();

  const loading = usersLoading || ordersLoading;

  const getOrdersForCustomer = (userId: string): Order[] => {
    return orders.filter(order => order.userId === userId);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-5 w-80 mt-2" />
        </CardHeader>
        <CardContent>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 border-b">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Management</CardTitle>
        <CardDescription>View and manage your customers and their orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {users.map(customer => {
            const customerOrders = getOrdersForCustomer(customer.uid);
            return (
              <AccordionItem value={customer.uid} key={customer.uid}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-4 w-full pr-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={customer.photoURL || `https://i.pravatar.cc/150?u=${customer.email}`} />
                      <AvatarFallback>{getInitials(customer.displayName)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="font-semibold">{customer.displayName}</p>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                    </div>
                    <Badge variant="outline">{customerOrders.length} Order(s)</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {customerOrders.length > 0 ? (
                    <div className="pl-4 pr-4 pb-4">
                        <h4 className="font-semibold text-md mb-2">Order History</h4>
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customerOrders.map(order => (
                            <TableRow key={order.id}>
                                <TableCell className="font-mono text-xs">{order.id}</TableCell>
                                <TableCell>
                                {order.createdAt && typeof order.createdAt.toDate === 'function'
                                    ? format(order.createdAt.toDate(), 'yyyy-MM-dd')
                                    : 'N/A'}
                                </TableCell>
                                <TableCell>${order.total.toFixed(2)}</TableCell>
                                <TableCell>
                                <Badge variant="secondary">{order.status}</Badge>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground p-8">
                      This customer has not placed any orders yet.
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
