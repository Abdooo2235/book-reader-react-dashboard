import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AdminLayout, AuthLayout } from '@/layouts';
import { ProtectedRoute } from '@/components/common';

// Pages
import LoginPage from '@/pages/auth/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import BooksPage from '@/pages/BooksPage';
import BookDetailPage from '@/pages/BookDetailPage';
import CategoriesPage from '@/pages/CategoriesPage';
import UsersPage from '@/pages/UsersPage';
import SettingsPage from '@/pages/SettingsPage';

const router = createBrowserRouter([
  // Auth routes
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },

  // Protected admin routes
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'books',
        element: <BooksPage />,
      },
      {
        path: 'books/:id',
        element: <BookDetailPage />,
      },
      {
        path: 'categories',
        element: <CategoriesPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
