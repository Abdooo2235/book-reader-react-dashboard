import type { Category } from "./category.types";
import type { User } from "./user.types";

// Book types
export type BookStatus = "pending" | "approved" | "rejected";
export type BookFileType = "pdf" | "epub";

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string | null;
  category_id: number;
  category?: Category;
  pages: number;
  file_type: BookFileType;
  file_path: string;
  cover_image: string | null;
  status: BookStatus;
  user_id: number;
  submitted_by?: User;
  downloads_count: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface BookFormData {
  title: string;
  author: string;
  description?: string;
  category_id: number;
  pages: number;
}

export interface BookFilters {
  status?: BookStatus;
  category_id?: number;
  search?: string;
  page?: number;
  per_page?: number;
}
