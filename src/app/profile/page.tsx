
'use client';

import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
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
            <div className="max-w-2xl mx-auto">
                <Skeleton className="h-10 w-36 mb-4" />
                <Card>
                    <CardHeader className="text-center">
                        <div className="flex flex-col items-center gap-4">
                            <Skeleton className="h-24 w-24 rounded-full" />
                            <div>
                                <Skeleton className="h-8 w-48 mb-2" />
                                <Skeleton className="h-5 w-64" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="mt-4">
                        <div className="space-y-4">
                            <Skeleton className="h-14 w-full" />
                            <Skeleton className="h-14 w-full" />
                        </div>
                        <div className="mt-8 text-center">
                            <Skeleton className="h-10 w-28" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
  }

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return names[0][0];
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader className="text-center">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.photoURL || `https://i.pravatar.cc/150?u=${user.email}`} />
                <AvatarFallback className="text-3xl">{getInitials(user.displayName)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl font-headline">{user.displayName}</CardTitle>
                <CardDescription className="text-lg">{user.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="mt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <span className="font-medium">Role</span>
                <span className="capitalize px-2 py-1 text-sm rounded-full bg-secondary text-secondary-foreground">{user.role}</span>
              </div>
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <span className="font-medium">Account ID</span>
                <span className="text-muted-foreground font-mono text-sm">{user.uid}</span>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline">Edit Profile</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
