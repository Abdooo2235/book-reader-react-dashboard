// User types
export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  // withCount aggregates returned by the admin users endpoints
  reviews_count?: number;
  submitted_books_count?: number;
  collections_count?: number;
}

export interface AdminUser extends User {
  role: "admin";
}
