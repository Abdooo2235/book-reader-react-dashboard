import axiosInstance from "@/lib/axios";
import { API_CONFIG } from "@/config/api.config";
import type { Book, BookFilters } from "@/types";

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * Fetch paginated list of books for admin
 */
export async function getBooks(
  filters?: BookFilters
): Promise<PaginatedResponse<Book>> {
  const params = new URLSearchParams();

  if (filters?.status) {
    params.append("filter[status]", filters.status);
  }
  if (filters?.category_id) {
    params.append("filter[category_id]", filters.category_id.toString());
  }
  if (filters?.search) {
    params.append("filter[title]", filters.search);
  }
  if (filters?.page) {
    params.append("page", filters.page.toString());
  }
  if (filters?.per_page) {
    params.append("per_page", filters.per_page.toString());
  }

  // Always include category and creator
  params.append("include", "category,creator");

  const response = await axiosInstance.get<
    ApiResponse<PaginatedResponse<Book>>
  >(`${API_CONFIG.endpoints.books.list}?${params.toString()}`);

  return response.data.data;
}

/**
 * Get a single book by ID
 */
export async function getBook(id: number): Promise<Book> {
  const response = await axiosInstance.get<ApiResponse<Book>>(
    API_CONFIG.endpoints.books.detail(id)
  );
  return response.data.data;
}

/**
 * Approve a pending book
 */
export async function approveBook(id: number): Promise<Book> {
  const response = await axiosInstance.put<ApiResponse<Book>>(
    API_CONFIG.endpoints.books.approve(id)
  );
  return response.data.data;
}

/**
 * Reject a pending book with optional reason
 */
export async function rejectBook(
  id: number,
  rejectionReason?: string
): Promise<Book> {
  const response = await axiosInstance.put<ApiResponse<Book>>(
    API_CONFIG.endpoints.books.reject(id),
    { rejection_reason: rejectionReason }
  );
  return response.data.data;
}

/**
 * Delete a book
 */
export async function deleteBook(id: number): Promise<void> {
  await axiosInstance.delete(API_CONFIG.endpoints.books.delete(id));
}

/**
 * Update a book
 */
export async function updateBook(
  id: number,
  data: Partial<Book>
): Promise<Book> {
  const response = await axiosInstance.put<ApiResponse<Book>>(
    API_CONFIG.endpoints.books.update(id),
    data
  );
  return response.data.data;
}
