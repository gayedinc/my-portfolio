import { useState, useContext } from "react";
import { PageContext } from "../App";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { changeLanguage } = useContext(PageContext);
  const [isOpen, setIsOpen] = useState(false); // Dropdown menünün açılma durumunu tutar
  const [selectedLanguage, setSelectedLanguage] = useState("TR - Türkçe"); // Seçilen dili tutar
  const { t } = useTranslation(); // Çeviri hooku

  const toggleDropdown = () => setIsOpen(!isOpen); // Dropdown menüsünü açıp kapamak için

  const handleLanguageChange = (languageCode, languageName) => {
    setSelectedLanguage(languageName); // Seçilen dili güncelle
    changeLanguage(languageCode); // Dil değişikliğini uygula
    setIsOpen(false); // Menü kapalı hale gelsin
    toast.success(t("language_changed"));
  };

  return (
    <div className="language-switcher">
      <div className="dropdown" onClick={toggleDropdown}>
        <span>{selectedLanguage}</span>
        <div className={`dropdown-menu ${isOpen ? "open" : ""}`}>
          <div
            className="dropdown-item"
            onClick={() => handleLanguageChange("tr", "TR - Türkçe")}
          >
            Türkçe
          </div>
          <div
            className="dropdown-item"
            onClick={() => handleLanguageChange("en", "EN - English")}
          >
            English
          </div>
          <div
            className="dropdown-item"
            onClick={() => handleLanguageChange("de", "DE - German")}
          >
            German
          </div>
        </div>
      </div>
    </div>
  );
}

export default LanguageSwitcher;
