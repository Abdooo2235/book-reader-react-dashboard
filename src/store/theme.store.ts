import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  THEMES,
  getThemeByName,
  type ThemeDefinition,
} from "@/config/themes.config";

interface ThemeStore {
  theme: string;
  themeDefinition: ThemeDefinition | undefined;

  // Actions
  setTheme: (themeName: string) => void;
  getThemeType: () => "light" | "dark";
  toggleDarkMode: () => void;
}

// Apply theme to document
const applyTheme = (themeDef: ThemeDefinition | undefined) => {
  if (!themeDef) return;

  const root = document.documentElement;

  // Set data-theme attribute
  root.setAttribute("data-theme", themeDef.name);

  // Toggle dark class for Tailwind dark mode
  if (themeDef.type === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  // Apply CSS variables
  const { colors } = themeDef;
  root.style.setProperty("--background", colors.background);
  root.style.setProperty("--foreground", colors.foreground);
  root.style.setProperty("--card", colors.card);
  root.style.setProperty("--card-foreground", colors.cardForeground);
  root.style.setProperty("--popover", colors.popover);
  root.style.setProperty("--popover-foreground", colors.popoverForeground);
  root.style.setProperty("--primary", colors.primary);
  root.style.setProperty("--primary-foreground", colors.primaryForeground);
  root.style.setProperty("--secondary", colors.secondary);
  root.style.setProperty("--secondary-foreground", colors.secondaryForeground);
  root.style.setProperty("--muted", colors.muted);
  root.style.setProperty("--muted-foreground", colors.mutedForeground);
  root.style.setProperty("--accent", colors.accent);
  root.style.setProperty("--accent-foreground", colors.accentForeground);
  root.style.setProperty("--destructive", colors.destructive);
  root.style.setProperty("--border", colors.border);
  root.style.setProperty("--input", colors.input);
  root.style.setProperty("--ring", colors.ring);
  root.style.setProperty("--sidebar", colors.sidebar);
  root.style.setProperty("--sidebar-foreground", colors.sidebarForeground);
  root.style.setProperty("--sidebar-primary", colors.sidebarPrimary);
  root.style.setProperty(
    "--sidebar-primary-foreground",
    colors.sidebarPrimaryForeground
  );
  root.style.setProperty("--sidebar-accent", colors.sidebarAccent);
  root.style.setProperty(
    "--sidebar-accent-foreground",
    colors.sidebarAccentForeground
  );
  root.style.setProperty("--sidebar-border", colors.sidebarBorder);
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "light",
      themeDefinition: getThemeByName("light"),

      setTheme: (themeName: string) => {
        const themeDef = getThemeByName(themeName);
        if (themeDef) {
          applyTheme(themeDef);
          set({ theme: themeName, themeDefinition: themeDef });
        }
      },

      getThemeType: () => {
        const { themeDefinition } = get();
        return themeDefinition?.type ?? "light";
      },

      toggleDarkMode: () => {
        const { themeDefinition } = get();
        if (!themeDefinition) return;

        // Find a theme of the opposite type
        const targetType = themeDefinition.type === "light" ? "dark" : "light";
        const targetTheme = THEMES.find((t) => t.type === targetType);

        if (targetTheme) {
          applyTheme(targetTheme);
          set({ theme: targetTheme.name, themeDefinition: targetTheme });
        }
      },
    }),
    {
      name: "theme-storage",
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        // Apply theme on rehydration
        if (state?.theme) {
          const themeDef = getThemeByName(state.theme);
          if (themeDef) {
            applyTheme(themeDef);
            state.themeDefinition = themeDef;
          }
        }
      },
    }
  )
);

// Initialize theme on app load
export const initializeTheme = () => {
  const state = useThemeStore.getState();
  const themeDef = getThemeByName(state.theme);
  if (themeDef) {
    applyTheme(themeDef);
  }
};
