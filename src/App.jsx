import { createContext, useState, useEffect } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./i18n";
import Header from "./components/Header";
import { getPage } from "./helper";
import { ThemeProvider } from "./components/ThemeContext"; // tema için olan provider
import { Toaster } from "react-hot-toast";

export const PageContext = createContext(null);

export function getUrlParam() {
  const parts = location.hash.substring(1).split('/');
  return parts.length > 1 ? parts[1] : null;
}

function App() {
  const [url, setUrl] = useState(location.hash.substring(1) || "/");
  const [theme, setTheme] = useState(localStorage.theme || getSystemThemePref());
  const [language, setLanguage] = useState(i18n.language);
  const { t } = useTranslation();

  function getSystemThemePref() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-mode' : 'light';
  }

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  function handleChangeTheme(e) {
    const changedTheme = e.target.checked ? 'dark-mode' : 'light';
    setTheme(changedTheme);
    localStorage.theme = changedTheme;
  }

  function changeLanguage(lang) {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  }

  useEffect(() => {
    window.addEventListener("hashchange", () => {
      setUrl(location.hash.substring(1));
    });
  }, []);

  const page = getPage(url);

  return (
    <ThemeProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <I18nextProvider i18n={i18n}>
        <PageContext.Provider value={{ page, handleChangeTheme, theme, changeLanguage, language }}>
          <Header />
          <div className="container">
            <div className="page-component">{page.component}</div>
          </div>
        </PageContext.Provider>
      </I18nextProvider>
    </ThemeProvider>
  );
}

export default App;