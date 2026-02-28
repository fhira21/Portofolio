import React, { useState } from "react";
import portfolioData from "../data/portofolioData";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github, Copy, CheckCircle } from "lucide-react";

const Contact = () => {
  const { t } = useLanguage();
  const { email, phone, location, social } = portfolioData.contact;
  const [copied, setCopied] = useState({ email: false, phone: false });

  const handleEmailClick = () => window.location.href = `mailto:${email}`;
  const handleWhatsAppClick = () => {
    const cleanedPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanedPhone}`, '_blank');
  };

  const copyToClipboard = (text, type, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      setCopied({ ...copied, [type]: true });
      setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("contact.title")}</h2>
            <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">{t("contact.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Email Card */}
            <motion.div
              variants={itemVariants}
              className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-shadow group relative"
              onClick={handleEmailClick}
            >
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <Mail size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 break-all mb-4">{email}</p>

              <button
                className="mt-auto px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-2"
                onClick={(e) => copyToClipboard(email, 'email', e)}
              >
                {copied.email ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} />}
                <span>{copied.email ? 'Copied' : 'Copy'}</span>
              </button>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              variants={itemVariants}
              className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-shadow group relative"
              onClick={handleWhatsAppClick}
            >
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <Phone size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{phone}</p>

              <button
                className="mt-auto px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-2"
                onClick={(e) => copyToClipboard(phone, 'phone', e)}
              >
                {copied.phone ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} />}
                <span>{copied.phone ? 'Copied' : 'Copy'}</span>
              </button>
            </motion.div>

            {/* Location Card */}
            <motion.div
              variants={itemVariants}
              className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center hover:shadow-lg transition-shadow group"
            >
              <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <MapPin size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{location}</p>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="text-center pt-8 border-t border-gray-100 dark:border-gray-800">
            <div className="flex justify-center gap-6">
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full transition-colors"
                title="GitHub"
              >
                <Github size={24} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;