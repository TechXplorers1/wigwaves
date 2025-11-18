
'use client';

import { ReactNode } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const { firebaseApp, auth, firestore } = initializeFirebase();

  return (
    <FirebaseProvider value={{ firebaseApp, auth, firestore }}>
      {children}
    </FirebaseProvider>
  );
}
