
'use client';

import Link from 'next/link';
import { Menu, Search, ShoppingCart, User, X, LogOut, LayoutDashboard, UserCircle, CreditCard, Settings, Heart, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';
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
} from "@/components/ui/dropdown-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const categories = [
  { name: 'Wigs', href: '/shop?category=wigs' },
  { name: 'Hair Extension', href: '/shop?category=extensions' },
  { name: 'Toupees', href: '/shop?category=toupees' },
];

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  }

  const closeCart = () => setIsCartOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 sm:h-20 items-center">
        <div className="mr-6 flex items-center">
            <Logo />
        </div>
        
        <div className="flex items-center lg:hidden ml-auto">
           <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className='w-full max-w-sm p-0'>
                <SheetHeader className="p-6 pb-0">
                  <SheetTitle><Logo /></SheetTitle>
                  <SheetDescription className="sr-only">Main mobile navigation menu</SheetDescription>
                </SheetHeader>
                <div className="p-6">
                    <form onSubmit={handleSearch} className="relative w-full mb-4">
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="h-9 pr-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-9 w-10 text-muted-foreground">
                            <Search className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
              <nav className="grid gap-4 text-base font-medium px-6">
                {PRIMARY_NAV_LINKS.map(link => {
                  if (link.name === 'Category') {
                    return (
                       <Accordion type="single" collapsible key={link.name}>
                        <AccordionItem value="item-1" className="border-b-0">
                          <AccordionTrigger className="hover:no-underline text-muted-foreground hover:text-primary transition-colors py-2">
                              {link.name}
                          </AccordionTrigger>
                          <AccordionContent className="pl-4">
                            <nav className="grid gap-4 text-base font-medium">
                              {categories.map(category => (
                                <Link
                                  key={category.name}
                                  href={category.href}
                                  className="text-muted-foreground hover:text-primary transition-colors"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {category.name}
                                </Link>
                              ))}
                            </nav>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )
                  }
                  return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={cn(
                        'transition-colors hover:text-primary py-2',
                        pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                        )}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {link.name}
                    </Link>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        

        <nav className="hidden lg:flex flex-1 justify-center items-center gap-x-6">
            {PRIMARY_NAV_LINKS.map(link => {
                 if (link.name === 'Category') {
                    return (
                        <DropdownMenu key={link.name}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        'text-sm font-medium transition-colors hover:text-primary hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0',
                                        pathname.startsWith('/shop') ? 'text-primary font-bold' : 'text-foreground'
                                    )}
                                >
                                    Category
                                    <ChevronDown className='ml-1 h-4 w-4'/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {categories.map(category => (
                                    <DropdownMenuItem key={category.name} asChild>
                                        <Link href={category.href}>{category.name}</Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                }

                return(
                <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                        'text-sm font-medium transition-colors hover:text-primary',
                        pathname === link.href ? 'text-primary font-bold' : 'text-foreground'
                    )}
                >
                    {link.name}
                </Link>
            )})}
        </nav>
        
        <div className="hidden lg:flex flex-initial items-center justify-end gap-2">
            <form onSubmit={handleSearch} className="relative w-full max-w-[15rem]">
                <Input
                    type="search"
                    placeholder="Search..."
                    className="h-9 pr-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                 <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-9 w-10 text-muted-foreground">
                    <Search className="h-4 w-4" />
                </Button>
            </form>
          
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" aria-label="Open cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                {isClient && itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {itemCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
              <CartSheet closeCart={closeCart} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
