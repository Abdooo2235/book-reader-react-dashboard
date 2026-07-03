import axiosInstance from "@/lib/axios";
import { API_CONFIG } from "@/config/api.config";
import type { ApiResponse, Category, CategoryFormData } from "@/types";

/**
 * Fetch all categories (non-paginated). Each item includes books_count.
 */
export async function getCategories(): Promise<Category[]> {
  const response = await axiosInstance.get<ApiResponse<Category[]>>(
    API_CONFIG.endpoints.categories.list
  );
  return response.data.data;
}

/**
 * Create a new category
 */
export async function createCategory(
  data: CategoryFormData
): Promise<Category> {
  const response = await axiosInstance.post<ApiResponse<Category>>(
    API_CONFIG.endpoints.categories.create,
    data
  );
  return response.data.data;
}

/**
 * Update an existing category
 */
export async function updateCategory(
  id: number,
  data: CategoryFormData
): Promise<Category> {
  const response = await axiosInstance.put<ApiResponse<Category>>(
    API_CONFIG.endpoints.categories.update(id),
    data
  );
  return response.data.data;
}

/**
 * Delete a category
 */
export async function deleteCategory(id: number): Promise<void> {
  await axiosInstance.delete(API_CONFIG.endpoints.categories.delete(id));
}
