
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { useAuth as useFirebaseAuth, useFirestore } from '@/firebase';
import type { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = useFirebaseAuth();
  const firestore = useFirestore();

  useEffect(() => {
    let unsubscribeFromFirestore: Unsubscribe | null = null;

    const unsubscribeFromAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(firestore, 'users', firebaseUser.uid);
        
        // Unsubscribe from previous listener if it exists
        if (unsubscribeFromFirestore) {
            unsubscribeFromFirestore();
        }

        unsubscribeFromFirestore = onSnapshot(userDocRef, (userDoc) => {
          if (userDoc.exists()) {
            setUser({ ...userDoc.data(), uid: firebaseUser.uid } as User);
          } else {
            // If user exists in Auth but not Firestore, create a doc
            const newUser: User = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              role: firebaseUser.email === 'admin@gmail.com' ? 'admin' : 'user'
            };
            setDoc(userDocRef, newUser).then(() => {
                setUser(newUser);
            });
          }
          setLoading(false);
        }, (error) => {
            console.error("Error fetching user document:", error);
            setUser(null);
            setLoading(false);
        });

      } else {
        // User is signed out
        if (unsubscribeFromFirestore) {
          unsubscribeFromFirestore();
          unsubscribeFromFirestore = null;
        }
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
        unsubscribeFromAuth();
        if (unsubscribeFromFirestore) {
            unsubscribeFromFirestore();
        }
    };
  }, [auth, firestore]);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const register = async (name: string, email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    
    const newUser: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: name,
        role: email === 'admin@gmail.com' ? 'admin' : 'user',
    };

    const userDocRef = doc(firestore, 'users', firebaseUser.uid);
    await setDoc(userDocRef, newUser);
    // The onAuthStateChanged listener will handle setting the user state
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
