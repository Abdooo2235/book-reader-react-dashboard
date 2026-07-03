import axiosInstance from "@/lib/axios";
import { API_CONFIG } from "@/config/api.config";
import type { ApiResponse, DashboardStats } from "@/types";

/**
 * Fetch admin dashboard statistics from GET /admin/stats
 */
export async function getStats(): Promise<DashboardStats> {
  const response = await axiosInstance.get<ApiResponse<DashboardStats>>(
    API_CONFIG.endpoints.dashboard.stats
  );
  return response.data.data;
}
