
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

const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'returns', label: 'Returns' },
    { value: 'exchanges', label: 'Exchanges' },
    { value: 'canceled', label: 'Canceled' },
];

export default function AdminDashboardPage() {
    const [activeTab, setActiveTab] = useState(tabs[0].value);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Sales
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Website Activity
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
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
              </Tabs>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage
                    src="https://i.pravatar.cc/150?u=1"
                    alt="Avatar"
                  />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Olivia Martin
                  </p>
                  <p className="text-sm text-muted-foreground">
                    olivia.martin@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$1,999.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage
                    src="https://i.pravatar.cc/150?u=2"
                    alt="Avatar"
                  />
                  <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Jackson Lee
                  </p>
                  <p className="text-sm text-muted-foreground">
                    jackson.lee@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$39.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage
                    src="https://i.pravatar.cc/150?u=3"
                    alt="Avatar"
                  />
                  <AvatarFallback>IN</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Isabella Nguyen
                  </p>
                  <p className="text-sm text-muted-foreground">
                    isabella.nguyen@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$299.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage
                    src="https://i.pravatar.cc/150?u=4"
                    alt="Avatar"
                  />
                  <AvatarFallback>WK</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    William Kim
                  </p>
                  <p className="text-sm text-muted-foreground">
                    will@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$99.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage
                    src="https://i.pravatar.cc/150?u=5"
                    alt="Avatar"
                  />
                  <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Sofia Davis
                  </p>
                  <p className="text-sm text-muted-foreground">
                    sofia.davis@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+$39.00</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

    