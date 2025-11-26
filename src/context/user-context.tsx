
'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore, useCollection } from '@/firebase';
import type { User } from '@/lib/types';
import { useAuth } from './auth-context';

interface UserContextType {
  users: User[];
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const firestore = useFirestore();
  const { user } = useAuth();
  
  const usersQuery = React.useMemo(() => {
    if (user?.role !== 'admin') return null;
    return query(collection(firestore, 'users'), orderBy('displayName'));
  }, [firestore, user]);

  const { data: users, loading } = useCollection<User>(usersQuery);

  return (
    <UserContext.Provider value={{ users: users || [], loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};
