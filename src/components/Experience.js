import React, { useState, useEffect } from "react";
import portfolioData from "../data/portofolioData";

const Experience = () => {
  const { experience } = portfolioData;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('experience');
      if (element) {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl font-bold mb-2 text-center text-gray-800 dark:text-white">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto mb-12 rounded-full"></div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 h-full w-1 bg-indigo-200 dark:bg-indigo-800 transform -translate-x-1/2"></div>
            
            <div className="space-y-12">
              {experience.map((exp, index) => (
                <div 
                  key={index}
                  className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 top-6 w-5 h-5 rounded-full bg-indigo-500 border-4 border-white dark:border-gray-800 transform -translate-x-1/2 z-10"></div>
                  
                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'} mb-8 md:mb-0`}>
                    <div 
                      className={`p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                      style={{ transitionDelay: `${index * 200}ms` }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                          {exp.role}
                        </h3>
                        <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-sm font-medium rounded-full">
                          {exp.period}
                        </span>
                      </div>
                      
                      <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-4">
                        {exp.company}
                      </p>
                      
                      <ul className="space-y-2">
                        {exp.details.map((d, i) => (
                          <li 
                            key={i} 
                            className="flex items-start text-gray-600 dark:text-gray-300"
                          >
                            <svg className="w-5 h-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Spacer for alternating layout */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;