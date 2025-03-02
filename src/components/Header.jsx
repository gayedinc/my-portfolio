import { useState } from "react";
import { getRoutes } from "../helper";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTheme } from "./ThemeContext"; // tema için olan provider
import { MoonSvg, SunSvg } from "../Svg";
import "../assets/css/darkMode.css";

export default function Header() {
  const { t } = useTranslation(); // Çeviri hooku
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme(); // Tema durumu

  function hamburgerMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="header">
      <div className="header-mobile">
        <h1>Gaye Dinç</h1>
        <LanguageSwitcher />
        <div className="hamburger-menu">
          <img
            src="/img/hamburger-menu-icon.svg"
            alt="Hamburger Menu"
            onClick={hamburgerMenu}
            className={isMenuOpen ? "hamburger-icon-none" : ""}
          />
        </div>
      </div>
      <div onClick={hamburgerMenu} className={`hamburger-menu-overlay ${isMenuOpen ? "block" : "none"}`}>
        <div onClick={(e) => e.stopPropagation()} className={`hamburger-menu-content ${isMenuOpen ? "block" : "none"}`}>
          <div className="menu-header">
            <img
              src="/img/hamburger-menu-close-icon.svg"
              alt="Hamburger Menu Close"
              onClick={hamburgerMenu}
            />
            <h1>Gaye Dinç</h1>
          </div>
          <nav className="nav-hamburger">
            <ul>
              {getRoutes().map((route) => (
                <li key={route.url}>
                  <a href={`#${route.url}`} onClick={() => setIsMenuOpen(false)}>
                    {t(route.titleKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="theme-section">
            <label className="theme-switch">
              <SunSvg />
              <input
                className="switch"
                name="theme-switch"
                type="checkbox"
                defaultChecked={theme === "dark-mode"}
                onChange={toggleTheme}
              />
              <MoonSvg />
            </label>
          </div>
        </div>
      </div>
      <nav className="nav-desktop">
        <h1>Gaye Dinç</h1>
        <div className="nav-adres">
          <ul>
            {getRoutes().map((route) => (
              <li key={route.url}>
                <a href={`#${route.url}`} onClick={() => setIsMenuOpen(false)}>
                  {t(route.titleKey)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="button-area">
          <LanguageSwitcher />
          <div className="theme-section">
            <label className="theme-switch">
              <SunSvg />
              <input
                className="switch"
                name="theme-switch"
                type="checkbox"
                defaultChecked={theme === "dark-mode"}
                onChange={toggleTheme}
              />
              <MoonSvg />
            </label>
          </div>
        </div>
      </nav>
    </header>
  );
}
