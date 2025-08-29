import React, { useState, useEffect, useRef } from "react";
import portfolioData from "../data/portofolioData";

const Projects = () => {
  const { projects } = portfolioData;
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const carouselRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('projects');
      if (element) {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    // Handle responsive items to show
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleScroll();
    handleResize();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const nextSlide = () => {
    if (currentIndex < projects.length - itemsToShow) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Calculate visible projects
  const visibleProjects = projects.slice(currentIndex, currentIndex + itemsToShow);

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl font-bold mb-2 text-center text-gray-800 dark:text-white">
            Projects
          </h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto mb-12 rounded-full"></div>
          
          <div className="relative">
            {/* Navigation Arrows */}
            {projects.length > itemsToShow && (
              <>
                <button
                  onClick={prevSlide}
                  disabled={currentIndex === 0}
                  className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 ${
                    currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:scale-110'
                  }`}
                  aria-label="Previous projects"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextSlide}
                  disabled={currentIndex >= projects.length - itemsToShow}
                  className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 ${
                    currentIndex >= projects.length - itemsToShow ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:scale-110'
                  }`}
                  aria-label="Next projects"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            
            {/* Projects Carousel */}
            <div 
              ref={carouselRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-transform duration-500"
            >
              {visibleProjects.map((project, index) => (
                <div
                  key={currentIndex + index}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex space-x-4">
                        {project.Frontend && (
                          <a
                            href={project.Frontend}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-colors duration-300"
                            title="Frontend Code"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                          </a>
                        )}
                        {project.Backend && (
                          <a
                            href={project.Backend}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-colors duration-300"
                            title="Backend Code"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                            </svg>
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-colors duration-300"
                            title="Live Demo"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((t, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 px-2 py-1 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    {/* Project Links */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex space-x-4">
                        {project.Frontend && (
                          <a
                            href={project.Frontend}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-300 flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                            Frontend
                          </a>
                        )}
                        {project.Backend && (
                          <a
                            href={project.Backend}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-300 flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                            </svg>
                            Backend
                          </a>
                        )}
                      </div>
                      
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-full hover:bg-indigo-700 transition-colors duration-300 flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            {projects.length > itemsToShow && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: Math.ceil(projects.length / itemsToShow) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index * itemsToShow)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentIndex >= index * itemsToShow && currentIndex < (index + 1) * itemsToShow
                        ? 'bg-indigo-600 scale-125'
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-indigo-400'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;