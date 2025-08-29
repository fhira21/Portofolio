import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="hero" className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold ">Hi, I'm Fhira Triana Maulani</h1>
        <p className="mt-4 text-lg md:text-xl">
          A passionate <span className="font-bold text-blue-700">Web Developer</span> who loves crafting modern web experiences.
        </p>
        <motion.a
          href="#projects"
          whileHover={{ scale: 1.1 }}
          className="mt-6 inline-block px-6 py-3 bg-white text-indigo-600 font-medium rounded-full shadow-md hover:bg-gray-100 transition"
        >
          View My Work
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
