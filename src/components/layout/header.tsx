
'use client';

import Link from 'next/link';
import { Menu, Search, ShoppingCart, User, X, LogOut, LayoutDashboard, UserCircle, CreditCard, Settings, Heart, ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { PRIMARY_NAV_LINKS, SECONDARY_NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/cart-context';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import CartSheet from '../cart/cart-sheet';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { useAuth } from '@/context/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent
} from "@/components/ui/dropdown-menu"

const SubNav = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getIsActive = (href: string) => {
    const url = new URL(href, 'http://localhost');
    const currentUrl = new URL(pathname + '?' + searchParams.toString(), 'http://localhost');
    return url.pathname === currentUrl.pathname && url.search === currentUrl.search;
  };
  
  const isWigsActive = () => {
    return pathname === '/shop' && (searchParams.has('style') || searchParams.has('length') || searchParams.has('cap_size'));
  }

  return (
    <div className="border-b">
        <div className="container mx-auto">
            <nav className="flex h-12 items-center justify-center gap-x-8">
                {SECONDARY_NAV_LINKS.map(link => (
                    link.sublinks ? (
                         <DropdownMenu key={link.name}>
                            <DropdownMenuTrigger asChild>
                                <Link href={link.href} className={cn('sub-nav-link flex items-center gap-1', isWigsActive() ? 'active' : '')}>
                                    {link.name}
                                    <ChevronDown className="h-4 w-4" />
                                </Link>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {link.sublinks.map(sublink => (
                                    <DropdownMenuItem key={sublink.name} asChild>
                                        <Link href={sublink.href}>{sublink.name}</Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link key={link.name} href={link.href} className={cn('sub-nav-link', getIsActive(link.href) ? 'active' : '')}>
                            {link.name}
                        </Link>
                    )
                ))}
            </nav>
        </div>
    </div>
  )
}

export default function Header() {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  }

  const closeCart = () => setIsCartOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <div className="flex items-center lg:hidden">
           <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className='w-full max-w-sm'>
                <SheetHeader>
                  <SheetTitle><Logo /></SheetTitle>
                  <SheetDescription className="sr-only">Main mobile navigation menu</SheetDescription>
                </SheetHeader>
              <nav className="grid gap-4 text-base font-medium mt-8">
                {[...PRIMARY_NAV_LINKS, ...SECONDARY_NAV_LINKS].map(link => (
                    link.sublinks ? (
                        <DropdownMenu key={link.name}>
                            <DropdownMenuTrigger asChild>
                                <div className='flex items-center justify-between'>
                                    <Link href={link.href} className={cn('transition-colors hover:text-primary', pathname.startsWith(link.href) ? 'text-primary' : 'text-muted-foreground')} onClick={() => setIsMenuOpen(false)}>{link.name}</Link>
                                    <ChevronDown className="h-4 w-4" />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {link.sublinks.map(sublink => (
                                    <DropdownMenuItem key={sublink.name} asChild>
                                        <Link href={sublink.href} onClick={() => setIsMenuOpen(false)}>{sublink.name}</Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                            'transition-colors hover:text-primary',
                            pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                            )}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    )
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="mr-6 hidden lg:flex items-center">
            <Logo />
        </div>

        <nav className="hidden lg:flex flex-1 justify-center items-center gap-x-6">
            {PRIMARY_NAV_LINKS.map(link => (
                <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                        'text-sm font-medium transition-colors hover:text-primary',
                        pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                    )}
                >
                    {link.name}
                </Link>
            ))}
        </nav>
        
        <div className="flex items-center justify-end gap-2">
            <div className="relative hidden sm:block w-full max-w-[15rem]">
                <Input
                    type="search"
                    placeholder="Search..."
                    className="h-9 pr-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" aria-label="Open cart">
                <ShoppingCart className="h-5 w-5" />
                {isClient && itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {itemCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
              <CartSheet closeCart={closeCart} />
            </SheetContent>
          </Sheet>
          
           <Button variant="ghost" size="icon" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
          </Button>

          {isClient ? (
            user ? (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="User account">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {user.role === 'admin' ? (
                  <>
                    <DropdownMenuLabel>Admin Menu</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <UserCircle className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/billing">
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )
        ) : <Button disabled>Login</Button>}
        </div>
      </div>
      {isClient && (
        <div className="hidden lg:block">
          <SubNav />
        </div>
      )}
    </header>
  );
}
