import React, { useContext, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { ThemeContext } from "../context/ThemeContext";
import * as THREE from "three";
import WAVES from "vanta/dist/vanta.waves.min";

const Hero = () => {
  const { t } = useLanguage();
  const { isDarkMode } = useContext(ThemeContext);
  const vantaRef = useRef(null);

  useEffect(() => {
    // Vanta needs THREE on window to work correctly with version 0.121.0
    window.THREE = THREE;

    let vantaEffect = null;
    if (vantaRef.current) {
      try {
        vantaEffect = WAVES({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: isDarkMode ? 0x1e1b4b : 0x818cf8, // Indigo-950 / Indigo-400
          shininess: 30,
          waveHeight: 15,
          waveSpeed: 0.8,
          backgroundColor: isDarkMode ? 0x030712 : 0xffffff,
        });
      } catch (err) {
        console.error("Vanta initialization failed:", err);
      }
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [isDarkMode]); // Re-init on theme change for best color results

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <section id="hero" className="min-h-screen relative flex items-center justify-center pt-20 px-6 overflow-hidden transition-colors duration-500 bg-white dark:bg-gray-950">
      {/* Vanta Background Layer */}
      <div ref={vantaRef} className="absolute inset-0 z-0"></div>

      {/* Subtle Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-white/20 dark:bg-gray-950/30 z-[1] pointer-events-none transition-colors duration-500"></div>

      <motion.div
        className="max-w-4xl mx-auto text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={itemVariants} className="text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase text-sm mb-4">
          {t("hero.greeting")}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight"
        >
          Fhira Triana Maulani
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-6"
        >
          {t("hero.role")}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t("hero.description")}
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
          >
            {t("hero.cta")}
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-gray-900 dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 font-medium rounded-full shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto"
          >
            {t("nav.contact")}
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
