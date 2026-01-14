import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NAVIGATION_CONFIG, LOGOUT_ITEM } from '@/config/navigation.config';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Book } from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Logo / Brand */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
          <Book className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-sidebar-foreground">Book Reader</span>
          <span className="text-xs text-sidebar-foreground/60">Admin Dashboard</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-4">
        {NAVIGATION_CONFIG.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-4">
            {section.title && (
              <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50">
                {section.title}
              </p>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User Info & Logout */}
      <div className="border-t border-sidebar-border p-4">
        <div className="mb-3 flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
            {user?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              {user?.name || 'Admin'}
            </p>
            <p className="truncate text-xs text-sidebar-foreground/60">
              {user?.email || 'admin@example.com'}
            </p>
          </div>
        </div>
        <Separator className="my-2 bg-sidebar-border" />
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          onClick={handleLogout}
        >
          <LOGOUT_ITEM.icon className="h-4 w-4" />
          {LOGOUT_ITEM.title}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
