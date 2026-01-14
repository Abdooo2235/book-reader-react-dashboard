import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { Book } from 'lucide-react';

export const AuthLayout = () => {
  const { isAuthenticated } = useAuthStore();

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left side - Branding */}
      <div className="hidden w-1/2 flex-col justify-between bg-primary p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground">
            <Book className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold text-primary-foreground">Book Reader</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-primary-foreground">
            Admin Dashboard
          </h1>
          <p className="text-lg text-primary-foreground/80">
            Manage your book collection, users, and categories all in one place.
          </p>
        </div>

        <p className="text-sm text-primary-foreground/60">
          © 2025 Book Reader. All rights reserved.
        </p>
      </div>

      {/* Right side - Auth forms */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Book className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Book Reader</span>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
