import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login } from '../api/axios.helper';

interface Profile {
  username: string;
  profile_type: string;
  admin_nit?: string;
}


interface AuthState {
  user: Profile | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (username: string, password: string) => {
        try {
          const response = await login({ username, password });
          console.log(response);
          set({
            user: response.profile,
            token: response.token,
            isAuthenticated: true
          });
          
        } catch (error) {
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('auth-storage');
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);