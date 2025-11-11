'use client';

import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
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

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return names[0][0];
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${user.email}`} />
                <AvatarFallback className="text-3xl">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl font-headline">{user.name}</CardTitle>
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
                <span className="text-muted-foreground font-mono text-sm">{user.id}</span>
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
