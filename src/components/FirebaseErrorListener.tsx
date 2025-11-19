
'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handleError = (error: FirestorePermissionError) => {
      console.error(error.message);
      toast({
        variant: 'destructive',
        title: 'Permission Error',
        description: 'You do not have permission to perform this action.',
      });
    };

    const handleOfflineError = (error: Error) => {
      if (error.message.includes('offline')) {
        toast({
            variant: 'destructive',
            title: 'Network Error',
            description: 'You appear to be offline. Please check your connection.',
        });
      }
    }

    errorEmitter.on('permission-error', handleError);

    return () => {
      errorEmitter.removeListener('permission-error', handleError);
    };
  }, [toast]);

  return null;
}
