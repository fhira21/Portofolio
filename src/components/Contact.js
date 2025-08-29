import React, { useState, useEffect } from "react";
import portfolioData from "../data/portofolioData";

const Contact = () => {
  const { email, phone, location, social } = portfolioData.contact;
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState({ email: false, phone: false });

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('contact');
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

  // Fungsi untuk membuka email client
  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  // Fungsi untuk membuka WhatsApp
  const handleWhatsAppClick = () => {
    // Menghapus karakter non-digit dari nomor telepon
    const cleanedPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanedPhone}`, '_blank');
  };

  // Fungsi untuk menyalin teks ke clipboard
  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied({ ...copied, [type]: true });
      setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl font-bold mb-2 text-center text-gray-800 dark:text-white">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto mb-10 rounded-full"></div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-12">
            Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            {/* Email Card */}
            <div 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1 cursor-pointer group relative"
              onClick={handleEmailClick}
            >
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Email</h3>
              <p className="text-gray-600 dark:text-gray-300 break-all">{email}</p>
              
              {/* Tooltip */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 text-white text-xs py-1 px-2 rounded">
                Click to send email
                <div className="absolute w-3 h-3 bg-gray-800 rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
              </div>
              
              {/* Copy button */}
              <button 
                className="mt-3 text-xs text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(email, 'email');
                }}
              >
                {copied.email ? 'Copied!' : 'Copy email'}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>
            
            {/* Phone/WhatsApp Card */}
            <div 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1 cursor-pointer group relative"
              onClick={handleWhatsAppClick}
            >
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Phone / WhatsApp</h3>
              <p className="text-gray-600 dark:text-gray-300">{phone}</p>
              
              {/* Tooltip */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 text-white text-xs py-1 px-2 rounded">
                Click to chat on WhatsApp
                <div className="absolute w-3 h-3 bg-gray-800 rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
              </div>
              
              {/* Copy button */}
              <button 
                className="mt-3 text-xs text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(phone, 'phone');
                }}
              >
                {copied.phone ? 'Copied!' : 'Copy number'}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>
            
            {/* Location Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1 group">
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Location</h3>
              <p className="text-gray-600 dark:text-gray-300">{location}</p>
              
              {/* Copy button */}
              <button 
                className="mt-3 text-xs text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center"
                onClick={() => copyToClipboard(location, 'location')}
              >
                {copied.location ? 'Copied!' : 'Copy address'}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Follow me on</h3>
            <div className="flex justify-center space-x-6">
              {/* LinkedIn */}
              <a 
                href={social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center text-gray-600 dark:text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-2 transition-colors duration-300 hover:bg-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </div>
                <span>LinkedIn</span>
              </a>
              
              {/* GitHub */}
              <a 
                href={social.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center text-gray-600 dark:text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <div className="w-12 h-12 bg-gray-800 dark:bg-gray-700 rounded-full flex items-center justify-center mb-2 transition-colors duration-300 hover:bg-gray-900 dark:hover:bg-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                </div>
                <span>GitHub</span>
              </a>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;