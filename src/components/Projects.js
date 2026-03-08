import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Github, X, ChevronLeft, ChevronRight, Filter, Calendar, Tag, Cpu, Loader2, AlertCircle } from "lucide-react";
import { useSupabaseData } from "../hooks/useSupabaseData";

const Counter = ({ target, duration = 2 }) => {
  const [count, setCount] = React.useState(0);
  const nodeRef = React.useRef(null);
  const isInView = useInView(nodeRef, { once: true });

  React.useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(target);
    if (isNaN(end)) return;
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = totalMiliseconds / end;

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration, isInView]);

  return <span ref={nodeRef}>{count}</span>;
};


const Projects = ({ mode = "full" }) => {
  const { t, language } = useLanguage();
  const { fetchProjects, isLoading, error } = useSupabaseData();
  const [projects, setProjects] = useState([]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [filters, setFilters] = useState({ year: "All", category: "All", tech: "All" });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProjects();
      setProjects(data || []);
    };
    loadData();
  }, [fetchProjects]);

  const years = ["All", ...new Set(projects.map(p => p.year).filter(Boolean))];
  const categories = ["All", ...new Set(projects.map(p => p.category).filter(Boolean))];
  const allTech = ["All", ...new Set(projects.flatMap(p => p.project_tech?.map(t => t.tech_name) || []))];

  const filteredProjects = projects.filter(project => {
    const pTechs = project.project_tech?.map(t => t.tech_name) || [];
    const matchYear = filters.year === "All" || project.year === filters.year;
    const matchCategory = filters.category === "All" || project.category === filters.category;
    const matchTech = filters.tech === "All" || pTechs.includes(filters.tech);
    return matchYear && matchCategory && matchTech;
  });

  const isPreview = mode === "preview";
  const displayedProjects = isPreview ? projects.slice(0, 3) : filteredProjects;

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

  if (error) {
    return (
      <section id="projects" className="py-24 bg-white dark:bg-gray-950 flex justify-center items-center">
        <div className="text-center text-red-500 flex flex-col items-center gap-3">
          <AlertCircle size={48} />
          <p className="text-xl font-semibold">Failed to load projects</p>
          <p className="text-sm opacity-80">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("projects.title")}</h2>
            <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full mb-6"></div>

            {/* Project Counter Animation */}
            {!isLoading && (
              <div className="inline-flex flex-col items-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800 mb-8">
                <span className="text-4xl md:text-5xl font-black text-indigo-600 dark:text-indigo-400">
                  <Counter target={projects.length} />
                </span>
                <span className="text-sm font-semibold text-indigo-800 dark:text-indigo-300 uppercase tracking-widest mt-1">
                  {t("projects.totalProjects")}
                </span>
              </div>
            )}

            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t("projects.subtitle")}</p>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-20 pb-40">
              <Loader2 className="animate-spin text-indigo-600" size={48} />
            </div>
          )}

          {/* Filters UI - Only visible in Full Mode */}
          <AnimatePresence>
            {!isPreview && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-wrap justify-center gap-4 mb-12 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-800"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1 flex items-center gap-1">
                    <Calendar size={12} /> {t("projects.year")}
                  </label>
                  <select
                    value={filters.year}
                    onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm"
                  >
                    {years.map(y => <option key={y} value={y}>{y === "All" ? t("projects.all") : y}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1 flex items-center gap-1">
                    <Tag size={12} /> {t("projects.category")}
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm"
                  >
                    {categories.map(c => <option key={c} value={c}>{c === "All" ? t("projects.all") : c}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1 flex items-center gap-1">
                    <Cpu size={12} /> {t("projects.tech")}
                  </label>
                  <select
                    value={filters.tech}
                    onChange={(e) => setFilters({ ...filters, tech: e.target.value })}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm"
                  >
                    {allTech.map(t_item => <option key={t_item} value={t_item}>{t_item === "All" ? t("projects.all") : t_item}</option>)}
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid Layout */}
          {!isLoading && (
            <motion.div layout className={`grid grid-cols-1 md:grid-cols-2 ${isPreview ? 'lg:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4'} gap-8`}>
              <AnimatePresence mode="popLayout">
                {displayedProjects.map((project) => {
                  const description = language === "id" ? project.description_id : project.description_en;
                  const pTechs = project.project_tech?.map(t => t.tech_name) || [];
                  const pMedia = project.project_media || [];

                  return (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -20 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => setSelectedProject({ ...project, description, pTechs, pMedia })}
                      className="bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    >
                      <div className="relative aspect-video group overflow-hidden bg-gray-200 dark:bg-gray-800">
                        {pMedia.length > 0 ? (
                          pMedia[0].media_type === "image" ? (
                            <img
                              src={pMedia.find(m => m.media_type === 'image')?.media_url || pMedia[0].media_url}
                              alt={project.title}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <video
                              src={pMedia[0].media_url}
                              muted loop playsInline
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          )
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">No Media</div>
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                          <div className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                            {t("projects.viewDetails")}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-2 gap-2">
                          <h3 className="text-xl font-bold">{project.title}</h3>
                          <div className="flex flex-col gap-1 items-end shrink-0">
                            {project.category && (
                              <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase rounded-full border border-indigo-100 dark:border-indigo-800">
                                {project.category}
                              </span>
                            )}
                            {project.year && (
                              <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase rounded-full">
                                {project.year}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow line-clamp-3">
                          {description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {pTechs.map((tech, i) => (
                            <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 text-xs font-medium rounded-md border border-indigo-100 dark:border-indigo-800/50">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-4 border-t border-gray-200 dark:border-gray-800 pt-4">
                          {project.frontend_repo && (
                            <a
                              href={project.frontend_repo}
                              onClick={(e) => e.stopPropagation()}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition"
                            >
                              <Github size={16} />
                              <span>{t("projects.frontend") || "Frontend Code"}</span>
                            </a>
                          )}
                          {project.backend_repo && (
                            <a
                              href={project.backend_repo}
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
              </AnimatePresence>
            </motion.div>
          )}

          {!isPreview && !isLoading && displayedProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-gray-50 dark:bg-gray-900/30 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800"
            >
              <div className="bg-gray-100 dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter size={24} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">No projects found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your filters to find what you're looking for.</p>
              <button
                onClick={() => setFilters({ year: "All", category: "All", tech: "All" })}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-600/20"
              >
                Reset Filters
              </button>
            </motion.div>
          )}

          {/* See All Button / Navigation */}
          {isPreview && !isLoading && (
            <motion.div variants={itemVariants} className="mt-16 text-center">
              <Link
                to="/project"
                className="px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold shadow-xl hover:shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all duration-300 inline-block"
              >
                {t("projects.seeAll")}
              </Link>
            </motion.div>
          )}
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
                <div className="w-full bg-gray-100 dark:bg-black flex justify-center items-center relative group min-h-[30vh]">
                  {selectedProject.pMedia && selectedProject.pMedia.length > 0 ? (
                    <>
                      {selectedProject.pMedia[currentMediaIndex].media_type === 'video' ? (
                        <video
                          src={selectedProject.pMedia[currentMediaIndex].media_url}
                          controls
                          className="w-full max-h-[55vh] object-contain"
                          autoPlay
                        />
                      ) : (
                        <img
                          src={selectedProject.pMedia[currentMediaIndex].media_url}
                          alt={selectedProject.title}
                          className="w-full max-h-[55vh] object-contain"
                        />
                      )}

                      {selectedProject.pMedia.length > 1 && (
                        <>
                          <button
                            onClick={(e) => { e.stopPropagation(); setCurrentMediaIndex(prev => prev === 0 ? selectedProject.pMedia.length - 1 : prev - 1); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ChevronLeft size={24} />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setCurrentMediaIndex(prev => prev === selectedProject.pMedia.length - 1 ? 0 : prev + 1); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ChevronRight size={24} />
                          </button>

                          {/* Indicators */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {selectedProject.pMedia.map((_, i) => (
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
                    <div className="flex items-center justify-center p-20 text-gray-500">No Media Available</div>
                  )}
                </div>

                <div className="p-6 md:p-10">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                        {selectedProject.title}
                      </h3>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedProject.pTechs.map((tech, i) => (
                          <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 text-sm font-semibold rounded-lg border border-indigo-100 dark:border-indigo-800/50">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8 whitespace-pre-line">
                        {selectedProject.description}
                      </p>
                    </div>

                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap items-center gap-4 pt-8 border-t border-gray-100 dark:border-gray-800">
                    {selectedProject.frontend_repo && (
                      <a
                        href={selectedProject.frontend_repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-medium transition"
                      >
                        <Github size={20} />
                        <span>{t("projects.frontend") || "Frontend Code"}</span>
                      </a>
                    )}
                    {selectedProject.backend_repo && (
                      <a
                        href={selectedProject.backend_repo}
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