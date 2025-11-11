'use client';

import Link from 'next/link';
import { Menu, Search, ShoppingCart, User, X, LogOut, LayoutDashboard, UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/cart-context';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        
        {isClient && (
          <>
            <nav className={cn(
              "hidden md:flex md:items-center md:gap-6 text-sm font-medium transition-all duration-300 absolute left-1/2 -translate-x-1/2",
              isSearchOpen ? "opacity-0" : "opacity-100"
            )}>
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

            <div className="flex flex-1 items-center justify-end gap-2">
              <div className={cn(
                "flex items-center gap-2 transition-all duration-300",
                isSearchOpen ? 'w-full max-w-xs' : 'w-0'
              )}>
                {isSearchOpen && (
                  <>
                    <Input
                      type="search"
                      placeholder="Search wigs..."
                      className="h-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearch}
                      autoFocus
                    />
                    <Button variant="ghost" size="icon" aria-label="Close search" onClick={() => setIsSearchOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </>
                )}
              </div>

              {!isSearchOpen && (
                 <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setIsSearchOpen(true)}>
                    <Search className="h-5 w-5" />
                 </Button>
              )}

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
              
              {user ? (
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
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
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
              )}

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
          </>
        )}
      </div>
    </header>
  );
}
