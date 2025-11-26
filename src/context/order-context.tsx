
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { collection, addDoc, serverTimestamp, query, where, orderBy, FieldValue } from 'firebase/firestore';
import { useFirestore, useCollection } from '@/firebase';
import type { Order } from '@/lib/types';
import { useAuth } from './auth-context';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

interface OrderContextType {
  orders: Order[];
  addOrder: (orderData: Omit<Order, 'id' | 'createdAt'>) => Promise<void>;
  loading: boolean;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const firestore = useFirestore();
  const { user } = useAuth();
  
  const ordersQuery = useMemo(() => {
    if (!user) return null;
    const ordersCollection = collection(firestore, 'orders');
    if (user.role === 'admin') {
      return query(ordersCollection, orderBy('createdAt', 'desc'));
    }
    return query(ordersCollection, where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
  }, [firestore, user]);

  const { data: orders, loading } = useCollection<Order>(ordersQuery);

  const addOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>) => {
    const ordersCollection = collection(firestore, 'orders');
    const newOrderData = {
      ...orderData,
      createdAt: serverTimestamp() as FieldValue,
    };
    
    return addDoc(ordersCollection, newOrderData).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: ordersCollection.path,
            operation: 'create',
            requestResourceData: newOrderData,
        });
        errorEmitter.emit('permission-error', permissionError);
        throw permissionError;
    }).then(() => {});
  };

  return (
    <OrderContext.Provider value={{ orders: orders || [], addOrder, loading }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
