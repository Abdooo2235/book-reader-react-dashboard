import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AdminUser, LoginCredentials, AuthLoginResponse } from "@/types";
import axiosInstance from "@/lib/axios";
import { API_CONFIG } from "@/config/api.config";

interface AuthStore {
  token: string | null;
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post<AuthLoginResponse>(
            API_CONFIG.endpoints.auth.login,
            credentials
          );

          const { token, user } = response.data;

          // Check if user is admin
          if (user.role !== "admin") {
            throw new Error("Access denied. Admin privileges required.");
          }

          set({
            token,
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Login failed. Please check your credentials.";

          set({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage,
          });
          throw error;
        }
      },

      logout: () => {
        const { token } = get();

        // Call logout endpoint if we have a token
        if (token) {
          axiosInstance.post(API_CONFIG.endpoints.auth.logout).catch(() => {
            // Ignore errors on logout
          });
        }

        set({
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      checkAuth: async () => {
        const { token } = get();

        if (!token) {
          set({ isAuthenticated: false });
          return;
        }

        set({ isLoading: true });
        try {
          const response = await axiosInstance.get<{ data: AdminUser }>(
            API_CONFIG.endpoints.auth.me
          );

          const user = response.data.data;

          if (user.role !== "admin") {
            throw new Error("Access denied. Admin privileges required.");
          }

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch {
          set({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
