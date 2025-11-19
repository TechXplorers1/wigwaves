
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, onSnapshot, Unsubscribe, getDoc } from 'firebase/firestore';
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
        
        if (unsubscribeFromFirestore) {
            unsubscribeFromFirestore();
        }

        unsubscribeFromFirestore = onSnapshot(userDocRef, (userDoc) => {
          if (userDoc.exists()) {
            setUser({ uid: firebaseUser.uid, ...userDoc.data() } as User);
          } else {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              role: 'user',
            });
          }
          setLoading(false);
        }, (error) => {
            console.error("Error fetching user document:", error);
            // This is a fallback for when Firestore is offline or there are permission errors.
            // It allows the user to still be logged in with basic info.
            if (error.code === 'unavailable' || (error.message && error.message.includes('offline'))) {
              setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                role: 'user',
              });
            }
            setLoading(false);
        });

      } else {
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
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const userDocRef = doc(firestore, 'users', firebaseUser.uid);
    try {
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
          const newUser: User = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              role: 'user'
          };
          await setDoc(userDocRef, newUser);
      }
    } catch(e) {
      console.error("Failed to check/create user document on login:", e);
    }
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
        role: 'user',
    };

    const userDocRef = doc(firestore, 'users', firebaseUser.uid);
    try {
      await setDoc(userDocRef, newUser);
    } catch(e) {
      console.error("Failed to create user document on register:", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
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
