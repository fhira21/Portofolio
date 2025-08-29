import React, { useState, useEffect } from "react";
import portfolioData from "../data/portofolioData";
import { FaDownload, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";

const About = () => {
  const { name, role, profileImage, about, personalInfo, interests, resume } =
    portfolioData.about;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('about');
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

  // Function to get icon based on label
  const getIcon = (label) => {
    switch (label.toLowerCase()) {
      case 'email':
        return <FaEnvelope className="text-indigo-500" />;
      case 'phone':
        return <FaPhone className="text-indigo-500" />;
      case 'location':
        return <FaMapMarkerAlt className="text-indigo-500" />;
      case 'age':
        return <FaCalendarAlt className="text-indigo-500" />;
      default:
        return <FaUser className="text-indigo-500" />;
    }
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl font-bold mb-2 text-center text-gray-800 dark:text-white">
            About Me
          </h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto mb-12 rounded-full"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Profile Image with Animation */}
            <div className="flex justify-center lg:justify-start">
              <div className={`relative transition-all duration-700 delay-200 ${isVisible ? 'scale-100 rotate-0 opacity-100' : 'scale-90 -rotate-3 opacity-0'}`}>
                <div className="w-72 h-72 relative">
                  <img
                    src={profileImage}
                    alt={name}
                    className="w-full h-full object-cover rounded-2xl shadow-xl border-4 border-white dark:border-gray-800 transition-transform duration-300 hover:scale-105"
                  />
                  {/* Decorative elements */}
                  <div className="absolute -inset-4 rounded-2xl border-2 border-indigo-300 dark:border-indigo-600 opacity-60 animate-pulse"></div>
                  <div className="absolute -inset-6 rounded-2xl border border-indigo-200 dark:border-indigo-700 opacity-40"></div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-indigo-500 rounded-full opacity-80 animate-bounce"></div>
                  <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-indigo-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.7s' }}></div>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Name and Role */}
              <div className={`transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  {name}
                </h3>
                <p className="text-xl text-indigo-600 dark:text-indigo-400 font-medium">
                  {role}
                </p>
              </div>

              {/* About Description */}
              <div className={`transition-all duration-700 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {about}
                </p>
              </div>

              {/* Personal Info */}
              <div className={`transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <span className="w-8 h-0.5 bg-indigo-500 mr-3"></span>
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {personalInfo.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex-shrink-0">
                        {getIcon(item.label)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">{item.label}</p>
                        <p className="text-gray-600 dark:text-gray-400">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className={`transition-all duration-700 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <span className="w-8 h-0.5 bg-indigo-500 mr-3"></span>
                  Interests
                </h4>
                <div className="flex flex-wrap gap-3">
                  {interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 text-sm rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 font-medium transition-all duration-300 hover:scale-105 hover:shadow-md"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Resume Button */}
              <div className={`transition-all duration-700 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                <a
                  href={resume}
                  download
                  className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <FaDownload className="text-lg" />
                  <span className="font-medium">Download Resume</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;