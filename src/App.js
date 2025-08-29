import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { ThemeProvider } from "./context/ThemeContext";
import Skills from "./components/Skills";
import Experience from "./components/Experience";

function App() {
  return (
    <ThemeProvider>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </ThemeProvider>
  );
}

export default App;
