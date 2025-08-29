import React, { useState, useEffect } from "react";
import portfolioData from "../data/portofolioData";

const Skills = () => {
  const { skills } = portfolioData;
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('skills');
      if (element) {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight * 0.75) {
          setIsVisible(true);
          // Animate each skill with a delay
          skills.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedSkills(prev => [...prev, index]);
            }, index * 100);
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [skills]);

  // Convert level text to percentage
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

  // Get color based on skill level
  const getLevelColor = (level) => {
    const percentage = getLevelPercentage(level);
    if (percentage >= 80) return 'bg-gradient-to-r from-green-500 to-green-600';
    if (percentage >= 60) return 'bg-gradient-to-r from-blue-500 to-blue-600';
    if (percentage >= 40) return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
    return 'bg-gradient-to-r from-red-500 to-red-600';
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl font-bold mb-2 text-center text-gray-800 dark:text-white">
            Skills & Technologies
          </h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto mb-12 rounded-full"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
                  animatedSkills.includes(index) ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {skill.name}
                  </h3>
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {skill.level}
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
                  <div
                    className={`h-3 rounded-full ${getLevelColor(skill.level)} transition-all duration-1000 ease-out`}
                    style={{
                      width: animatedSkills.includes(index) ? `${getLevelPercentage(skill.level)}%` : '0%'
                    }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Basic</span>
                  <span>Expert</span>
                </div>
              </div>
            ))}
          </div>

          {/* Circular Skills Chart for Visual Appeal */}
          <div className={`mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
              Technical Expertise
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {skills.slice(0, 4).map((skill, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative w-20 h-20 mb-3">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#eee"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={getLevelColor(skill.level).includes('green') ? "#10B981" : 
                               getLevelColor(skill.level).includes('blue') ? "#3B82F6" : 
                               getLevelColor(skill.level).includes('yellow') ? "#F59E0B" : "#EF4444"}
                        strokeWidth="3"
                        strokeDasharray={`${getLevelPercentage(skill.level)}, 100`}
                        className="transition-all duration-1000 ease-out"
                        style={{ strokeDashoffset: animatedSkills.includes(index) ? 0 : 25 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-800 dark:text-white">
                        {getLevelPercentage(skill.level)}%
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;