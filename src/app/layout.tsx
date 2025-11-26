

'use client';

import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/cart-context';
import { AuthProvider } from '@/context/auth-context';
import { FirebaseClientProvider } from '@/firebase';
import AppLayout from '@/components/layout/app-layout';
import { ThemeProvider } from '@/context/theme-provider';
import { ProductProvider } from '@/context/product-context';
import { OrderProvider } from '@/context/order-context';
import { UserProvider } from '@/context/user-context';

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <AuthProvider>
              <ProductProvider>
                <UserProvider>
                  <OrderProvider>
                    <CartProvider>
                        <AppLayout>
                            {children}
                        </AppLayout>
                      <Toaster />
                    </CartProvider>
                  </OrderProvider>
                </UserProvider>
              </ProductProvider>
            </AuthProvider>
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
