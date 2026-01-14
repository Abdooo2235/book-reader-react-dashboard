export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  endpoints: {
    auth: {
      login: "/auth/login",
      logout: "/auth/logout",
      me: "/auth/me",
    },
    dashboard: {
      stats: "/admin/dashboard/stats",
    },
    books: {
      list: "/admin/books",
      detail: (id: number) => `/admin/books/${id}`,
      approve: (id: number) => `/admin/books/${id}/approve`,
      reject: (id: number) => `/admin/books/${id}/reject`,
      update: (id: number) => `/admin/books/${id}`,
      delete: (id: number) => `/admin/books/${id}`,
      restore: (id: number) => `/admin/books/${id}/restore`,
    },
    categories: {
      list: "/admin/categories",
      detail: (id: number) => `/admin/categories/${id}`,
      create: "/admin/categories",
      update: (id: number) => `/admin/categories/${id}`,
      delete: (id: number) => `/admin/categories/${id}`,
    },
    users: {
      list: "/admin/users",
      detail: (id: number) => `/admin/users/${id}`,
    },
  },
} as const;

export type ApiEndpoints = typeof API_CONFIG.endpoints;
