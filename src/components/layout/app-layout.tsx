
'use client'
import { usePathname } from "next/navigation";
import Header from "./header";
import Footer from "./footer";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');
  const isShopPage = pathname === '/shop';

  return (
    <div className="relative flex min-h-screen flex-col">
        {!isAdminRoute && !isShopPage && <Header />}
        <main className={isAdminRoute ? '' : 'flex-1'}>{children}</main>
        {!isAdminRoute && !isShopPage && <Footer />}
    </div>
  );
}
