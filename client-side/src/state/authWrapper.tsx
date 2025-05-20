'use client';
import { useAuth } from '@/utils/customHooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null; // or loading spinner
  return <>{children}</>
};
