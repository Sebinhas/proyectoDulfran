import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(

  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          // Aquí iría tu lógica de autenticación con el backend
          const mockUsers = [
            {
              id: '1234567890',
              name: 'Sebastian Cuervo',
              email: 'cuervo@lab.com',
              password: 'cuervo',
              role: 'admin'
            },
            {
              id: '1234567891',
              name: 'Sebastian Guerra',
              email: 'sebastian@lab.com',
              password: 'sebastian',
              role: 'admin'
            },
            {
              id: '1234567892',
              name: 'Juanes Espinoza',
              email: 'juanes@lab.com',
              password: 'juanes',
              role: 'admin'
            },
            {
              id: '1234567893',
              name: 'Usuario',
              email: 'user@lab.com',
              password: 'user',
              role: 'user'
            },
            {
              id: '1234567899',
              name: 'Cliente',
              email: 'cliente@lab.com',
              password: 'cliente',
              role: 'user'
            }
          ];

          const user = mockUsers.find(
            (u) => u.email === email && u.password === password
          );

          if (!user) {
            throw new Error('Credenciales inválidas');
          }
        
          console.log(user);
          const { password: _, ...userWithoutPassword } = user;
          
          set({
            user: userWithoutPassword,
            token: 'mock-jwt-token',
            isAuthenticated: true
          });

        } catch (error) {
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('auth-storage');
        set(() => ({
          user: null,
          token: null,
          isAuthenticated: false,
          login: useAuthStore.getState().login,
          logout: useAuthStore.getState().logout,
          updateUser: useAuthStore.getState().updateUser
        }));
      },


      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null
        }));
      }
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          try {
            return JSON.parse(str);
          } catch {
            localStorage.removeItem(name);
            return null;
          }
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name)
      }
    }
  )
);