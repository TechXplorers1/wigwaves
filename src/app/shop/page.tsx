import { Suspense } from 'react';
import ShopPageClient from './ShopPageClient';

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-8">
          <h1 className="text-2xl font-semibold">Loading products…</h1>
        </div>
      }
    >
      <ShopPageClient />
    </Suspense>
  );
}
