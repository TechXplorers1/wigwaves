
'use client';

import { useState, useEffect } from 'react';
import {
  doc,
  onSnapshot,
  DocumentReference,
  DocumentData,
} from 'firebase/firestore';
import { useFirestore } from '../provider';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

export function useDoc<T = DocumentData>(ref: DocumentReference | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const firestore = useFirestore();

  useEffect(() => {
    if (!ref) {
      setData(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.exists()) {
          setData({ id: snapshot.id, ...snapshot.data() } as T);
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching document:', error);
        const permissionError = new FirestorePermissionError({
          path: ref.path,
          operation: 'get',
        });
        errorEmitter.emit('permission-error', permissionError);

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [firestore, ref]);

  return { data, loading };
}
