import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { App, ConfigProvider, theme } from "antd";
import type { ThemeMode, ThemeContextValue } from "../types/post";

const THEME_KEY = "vite-speckit-theme";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem(THEME_KEY);
    return (stored as ThemeMode) || "light";
  });

  useEffect(() => {
    localStorage.setItem(THEME_KEY, themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value: ThemeContextValue = {
    theme: themeMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider
        theme={{
          algorithm:
            themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <App>{children}</App>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
