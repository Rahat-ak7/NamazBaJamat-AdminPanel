import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Admin {
  _id: string;
  email: string;
  phoneNo: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  token: string | null;
  admin: Admin | null;
  isAuthenticated: boolean;
  login: (token: string, admin: Admin) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      admin: null,
      isAuthenticated: false,
      login: (token: string, admin: Admin) => set({ token, admin, isAuthenticated: true }),
      logout: () => {
        set({ token: null, admin: null, isAuthenticated: false });
        // Clear any cached data that might be tied to the auth token
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-storage');
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        // Check if token exists and is valid when rehydrating
        if (state?.token) {
          // You could add additional token validation here
          state.isAuthenticated = true;
        }
      },
    }
  )
);