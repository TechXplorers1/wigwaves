import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("text-3xl font-bold tracking-tighter", className)}>
      <span>{APP_NAME}</span>
    </Link>
  );
}
