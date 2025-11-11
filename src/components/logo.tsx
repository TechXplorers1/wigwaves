import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import { WigIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-xl font-headline font-bold", className)}>
      <WigIcon className="h-7 w-7 text-primary" />
      <span>{APP_NAME}</span>
    </Link>
  );
}
