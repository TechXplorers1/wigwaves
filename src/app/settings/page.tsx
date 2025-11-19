
'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bell, Brush, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
       <div className="container py-12 md:py-24">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-10 w-36 mb-4" />
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-5 w-72 mt-2" />
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <Skeleton className="h-7 w-40" />
                <div className="pl-9 space-y-4">
                  <Skeleton className="h-5 w-full" />
                  <div className="flex gap-4">
                    <Skeleton className="h-10 w-28" />
                    <Skeleton className="h-10 w-40" />
                  </div>
                </div>
              </div>
              <Separator />
               <div className="space-y-4">
                <Skeleton className="h-7 w-48" />
                <div className="pl-9 space-y-4">
                   <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
               <Separator />
               <div className="space-y-4">
                <Skeleton className="h-7 w-44" />
                <div className="pl-9 space-y-4">
                   <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="max-w-3xl mx-auto">
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
            <CardTitle className="text-3xl font-headline">Settings</CardTitle>
            <CardDescription>Manage your account and preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Account Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Account</h3>
              </div>
              <div className="pl-9 space-y-4">
                <p className="text-muted-foreground">Update your personal information and password.</p>
                <Button variant="outline">Edit Profile</Button>
                 <Button variant="outline">Change Password</Button>
              </div>
            </div>
            
            <Separator />
            
            {/* Notifications Section */}
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                <Bell className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Notifications</h3>
              </div>
               <div className="pl-9 space-y-4">
                <p className="text-muted-foreground">Control how you receive notifications from us.</p>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates about your orders and special offers.</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get order updates on your phone.</p>
                  </div>
                  <Switch id="sms-notifications" />
                </div>
              </div>
            </div>

            <Separator />
            
            {/* Appearance Section */}
             <div className="space-y-4">
               <div className="flex items-center gap-3">
                <Brush className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Appearance</h3>
              </div>
               <div className="pl-9 space-y-4">
                <p className="text-muted-foreground">Customize the look and feel of the application.</p>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
                  </div>
                  <Switch id="dark-mode" disabled />
                </div>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
