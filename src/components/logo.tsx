import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("text-3xl font-bold tracking-tighter flex items-center gap-2", className)}>
      <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf-qXp2y-2-L-l-g-k-O-c-g-P-q-B-2F-w&s" alt="GG Wig Logo" width={40} height={40} className="rounded-full" />
      <span className="text-2xl font-bold">{APP_NAME}</span>
    </Link>
  );
}
