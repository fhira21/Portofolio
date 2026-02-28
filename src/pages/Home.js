import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
    return (
        <>
            <Navbar />
            <main>
                <Hero id="home" />
                <About id="about" />
                <Skills id="skills" />
                <Projects id="projects" mode="preview" />
                <Experience id="experience" />
                <Contact id="contact" />
            </main>
            <Footer />
        </>
    );
};

export default Home;
