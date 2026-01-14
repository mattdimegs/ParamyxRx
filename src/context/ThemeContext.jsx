/**
 * ThemeContext - Manages app theme (light/dark mode)
 * @format
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('auto'); // 'auto', 'light', 'dark'

  // Determine active theme based on mode
  const getActiveTheme = () => {
    if (themeMode === 'auto') {
      return systemColorScheme === 'dark' ? 'dark' : 'light';
    }
    return themeMode;
  };

  const activeTheme = getActiveTheme();

  // iOS-native color palettes
  const colors = {
    light: {
      // Background colors
      background: '#FFFFFF',
      secondaryBackground: '#F2F2F7',
      tertiaryBackground: '#FFFFFF',
      groupedBackground: '#F2F2F7',
      
      // Text colors
      text: '#000000',
      secondaryText: '#3C3C43',
      tertiaryText: '#3C3C43',
      placeholderText: '#C7C7CC',
      
      // UI element colors
      separator: '#C6C6C8',
      border: '#E5E5EA',
      
      // Interactive colors
      primary: '#FF6B35', // Fire orange
      tint: '#007AFF', // iOS blue
      destructive: '#FF3B30',
      
      // Card/surface
      card: '#FFFFFF',
      cardBorder: '#E5E5EA',
      
      // System colors
      systemGray: '#8E8E93',
      systemGray2: '#AEAEB2',
      systemGray3: '#C7C7CC',
      systemGray4: '#D1D1D6',
      systemGray5: '#E5E5EA',
      systemGray6: '#F2F2F7',
    },
    dark: {
      // Background colors
      background: '#000000',
      secondaryBackground: '#1C1C1E',
      tertiaryBackground: '#2C2C2E',
      groupedBackground: '#000000',
      
      // Text colors
      text: '#FFFFFF',
      secondaryText: '#EBEBF5',
      tertiaryText: '#EBEBF5',
      placeholderText: '#545458',
      
      // UI element colors
      separator: '#38383A',
      border: '#38383A',
      
      // Interactive colors
      primary: '#FF6B35', // Fire orange
      tint: '#0A84FF', // iOS blue (dark mode)
      destructive: '#FF453A',
      
      // Card/surface
      card: '#1C1C1E',
      cardBorder: '#2C2C2E',
      
      // System colors
      systemGray: '#8E8E93',
      systemGray2: '#636366',
      systemGray3: '#48484A',
      systemGray4: '#3A3A3C',
      systemGray5: '#2C2C2E',
      systemGray6: '#1C1C1E',
    },
  };

  const theme = {
    mode: themeMode,
    activeTheme,
    colors: colors[activeTheme],
    setThemeMode,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
