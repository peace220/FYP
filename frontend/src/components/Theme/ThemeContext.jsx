import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'default';
  });
  const [contrast, setContrast] = useState(() => {
    return localStorage.getItem('contrast') || 'normal';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('contrast', contrast);
  }, [theme, contrast]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, contrast, setContrast }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);