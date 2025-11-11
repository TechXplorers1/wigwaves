'use client';

import Link from 'next/link';
import { Menu, Search, ShoppingCart, User } from 'lucide-react';

import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/cart-context';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import CartSheet from '../cart/cart-sheet';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function HeaderNav() {
  const pathname = usePathname();
  return (
    <nav className="hidden md:flex md:items-center md:gap-6 md:ml-10 text-sm font-medium">
      {NAV_LINKS.map(link => (
        <Link
          key={link.name}
          href={link.href}
          className={cn(
            'transition-colors hover:text-primary',
            pathname === link.href ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}

export default function Header() {
  const { itemCount } = useCart();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        {isClient && <HeaderNav />}

        <div className="flex flex-1 items-center justify-end gap-2">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" aria-label="Open cart">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-accent-foreground transform translate-x-1/2 -translate-y-1/2 bg-accent rounded-full">
                    {itemCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
              <CartSheet />
            </SheetContent>
          </Sheet>
          
          <Button variant="ghost" size="icon" asChild>
            <Link href="/login" aria-label="User account">
              <User className="h-5 w-5" />
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium mt-10">
                <Logo />
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      'transition-colors hover:text-primary',
                      pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
