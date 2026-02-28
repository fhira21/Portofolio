import React, { useState } from "react";
import portfolioData from "../data/portofolioData";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Play, X, ChevronLeft, ChevronRight } from "lucide-react";

const Projects = () => {
  const { projects } = portfolioData;
  const { t, language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  React.useEffect(() => {
    if (selectedProject) {
      setCurrentMediaIndex(0);
    }
  }, [selectedProject]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="projects" className="py-24 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("projects.title")}</h2>
            <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">{t("projects.subtitle")}</p>
          </motion.div>

          {/* Grid Layout (Replaces Carousel for Simpler, Cleaner viewing) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const description = language === "id" ? project.descriptionId : project.descriptionEn;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  onClick={() => setSelectedProject(project)}
                  className="bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                >
                  <div className="relative aspect-video group overflow-hidden">
                    <img
                      src={project.media?.find(m => m.type === 'image')?.url || project.media?.[0]?.url || project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <div className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                        {t("projects.viewDetails")}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow line-clamp-3">
                      {description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 text-xs font-medium rounded-md border border-indigo-100 dark:border-indigo-800/50">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4 border-t border-gray-200 dark:border-gray-800 pt-4">
                      {project.Frontend && project.Frontend !== "-" && (
                        <a
                          href={project.Frontend}
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition"
                        >
                          <Github size={16} />
                          <span>{t("projects.frontend") || "Frontend Code"}</span>
                        </a>
                      )}
                      {project.Backend && project.Backend !== "-" && (
                        <a
                          href={project.Backend}
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition"
                        >
                          <Github size={16} />
                          <span>{t("projects.backend") || "Backend Code"}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-gray-950 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition"
              >
                <X size={24} />
              </button>

              <div className="overflow-y-auto w-full flex-grow custom-scrollbar">
                {/* Media area */}
                <div className="w-full bg-gray-100 dark:bg-black flex justify-center items-center relative group">
                  {selectedProject.media && selectedProject.media.length > 0 ? (
                    <>
                      {selectedProject.media[currentMediaIndex].type === 'video' ? (
                        <video
                          src={selectedProject.media[currentMediaIndex].url}
                          controls
                          className="w-full max-h-[55vh] object-contain"
                          autoPlay
                        />
                      ) : (
                        <img
                          src={selectedProject.media[currentMediaIndex].url}
                          alt={selectedProject.title}
                          className="w-full max-h-[55vh] object-contain"
                        />
                      )}

                      {selectedProject.media.length > 1 && (
                        <>
                          <button
                            onClick={(e) => { e.stopPropagation(); setCurrentMediaIndex(prev => prev === 0 ? selectedProject.media.length - 1 : prev - 1); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ChevronLeft size={24} />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setCurrentMediaIndex(prev => prev === selectedProject.media.length - 1 ? 0 : prev + 1); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ChevronRight size={24} />
                          </button>

                          {/* Indicators */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {selectedProject.media.map((_, i) => (
                              <button
                                key={i}
                                onClick={(e) => { e.stopPropagation(); setCurrentMediaIndex(i); }}
                                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === currentMediaIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full max-h-[55vh] object-contain"
                    />
                  )}
                </div>

                <div className="p-6 md:p-10">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                        {selectedProject.title}
                      </h3>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedProject.tech.map((tech, i) => (
                          <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 text-sm font-semibold rounded-lg border border-indigo-100 dark:border-indigo-800/50">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8 whitespace-pre-line">
                        {language === "id" ? selectedProject.descriptionId : selectedProject.descriptionEn}
                      </p>
                    </div>

                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap items-center gap-4 pt-8 border-t border-gray-100 dark:border-gray-800">
                    {selectedProject.Frontend && selectedProject.Frontend !== "-" && (
                      <a
                        href={selectedProject.Frontend}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-medium transition"
                      >
                        <Github size={20} />
                        <span>{t("projects.frontend") || "Frontend Code"}</span>
                      </a>
                    )}
                    {selectedProject.Backend && selectedProject.Backend !== "-" && (
                      <a
                        href={selectedProject.Backend}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-medium transition"
                      >
                        <Github size={20} />
                        <span>{t("projects.backend") || "Backend Code"}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;