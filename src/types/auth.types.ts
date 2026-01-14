// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  token: string | null;
  user: import("./user.types").AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
