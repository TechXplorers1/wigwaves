'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '@/components/product/product-card';
import Filters from '@/components/shop/filters';
import type { Wig } from '@/lib/types';
import Breadcrumb from '@/components/layout/breadcrumb';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/context/product-context';

export default function ShopPageClient() {
  const { products } = useProducts();
  const searchParams = useSearchParams();
  const router = useRouter();
const [filteredProducts, setFilteredProducts] = useState<Wig[]>([]);
  const [isEmptyCategory, setIsEmptyCategory] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  type FiltersState = {
  search: string;
  priceRange: [number, number];
  styles: string[];
  colors: string[];
  lengths: string[];
  materials: string[];
};

const [filtersState, setFiltersState] = useState<FiltersState>({
  search: '',
  priceRange: [0, 500],
  styles: [],
  colors: [],
  lengths: [],
  materials: [],
});

const handleFilterChange = useCallback((filters: FiltersState) => {
  setFiltersState(filters);
}, []);


  
  const initialSearch = searchParams.get('search') || '';




  useEffect(() => {
  setFiltersState(prev => ({
    ...prev,
    search: initialSearch,
  }));
}, [initialSearch]);
  
useEffect(() => {

    if (!products || products.length === 0) {
    setFilteredProducts([]);
    setIsEmptyCategory(false);
    return;
  }

  let tempProducts = [...products];

  const category = searchParams.get('category');
  const styleParam = searchParams.get('style');
  const lengthParam = searchParams.get('length');
  const capSizeParam = searchParams.get('cap_size');
  const searchParam = searchParams.get('search') || '';

  let categoryIsEmpty = false;

  // 1) URL / category based filtering
  if (category) {
    if (category === 'new') {
      tempProducts = products.filter(p => p.isNew);
    } else {
      const categorySingular = category.endsWith('s')
        ? category.slice(0, -1)
        : category;

      tempProducts = tempProducts.filter(p => {
        if (categorySingular === 'extension') {
          return p.name.toLowerCase().includes('extension');
        }
        return p.type === categorySingular;
      });
    }

    if (tempProducts.length === 0) {
      categoryIsEmpty = true;
      setCategoryName(category.toUpperCase());
    }
  } else if (styleParam) {
    tempProducts = tempProducts.filter(p => p.style === styleParam);
  }

  if (lengthParam) {
    tempProducts = tempProducts.filter(p => p.length === lengthParam);
  }

  if (capSizeParam) {
    // currently no extra filter
  }

  // 2) Apply sidebar filters from Filters.tsx
  const filters = filtersState;

  // search (combine URL search + sidebar search: sidebar wins if set)
  const effectiveSearch = filters.search || searchParam;
  if (effectiveSearch) {
    tempProducts = tempProducts.filter(p =>
      p.name.toLowerCase().includes(effectiveSearch.toLowerCase())
    );
  }

  // price
 if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 500) {
  tempProducts = tempProducts.filter(
    p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
  );
}

  // styles
  if (filters.styles.length > 0) {
    tempProducts = tempProducts.filter(p => filters.styles.includes(p.style));
  }

  // colors
  if (filters.colors.length > 0) {
    tempProducts = tempProducts.filter(p => filters.colors.includes(p.color));
  }

  // lengths
  if (filters.lengths.length > 0) {
    tempProducts = tempProducts.filter(p => filters.lengths.includes(p.length));
  }

  // materials
  if (filters.materials.length > 0) {
    tempProducts = tempProducts.filter(p => filters.materials.includes(p.material));
  }

  const hasAnyFilter =
    !!filters.search ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 500 ||
    filters.styles.length > 0 ||
    filters.colors.length > 0 ||
    filters.lengths.length > 0 ||
    filters.materials.length > 0;

  if (category && tempProducts.length === 0 && !hasAnyFilter) {
    categoryIsEmpty = true;
    setCategoryName(category.toUpperCase());
  }

  setIsEmptyCategory(categoryIsEmpty);
  setFilteredProducts(tempProducts);
}, [products, searchParams, filtersState]);

  return (
    <div className="container py-8">
      <Breadcrumb />
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-headline tracking-tight">Our Collection</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Browse our extensive catalog of premium wigs. Use the filters to find your perfect match.
        </p>
      </div>
      
      {isEmptyCategory ? (
        <div className="text-center py-16">
            <h2 className="text-2xl font-semibold">Collection {categoryName} is empty</h2>
            <Button asChild className="mt-6">
                <Link href="/">Back to Homepage</Link>
            </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
            <div className="sticky top-20">
                <Filters onFilterChange={handleFilterChange} initialSearch={searchParams.get('search') || ''} />
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
      )}
    </div>
  );
}
