import type { Book } from "./book.types";

// Standard response envelope: { success, message?, data }
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Laravel-style paginated payload (the `data` inside an ApiResponse envelope)
export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

// Shape returned by GET /admin/stats
export interface DashboardStats {
  total_users: number;
  total_books: number;
  pending_books: number;
  total_categories: number;
  recent_books: Book[];
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
