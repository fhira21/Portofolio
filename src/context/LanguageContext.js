import React, { createContext, useState, useEffect, useContext } from "react";
import { translations } from "../data/translations";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(
        localStorage.getItem("language") || "id"
    );

    useEffect(() => {
        localStorage.setItem("language", language);
        document.documentElement.lang = language;
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "id" ? "en" : "id"));
    };

    const t = (key) => {
        const keys = key.split(".");
        let value = translations[language];
        for (const k of keys) {
            if (value[k] === undefined) return key;
            value = value[k];
        }
        return value;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
