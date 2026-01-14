import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeStore } from '@/store/theme.store';

export const Header = () => {
  const { themeDefinition, toggleDarkMode } = useThemeStore();
  const isDark = themeDefinition?.type === 'dark';

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      {/* Left side - Page title could go here */}
      <div>
        <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
      </div>

      {/* Right side - Theme toggle and user actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="h-9 w-9"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-foreground" />
          ) : (
            <Moon className="h-5 w-5 text-foreground" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
