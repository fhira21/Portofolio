import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update active section based on scroll position
      const sections = ["home", "about", "skills", "projects", "experience", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg" 
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center"
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            MyPortfolio
          </h1>
        </motion.div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-300 font-medium">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-2 transition-colors duration-300 ${
                  activeSection === item.id
                    ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                    : "hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col space-y-1.5 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-gray-800 dark:bg-white block"
          />
          <motion.span
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-gray-800 dark:bg-white block"
          />
          <motion.span
            animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-gray-800 dark:bg-white block"
          />
        </button>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed md:hidden inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md flex items-center justify-center"
          style={{ display: isMobileMenuOpen ? "flex" : "none" }}
        >
          <ul className="flex flex-col space-y-8 text-center">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`text-2xl font-medium transition-colors duration-300 ${
                    activeSection === item.id
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-800 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;