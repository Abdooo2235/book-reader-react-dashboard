import { Check, Moon, Sun, Palette } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useThemeStore } from '@/store/theme.store';
import { THEMES, getLightThemes, getDarkThemes } from '@/config/themes.config';
import { cn } from '@/lib/utils';

const SettingsPage = () => {
  const { theme, themeDefinition, setTheme, toggleDarkMode } = useThemeStore();
  const isDark = themeDefinition?.type === 'dark';

  const lightThemes = getLightThemes();
  const darkThemes = getDarkThemes();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Customize your dashboard appearance</p>
      </div>

      {/* Quick Toggle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            Appearance Mode
          </CardTitle>
          <CardDescription>
            Quickly switch between light and dark mode
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button
              variant={!isDark ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => !isDark || toggleDarkMode()}
            >
              <Sun className="mr-2 h-4 w-4" />
              Light
            </Button>
            <Button
              variant={isDark ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => isDark || toggleDarkMode()}
            >
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Theme Gallery */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme Gallery
          </CardTitle>
          <CardDescription>
            Choose from {THEMES.length} beautiful themes to personalize your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Light Themes */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Sun className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Light Themes</h3>
              <span className="text-sm text-muted-foreground">({lightThemes.length})</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {lightThemes.map((t) => (
                <ThemeCard
                  key={t.name}
                  themeDef={t}
                  isActive={theme === t.name}
                  onClick={() => setTheme(t.name)}
                />
              ))}
            </div>
          </div>

          <Separator />

          {/* Dark Themes */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Moon className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Dark Themes</h3>
              <span className="text-sm text-muted-foreground">({darkThemes.length})</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {darkThemes.map((t) => (
                <ThemeCard
                  key={t.name}
                  themeDef={t}
                  isActive={theme === t.name}
                  onClick={() => setTheme(t.name)}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Theme Info */}
      <Card>
        <CardHeader>
          <CardTitle>Current Theme</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div
              className="h-16 w-16 rounded-lg border-2 border-border"
              style={{ background: themeDefinition?.colors.primary }}
            />
            <div>
              <p className="text-lg font-medium capitalize">{themeDefinition?.label}</p>
              <p className="text-sm text-muted-foreground capitalize">
                {themeDefinition?.type} theme
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface ThemeCardProps {
  themeDef: (typeof THEMES)[number];
  isActive: boolean;
  onClick: () => void;
}

const ThemeCard = ({ themeDef, isActive, onClick }: ThemeCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-lg border-2 transition-all',
        isActive
          ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background'
          : 'border-border hover:border-primary/50'
      )}
    >
      {/* Theme Preview */}
      <div className="flex h-20 w-full">
        {/* Sidebar preview */}
        <div
          className="w-1/4"
          style={{ background: themeDef.colors.sidebar }}
        >
          <div
            className="m-1 h-2 w-3/4 rounded"
            style={{ background: themeDef.colors.sidebarPrimary }}
          />
        </div>
        {/* Main area preview */}
        <div
          className="flex-1 p-2"
          style={{ background: themeDef.colors.background }}
        >
          <div
            className="mb-1 h-3 w-full rounded"
            style={{ background: themeDef.colors.card }}
          />
          <div
            className="h-2 w-2/3 rounded"
            style={{ background: themeDef.colors.primary }}
          />
        </div>
      </div>

      {/* Theme Label */}
      <div
        className="flex items-center justify-between px-2 py-1.5"
        style={{ background: themeDef.colors.card }}
      >
        <span
          className="text-xs font-medium"
          style={{ color: themeDef.colors.foreground }}
        >
          {themeDef.label}
        </span>
        {isActive && (
          <Check className="h-3 w-3 text-primary" />
        )}
      </div>
    </button>
  );
};

export default SettingsPage;
