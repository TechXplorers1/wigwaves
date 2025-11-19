import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("text-3xl font-bold tracking-tighter flex items-center gap-2", className)}>
      <Image src="https://img.freepik.com/free-vector/women-logo-design-template_474888-1838.jpg?semt=ais_hybrid&w=740&q=80" alt="WigWaves Logo" width={40} height={40} className="rounded-full" />
      <span className="text-2xl font-bold">{APP_NAME}</span>
    </Link>
  );
}

    