import React from "react";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-8 bg-gray-50 dark:bg-gray-950 text-gray-500 dark:text-gray-400 text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} Fhira Triana Maulani. {t("footer.rights") || "All rights reserved."}
      </p>
    </footer>
  );
};

export default Footer;
