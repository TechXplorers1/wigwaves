
'use client';

import { ReactNode, useMemo } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const firebaseContext = useMemo(() => initializeFirebase(), []);

  return (
    <FirebaseProvider value={firebaseContext}>
      {children}
    </FirebaseProvider>
  );
}
