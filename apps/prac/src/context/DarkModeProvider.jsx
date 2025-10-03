import { useState } from 'react';
import { DarkModeContext } from './DarkModeContext';

export function DarkModeProvider({ children, initialDarkMode = true }) {
  const [darkMode, setDarkMode] = useState(initialDarkMode);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
}
