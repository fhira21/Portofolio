import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50 min-h-screen transition-colors duration-300">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project" element={<ProjectsPage />} />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
