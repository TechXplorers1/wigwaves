
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

  return (
    <>
        <Header />
        <main className={isAdminRoute ? '' : 'flex-1'}>{children}</main>
        {!isAdminRoute && <Footer />}
    </>
  );
}
