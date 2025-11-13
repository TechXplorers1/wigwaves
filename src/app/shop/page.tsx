
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { products } from '@/lib/products';
import ProductCard from '@/components/product/product-card';
import Filters from '@/components/shop/filters';
import type { Wig } from '@/lib/types';
import Breadcrumb from '@/components/layout/breadcrumb';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filteredProducts, setFilteredProducts] = useState<Wig[]>(products);

  const applyFilters = useCallback((filters: {
    search: string;
    priceRange: [number, number];
    styles: string[];
    colors: string[];
    lengths: string[];
    materials: string[];
  }) => {
    let tempProducts = [...products];
    const category = searchParams.get('category');
    
    if (category) {
        if (category === 'new') {
            tempProducts = products.slice(-6);
        } else {
            tempProducts = tempProducts.filter(p => p.name.toLowerCase().includes(category.slice(0, -1))); // 'braids' -> 'braid'
        }
    }

    const lengthParam = searchParams.get('length');
    if (lengthParam) {
      tempProducts = tempProducts.filter(p => p.length === lengthParam);
    }
    
    const capSizeParam = searchParams.get('cap_size');
    if (capSizeParam) {
      // For now, we just land on the shop page, no pre-filtering is done on the products listed
    }


    // Filter by search term
    if (filters.search) {
      tempProducts = tempProducts.filter(p =>
        p.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filter by price range
    tempProducts = tempProducts.filter(
      p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Filter by style
    if (filters.styles.length > 0) {
      tempProducts = tempProducts.filter(p => filters.styles.includes(p.style));
    }

    // Filter by color
    if (filters.colors.length > 0) {
      tempProducts = tempProducts.filter(p => filters.colors.includes(p.color));
    }

    // Filter by length
    if (filters.lengths.length > 0) {
      tempProducts = tempProducts.filter(p => filters.lengths.includes(p.length));
    }

    // Filter by material
    if (filters.materials.length > 0) {
      tempProducts = tempProducts.filter(p => filters.materials.includes(p.material));
    }

    setFilteredProducts(tempProducts);
  }, [searchParams]);
  
  const initialSearch = searchParams.get('search') || '';
  
  useEffect(() => {
    const category = searchParams.get('category');
    const style = searchParams.get('style');
    const lengthParam = searchParams.get('length');
    const capSizeParam = searchParams.get('cap_size');
    
    let tempProducts = [...products];

    if (category) {
        if (category === 'new') {
            tempProducts = products.slice(-6);
        } else {
            const categorySingular = category.slice(0, -1);
            tempProducts = tempProducts.filter(p => p.name.toLowerCase().includes(categorySingular));
            if (tempProducts.length === 0) {
                router.push('/');
                return;
            }
        }
    } else if (style) {
        tempProducts = tempProducts.filter(p => p.style === style);
    }

    if (lengthParam) {
        tempProducts = tempProducts.filter(p => p.length === lengthParam);
    }

    if (capSizeParam) {
      // For now, we just land on the shop page, no pre-filtering is done on the products listed
    }
    
    setFilteredProducts(tempProducts);
  }, [searchParams, router]);

  return (
    <div className="container py-8">
      <Breadcrumb />
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-headline tracking-tight">Our Collection</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Browse our extensive catalog of premium wigs. Use the filters to find your perfect match.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-20">
            <Filters onFilterChange={applyFilters} initialSearch={initialSearch} />
          </div>
        </aside>
        <main className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <h2 className="text-2xl font-semibold">No Wigs Found</h2>
              <p className="text-muted-foreground mt-2">Try adjusting your filters to find your perfect style.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
