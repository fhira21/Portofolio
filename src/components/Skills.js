import React from "react";
import portfolioData from "../data/portofolioData";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";

const Skills = () => {
  const { t } = useLanguage();
  const { skills } = portfolioData;

  const getLevelPercentage = (level) => {
    switch (level.toLowerCase()) {
      case 'expert': return 95;
      case 'advanced': return 85;
      case 'intermediate': return 70;
      case 'beginner': return 50;
      case 'novice': return 30;
      default: return parseInt(level) || 60;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="skills" className="py-24 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("skills.title")}</h2>
            <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">{t("skills.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">{skill.name}</h3>
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 capitalize">
                    {skill.level}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 mb-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${getLevelPercentage(skill.level)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                    className="h-full rounded-full bg-indigo-500"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Skills;