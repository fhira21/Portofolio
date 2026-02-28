import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import Footer from "../components/Footer";

const ProjectsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50 min-h-screen transition-colors duration-300">
            <Navbar />
            <main className="pt-24 pb-20">
                <Projects mode="full" />
            </main>
            <Footer />
        </div>
    );
};

export default ProjectsPage;
