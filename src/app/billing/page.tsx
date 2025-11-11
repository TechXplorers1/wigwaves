'use client';

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
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const mockBillingHistory = [
  {
    orderId: '#ORD-005',
    date: '2023-07-19',
    amount: '$550.00',
    status: 'Paid',
  },
  {
    orderId: '#ORD-004',
    date: '2023-07-18',
    amount: '$450.00',
    status: 'Paid',
  },
   {
    orderId: '#ORD-002',
    date: '2023-07-16',
    amount: '$150.00',
    status: 'Refunded',
  },
];

export default function BillingPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="max-w-4xl mx-auto">
         <div className="mb-4">
          <Button variant="outline" asChild>
              <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
              </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-headline">Billing History</CardTitle>
            <CardDescription>
              Review your recent transactions and order history.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBillingHistory.map((item) => (
                  <TableRow key={item.orderId}>
                    <TableCell className="font-medium">{item.orderId}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'Paid' ? 'secondary' : 'destructive'}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <Button variant="outline" size="sm">View Invoice</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {mockBillingHistory.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                    You have no billing history yet.
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
