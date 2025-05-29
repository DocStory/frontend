import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

export type ThemeMode = 'light' | 'dark';

interface ThemeColors {
  primary: string;
  primaryHover: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  borderLight: string;
  shadow: string;
  overlay: string;
  success: string;
  error: string;
  warning: string;
  cardBackground: string;
  sidebarBackground: string;
  headerBackground: string;
  modalBackground: string;
  inputBackground: string;
  hoverBackground: string;
  activeBackground: string;
}

const lightTheme: ThemeColors = {
  primary: '#4285f4',
  primaryHover: '#3367d6',
  background: '#ffffff',
  surface: '#f8fafc',
  text: '#1e293b',
  textSecondary: '#64748b',
  border: '#e2e8f0',
  borderLight: '#f1f5f9',
  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.5)',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  cardBackground: '#ffffff',
  sidebarBackground: '#ffffff',
  headerBackground: '#ffffff',
  modalBackground: '#ffffff',
  inputBackground: '#ffffff',
  hoverBackground: '#f8fafc',
  activeBackground: '#f0f7ff',
};

const darkTheme: ThemeColors = {
  primary: '#4285f4',
  primaryHover: '#5b9fff',
  background: '#0f172a',
  surface: '#1e293b',
  text: '#f8fafc',
  textSecondary: '#94a3b8',
  border: '#334155',
  borderLight: '#475569',
  shadow: 'rgba(0, 0, 0, 0.25)',
  overlay: 'rgba(0, 0, 0, 0.7)',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  cardBackground: '#1e293b',
  sidebarBackground: '#1e293b',
  headerBackground: '#1e293b',
  modalBackground: '#1e293b',
  inputBackground: '#334155',
  hoverBackground: '#334155',
  activeBackground: '#1e40af',
};

interface ThemeContextType {
  mode: ThemeMode;
  theme: ThemeColors;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    return savedTheme || 'light';
  });

  const theme = mode === 'light' ? lightTheme : darkTheme;

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  };

  const setTheme = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  useEffect(() => {
    localStorage.setItem('theme', mode);
    document.body.setAttribute('data-theme', mode);
  }, [mode]);

  const value = {
    mode,
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 