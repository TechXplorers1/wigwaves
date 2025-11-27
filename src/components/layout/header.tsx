
'use client';

import Link from 'next/link';
import { Menu, Search, ShoppingCart, User, X, LogOut, LayoutDashboard, UserCircle, CreditCard, Settings, Heart, ChevronDown, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Truck } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { PRIMARY_NAV_LINKS, SECONDARY_NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/cart-context';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import CartSheet from '../cart/cart-sheet';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
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
  const [activeLink, setActiveLink] = useState('');
  const sectionsRef = useRef<{[key: string]: HTMLElement | null}>({});
  
  const isHomePage = pathname === '/';

  useEffect(() => {
    setIsClient(true);
    
    if (isHomePage) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveLink(`/#${entry.target.id}`);
          }
        });
      }, { threshold: 0.5, rootMargin: "-100px 0px -50% 0px" });

      PRIMARY_NAV_LINKS.forEach(link => {
        const id = link.href.split('#')[1];
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            sectionsRef.current[link.href] = element;
            observer.observe(element);
          }
        }
      });

      return () => {
        Object.values(sectionsRef.current).forEach(element => {
          if (element) {
            observer.unobserve(element);
          }
        });
      };
    }

  }, [isHomePage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  }

  const closeCart = () => setIsCartOpen(false);
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHomePage && href.startsWith('/#')) {
      e.preventDefault();
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80, // Adjust for header height
          behavior: 'smooth',
        });
      }
      setIsMenuOpen(false);
    } else if (!isHomePage && href.startsWith('/#')) {
        // If not on home page, just let the Link component handle navigation
        setIsMenuOpen(false);
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="bg-secondary/50 text-secondary-foreground py-2 text-xs">
          <div className="container flex justify-between items-center">
              <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                      <Link href="#" className="hover:text-primary"><Facebook className="w-4 h-4" /></Link>
                      <Link href="#" className="hover:text-primary"><Instagram className="w-4 h-4" /></Link>
                      <Link href="#" className="hover:text-primary"><Twitter className="w-4 h-4" /></Link>
                  </div>
                  <div className="hidden sm:flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                          <Phone className="w-4 h-4" />
                          <a href="tel:+2349098101010" className="hover:text-primary">+234 909 810 1010</a>
                      </div>
                      <div className="flex items-center gap-1.5">
                          <Mail className="w-4 h-4" />
                          <a href="mailto:ng-contact@wigwaves.com" className="hover:text-primary">ng-contact@wigwaves.com</a>
                      </div>
                  </div>
              </div>
               <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span>Lagos, Nigeria</span>
                  </div>
                   <div className="hidden md:flex items-center gap-1.5">
                      <Truck className="w-4 h-4" />
                      <Link href="#" className="hover:text-primary">Track Order</Link>
                  </div>
                   {user ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-auto p-0 flex items-center gap-1.5 text-xs hover:bg-transparent hover:text-primary">
                            <User className="w-4 h-4" />
                            {user.displayName}
                            <ChevronDown className="w-4 h-4 opacity-50" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {user.role === 'admin' && (
                             <DropdownMenuItem asChild>
                              <Link href="/admin/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem asChild>
                            <Link href="/profile"><UserCircle className="mr-2 h-4 w-4" />Profile</Link>
                          </DropdownMenuItem>
                           <DropdownMenuItem asChild>
                            <Link href="/billing"><CreditCard className="mr-2 h-4 w-4" />Billing</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/settings"><Settings className="mr-2 h-4 w-4" />Settings</Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Logout</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <div className="flex items-center gap-1.5">
                          <User className="w-4 h-4" />
                          <Link href="/login" className="hover:text-primary">Log In</Link>
                          <span className="opacity-50">|</span>
                          <Link href="/register" className="hover:text-primary">Sign Up</Link>
                      </div>
                    )}
              </div>
          </div>
      </div>
    <header className="border-b">
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
                {PRIMARY_NAV_LINKS.map(link => (
                    <Link
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={cn(
                        'transition-colors hover:text-primary py-2',
                        activeLink === link.href ? 'text-primary' : 'text-muted-foreground'
                        )}
                    >
                        {link.name}
                    </Link>
                  )
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        

        <nav className="hidden lg:flex flex-1 justify-center items-center gap-x-6">
            {PRIMARY_NAV_LINKS.map(link => (
                <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                        'text-sm font-medium transition-colors hover:text-primary',
                        (isHomePage && activeLink === link.href) ? 'text-primary font-bold' : 'text-foreground'
                    )}
                >
                    {link.name}
                </Link>
            ))}
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
    </div>
  );
}
