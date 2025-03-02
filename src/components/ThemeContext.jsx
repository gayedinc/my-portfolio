import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const { t } = useTranslation(); // Çeviri hooku

  function getSystemThemePref() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-mode' : 'light';
  }

  const [theme, setTheme] = useState(localStorage.theme || getSystemThemePref());

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  function toggleTheme(e) {
    const changedTheme = e.target.checked ? 'dark-mode' : 'light';
    setTheme(changedTheme);
    localStorage.theme = changedTheme;
    toast.success(t("theme-changed"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
};