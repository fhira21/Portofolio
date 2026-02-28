import React from "react";
import portfolioData from "../data/portofolioData";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import { FaDownload, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
import ElectricBorder from "./ElectricBorder";

const About = () => {
  const { t, language } = useLanguage();
  const { name, role, profileImage, personalInfo, interestsEn, interestsId, resume } = portfolioData.about;

  // Function to get icon based on label id
  const getIcon = (id) => {
    switch (id) {
      case 'email': return <FaEnvelope className="text-indigo-500" />;
      case 'location': return <FaMapMarkerAlt className="text-indigo-500" />;
      case 'age': return <FaCalendarAlt className="text-indigo-500" />;
      default: return <FaUser className="text-indigo-500" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const interestsToDisplay = language === "id" ? interestsId : interestsEn;

  return (
    <section id="about" className="py-24 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("about.title")}</h2>
            <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Profile Image Column */}
            <motion.div variants={itemVariants} className="lg:col-span-5 flex justify-center">
              <ElectricBorder color="#4f46e5" borderRadius={16} speed={0.2} chaos={0.08} className="w-72 md:w-80 p-1">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={profileImage}
                    alt={name}
                    className="w-full h-full object-cover transform transition duration-500 hover:scale-105"
                  />
                </div>
              </ElectricBorder>
            </motion.div>

            {/* Info Column */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div variants={itemVariants}>
                <h3 className="text-3xl font-bold mb-2">{name}</h3>
                <p className="text-xl text-indigo-600 dark:text-indigo-400 font-medium mb-6">{role}</p>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed border-l-4 border-indigo-600 pl-4">
                  {t("about.description")}
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  {t("about.personalInfo")}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {personalInfo.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 transition-colors hover:border-indigo-200 dark:hover:border-indigo-800">
                      <div className="flex-shrink-0 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
                        {getIcon(item.id)}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          {language === "id" ? item.labelId : item.labelEn}
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
                          {item.value || (language === "id" ? item.valueId : item.valueEn)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h4 className="text-xl font-semibold mb-4">{t("about.interests")}</h4>
                <div className="flex flex-wrap gap-2">
                  {interestsToDisplay.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 text-sm rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 font-medium border border-indigo-100 dark:border-indigo-800/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-4">
                <a
                  href={resume}
                  download="CV_Fhira_Triana_Maulani.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 px-8 py-3 rounded-full font-medium transition-colors shadow-md"
                >
                  <FaDownload />
                  <span>{t("about.downloadCv")}</span>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;