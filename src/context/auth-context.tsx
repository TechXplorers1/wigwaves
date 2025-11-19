
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
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
    const unsubscribeFromAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Create a basic user object from auth data first.
        // This allows login to succeed even if firestore is offline.
        const basicUser: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          role: 'user', // Default role
          photoURL: firebaseUser.photoURL,
        };
        setUser(basicUser);

        // Then, try to get the full profile from Firestore.
        try {
          const userDocRef = doc(firestore, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUser({ uid: firebaseUser.uid, ...userDoc.data() } as User);
          }
        } catch (error) {
          console.error("Firestore is offline or there was an error fetching the user document:", error);
          // The user state is already set with basic info, so the app can continue.
        }
        
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribeFromAuth();
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

    // Update the Firebase Auth profile
    await updateProfile(firebaseUser, { displayName: name });
    
    // Create the user document in Firestore, but don't block login if it fails.
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
      console.error("Failed to create user document on register. User will be created on next login.", e);
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
