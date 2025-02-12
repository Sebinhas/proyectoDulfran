import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCurrentProfile, login } from "../api/axios.helper";

interface Profile {
  cedula: string;
  first_name: string;
  second_name: string;
  first_lastname: string;
  second_lastname: string;
  address: string;
  phone: string;
  email: string;
  stratum: string;
  profile_type: string;
  nit: string;
  name: string;
  logo_url: string;
  username: string;
  status: string;
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
          if (response) {
            const profile = await getCurrentProfile(response.token);
            set({
              user: profile,
              token: response.token,
              isAuthenticated: true,
            });
          }
        } catch (error) {
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem("auth-storage");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
