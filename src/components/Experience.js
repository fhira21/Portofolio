import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import { useSupabaseData } from "../hooks/useSupabaseData";

const Experience = () => {
  const { t, language } = useLanguage();
  const { fetchExperience, isLoading, error } = useSupabaseData();
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchExperience();
      setExperience(data || []);
    };
    loadData();
  }, [fetchExperience]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  if (error) {
    console.error("Experience Component Error:", error);
    return (
      <section id="experience" className="py-24 bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <div className="text-center text-red-500 flex flex-col items-center gap-3">
          <AlertCircle size={48} />
          <p className="text-xl font-semibold">Failed to load experience</p>
          <p className="text-sm opacity-80">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-24 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("experience.title")}</h2>
            <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">{t("experience.subtitle")}</p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-indigo-600" size={48} />
            </div>
          ) : (
            <div className="space-y-12">
              {experience.map((exp, index) => {
                const period = language === "id" ? exp.period_id : exp.period_en;
                const details = exp.experience_details?.map(d => language === "id" ? d.detail_id : d.detail_en) || [];

                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative pl-8 md:pl-0"
                  >
                    <div className="md:grid flex flex-col items-start md:grid-cols-5 md:gap-8">
                      {/* Timeline Line (Mobile) */}
                      <div className="absolute left-0 top-2 bottom-0 w-px bg-gray-200 dark:bg-gray-800 md:hidden"></div>
                      {/* Timeline Dot (Mobile) */}
                      <div className="absolute left-[-4px] top-2.5 w-2 h-2 rounded-full bg-indigo-600 ring-4 ring-gray-50 dark:ring-gray-900 md:hidden"></div>

                      {/* Period Column */}
                      <div className="md:col-span-1 md:text-right pt-1 mb-2 md:mb-0">
                        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                          {period}
                        </span>
                      </div>

                      {/* Content Column */}
                      <div className="md:col-span-4 relative">
                        {/* Timeline Line (Desktop) */}
                        <div className="hidden md:block absolute -left-[2.1rem] top-2 bottom-0 w-px bg-gray-200 dark:bg-gray-800"></div>
                        {/* Timeline Dot (Desktop) */}
                        <div className="hidden md:block absolute -left-[2.35rem] top-2.5 w-2.5 h-2.5 rounded-full bg-indigo-600 ring-4 ring-gray-50 dark:ring-gray-900"></div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                          <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                          <p className="text-gray-600 dark:text-gray-400 font-medium mb-4">{exp.company}</p>
                          <ul className="space-y-2 mt-4">
                            {details.map((detail, idx) => (
                              <li key={idx} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                                <span className="mr-3 text-indigo-500 mt-1">•</span>
                                <span className="leading-relaxed">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;