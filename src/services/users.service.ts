import axiosInstance from "@/lib/axios";
import { API_CONFIG } from "@/config/api.config";
import type { ApiResponse, PaginatedResponse, User } from "@/types";

/**
 * Fetch a paginated list of users
 */
export async function getUsers(
  page = 1,
  perPage = 15
): Promise<PaginatedResponse<User>> {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("per_page", perPage.toString());

  const response = await axiosInstance.get<ApiResponse<PaginatedResponse<User>>>(
    `${API_CONFIG.endpoints.users.list}?${params.toString()}`
  );
  return response.data.data;
}

/**
 * Get a single user by ID
 */
export async function getUserById(id: number): Promise<User> {
  const response = await axiosInstance.get<ApiResponse<User>>(
    API_CONFIG.endpoints.users.detail(id)
  );
  return response.data.data;
}
