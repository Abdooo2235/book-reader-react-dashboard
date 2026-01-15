// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

export interface DashboardStats {
  total_users: number;
  total_books: number;
  approved_books: number;
  pending_books: number;
  rejected_books: number;
  total_categories: number;
}

export interface AuthLoginResponse {
  data: any;
  token: string;
  user: import("./user.types").AdminUser;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
