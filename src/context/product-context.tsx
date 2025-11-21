
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Wig } from '@/lib/types';
import { products as initialProductsData } from '@/lib/products';

interface ProductContextType {
  products: Wig[];
  addProduct: (product: Omit<Wig, 'id' | 'isNew'>) => void;
  updateProduct: (product: Wig) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Wig[]>(initialProductsData);

  const addProduct = (product: Omit<Wig, 'id' | 'isNew'>) => {
    setProducts(prevProducts => {
        const newProduct: Wig = {
            ...product,
            id: `w${prevProducts.length + 1}`,
            isNew: true,
        };
        return [newProduct, ...prevProducts];
    });
  };

  const updateProduct = (updatedProduct: Wig) => {
    setProducts(prevProducts =>
        prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
