
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/cart-context';
import { AuthProvider } from '@/context/auth-context';
import { FirebaseClientProvider } from '@/firebase';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { usePathname } from 'next/navigation';

// Using a variable for metadata to be compatible with 'use client'
const metadata: Metadata = {
  title: 'WigWaves - The Best Quality Hair and Wig Extensions',
  description: 'High-quality wigs, hair extensions, and toupees.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{String(metadata.title)}</title>
        <meta name="description" content={String(metadata.description)} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Dancing+Script:wght@400..700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
        )}
      >
        <FirebaseClientProvider>
          <AuthProvider>
            <CartProvider>
              <div className="relative flex min-h-screen flex-col">
                <Header />
                <main className={isAdminRoute ? '' : 'flex-1'}>{children}</main>
                {!isAdminRoute && <Footer />}
              </div>
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
