'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react'; // ✅ Added useMemo
import { collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { useFirestore, useCollection } from '@/firebase';
import type { Wig } from '@/lib/types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

interface ProductContextType {
  products: Wig[];
  addProduct: (product: Omit<Wig, 'id' | 'isNew'>) => void;
  updateProduct: (product: Wig) => void;
  deleteProduct: (productId: string) => void;
  loading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const firestore = useFirestore();

  // ✅ FIX: Wrap this in useMemo so the reference stays stable across renders
  const productsCollection = useMemo(() => {
    return collection(firestore, 'products');
  }, [firestore]);

  const { data: products, loading } = useCollection<Wig>(productsCollection);

  const addProduct = (product: Omit<Wig, 'id' | 'isNew'>) => {
    const newProduct = { ...product, isNew: true };
    addDoc(productsCollection, newProduct).catch(async (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: productsCollection.path,
        operation: 'create',
        requestResourceData: newProduct,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
  };

  const updateProduct = (updatedProduct: Wig) => {
    const productRef = doc(firestore, 'products', updatedProduct.id);
    const { id, ...productData } = updatedProduct;
    updateDoc(productRef, productData).catch(async (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: productRef.path,
        operation: 'update',
        requestResourceData: productData,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
  };

  const deleteProduct = (productId: string) => {
    const productRef = doc(firestore, 'products', productId);
    deleteDoc(productRef).catch(async (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: productRef.path,
        operation: 'delete',
      });
      errorEmitter.emit('permission-error', permissionError);
    });
  };

  return (
    <ProductContext.Provider value={{ products: products || [], addProduct, updateProduct, deleteProduct, loading }}>
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