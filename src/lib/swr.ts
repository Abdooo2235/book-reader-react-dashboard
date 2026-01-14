import type { SWRConfiguration } from "swr";
import axiosInstance from "./axios";

// SWR fetcher using axios instance
export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await axiosInstance.get<T>(url);
  return response.data;
};

// Default SWR configuration
export const swrConfig: SWRConfiguration = {
  fetcher,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 5000,
  errorRetryCount: 3,
  shouldRetryOnError: (error) => {
    // Don't retry on 401 or 403 errors
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      return false;
    }
    return true;
  },
};

export default swrConfig;
