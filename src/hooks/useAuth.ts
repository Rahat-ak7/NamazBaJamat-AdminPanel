import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const { token, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Check if token exists and is valid
    if (!token && isAuthenticated) {
      logout();
      router.push('/login');
    }
  }, [token, isAuthenticated, logout, router]);

  return { token, isAuthenticated, logout };
};