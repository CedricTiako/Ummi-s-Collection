import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getTheme, setTheme, Theme } from '../lib/theme';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setCurrentTheme] = useState<Theme>(getTheme());

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<Theme>;
      setCurrentTheme(customEvent.detail);
    };

    window.addEventListener('themeChange', handleThemeChange);

    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const value = {
    theme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}