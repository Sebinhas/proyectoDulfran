import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  nit?: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  currentNit: number | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setCurrentNit: (nit: number) => void;
}

export const useAuthStore = create<AuthState>()(

  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      currentNit: null,

      login: async (email: string, password: string) => {
        try {
          // Aquí iría tu lógica de autenticación con el backend
          const mockUsers = [
            {
              id: '1111',
              name: 'Sebastian Cuervo',
              email: 'cuervo@lab.com',
              password: 'cuervo',
              role: 'administrador',
              nit: 1111

            },
            {
              id: '1234567891',
              name: 'Sebastian Guerra',
              email: 'sebastian@lab.com',
              password: 'sebastian',
              role: 'administrador',
              nit: 3333

            },
            {
              id: '1234567892',
              name: 'Juanes Espinosa',
              email: 'juanes@lab.com',
              password: 'juanes',
              role: 'administrador',
              nit: 2222

            },
            {
              id: '1234567893',
              name: 'Cliente 1',
              email: 'cliente1@lab.com',
              password: 'cliente1',
              role: 'cliente',
              nit: 4444
            },
            {
              id: '1234567899',
              name: 'Cliente 2',
              email: 'cliente2@lab.com',
              password: 'cliente2',
              role: 'cliente',
              nit: 5555
            },
            {
              id: '1234567894',
              name: 'financiero',
              email: 'financiero@lab.com',
              password: 'financiero',
              role: 'financiero',
              nit: 2222
            },
            {
              id: '1234567895',
              name: 'tecnico',
              email: 'tecnico@lab.com',
              password: 'tecnico',
              role: 'tecnico',
              nit: 7777
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
            isAuthenticated: true,
            currentNit: userWithoutPassword.nit || null
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
          currentNit: null,
          login: useAuthStore.getState().login,
          logout: useAuthStore.getState().logout,
          updateUser: useAuthStore.getState().updateUser,
          setCurrentNit: useAuthStore.getState().setCurrentNit
        }));
      },

      setCurrentNit: (nit) => {
        set({ currentNit: nit });
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