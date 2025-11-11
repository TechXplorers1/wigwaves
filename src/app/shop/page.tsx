import { products } from '@/lib/products';
import ProductCard from '@/components/product/product-card';
import Filters from '@/components/shop/filters';

export default function ShopPage() {
  return (
    <div className="container py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-headline tracking-tight">Our Collection</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Browse our extensive catalog of premium wigs. Use the filters to find your perfect match.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-20">
            <Filters />
          </div>
        </aside>
        <main className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
