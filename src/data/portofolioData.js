import profileImage from "../assets/fhira.png";
import project1 from "../assets/logo192.png";

const portfolioData = {
  about: {
    name: "Fhira Triana Maulani",
    role: "Website Development and Mobile Development",
    profileImage: profileImage,
    about:
      "I am a Web and Mobile Developer with a strong focus on system analysis, backend, and frontend development. My core expertise lies in system analysis and backend development, but I am also capable of handling frontend tasks when needed. Additionally, I have experience as a Project Manager, leading an academic project within my study program.",

    personalInfo: [
      { label: "Age", value: "22" },
      { label: "Location", value: "Indonesia" },
      { label: "Email", value: "mfhiratriana@gmail.com" },
      { label: "Freelance", value: "Available" },
    ],

    interests: [
      "Frontend Development",
      "Backend Development",
      "System Analyst",
    ],

    resume: "/cv_fhira.pdf",
  },

  skills: [
    { name: "JavaScript", level: "intermediate" },
    { name: "React.js", level: "Advanced" },
    { name: "Node.js", level: "Intermediate" },
    { name: "Tailwind CSS", level: "Intermediate" },
    { name: "MongoDB", level: "advanced" },
    { name: "Git & GitHub", level: "Advanced" },
  ],

  projects: [
    {
      title: "Employee performance appraisal system",
      description:
        "A full-stack employee performance appraisal system development project, with employee performance evaluation and project management features, implemented in the GitHub API for automated project progress.",
      tech: ["React", "Node.js", "MongoDB", "Tailwind"],
      image: project1,
      Frontend: "https://github.com/fhira21/be_bytelogic",
      Backend: "https://github.com/fhira21/fe_bytelogic",
      live: "https://fe.bytelogic.orenjus.com/",
    },
    {
      title: "Booking Bengkel Online",
      description:
        "A web-based application that enables customers to book car service appointments online. The system includes role-based access for customers, mechanics, warehouse staff, and cashiers. Key features include booking management, spare part tracking, service activity logging, and e-receipts. Focused on clean UI/UX and efficient workflow integration.",
      tech: ["React", "Tailwind CSS", "Supabase"],
      image: project1,
      Frontend: "https://github.com/fhira21/Manajemen_Bengkel_Online",
      live: "https://volkswagen-sand.vercel.app/",
    },
    {
      title: "App Quizz Mobile",
      description:
        "A cross-platform mobile quiz application built to provide an engaging learning experience. It supports multiple-choice questions, score tracking, and result summaries. Designed with a responsive and interactive interface for seamless user experience.",
      tech: ["Flutter"],
      image: project1,
      Frontend: "https://github.com/fhira21/QuizzApp",
      live: "https://myecommerce.com",
    },
    {
      title: "PM Manajemen Capstone Project",
      description:
        "A project management platform developed as a capstone project to streamline task assignments, progress tracking, and team collaboration. It provides dashboards for monitoring project performance and facilitates better communication between team members.",
      tech: ["React", "Tailwind"],
      image: project1,
      Frontend: "https://github.com/fhira21/Manajemen-Capstone-Project",
      live: "https://myecommerce.com",
    },
    {
      title: "Project prtfolio",
      description:
        "A personal portfolio website developed to showcase freelance projects and previous work. The website features a modern, responsive design, allowing visitors to explore project details, technologies used, and access links to GitHub repositories and live demos. Visual elements and clear descriptions enhance the presentation of each project.",
      tech: ["React", "Tailwind"],
      image: project1,
      Frontend: "https://github.com/fhira21/ardhita-portfolio.git",
      live: "https://ardhita-portfolio.netlify.app/",
    },
  ],

  experience: [
    {
      company: "Sistem Informasi UAD",
      role: "Project Manager",
      period: "Februari - Agustus 2025",
      details: [
        "Defined project scope, roadmap, and milestones for a fullstack development capstone project",
        "Coordinated cross-functional team (analist system, ui/ux, frontend, backend, database) to ensure smooth collaboration.",
        "Applied agile practices to monitor progress, manage risks, and maintain project timeline.",
        "Ensured code quality, documentation, and testing throughout the development cycle.",
        "Delivered final product aligned with stakeholder requirements and project objectives.",
      ],
    },
    {
      company: "Bytelogic",
      role: "System Analyst, Backend & Frontend Developer",
      period: "Januari - Mei 2025",
      details: [
        "Developed a web-based system for evaluating employee performance across multiple projects.",
        "Responsible for system analysis, backend API development, and frontend implementation.",
        "Implemented dashboards, evaluation metrics, and data visualization.",
        "Ensured system reliability to meet both academic and real-world requirements.",
      ],
    },
  ],

  contact: {
    email: "mfhiratriana@gmail.com",
    phone: "+62 851-7670-0253",
    location: "Yogyakarta, Indonesia",
    social: {
      linkedin: "https://linkedin.com/in/fhira",
      github: "https://github.com/fhira21",
    },
  },
};

export default portfolioData;
