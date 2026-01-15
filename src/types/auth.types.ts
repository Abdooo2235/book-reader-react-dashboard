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

// Response from backend login endpoint
// Backend returns: { success, message, data: { user, token } }
export interface AuthLoginResponse {
  success: boolean;
  message: string;
  data: {
    user: import("./user.types").AdminUser;
    token: string;
  };
  // For backward compatibility, also allow flat structure
  user?: import("./user.types").AdminUser;
  token?: string;
}
