import profileImage from "../assets/fhira.jpeg";
import project1 from "../assets/logo192.png";
import project2 from "../assets/TravelEase.mp4"

const portfolioData = {
  about: {
    name: "Fhira Triana Maulani",
    role: "Website Development and Mobile Development",
    profileImage: profileImage,
    personalInfo: [
      { id: "age", labelEn: "Age", labelId: "Usia", value: "22" },
      { id: "location", labelEn: "Location", labelId: "Lokasi", value: "Indonesia" },
      { id: "email", labelEn: "Email", labelId: "Email", value: "mfhiratriana@gmail.com" },
      { id: "freelance", labelEn: "Freelance", labelId: "Pekerja Lepas", valueEn: "Available", valueId: "Tersedia" },
    ],
    interestsEn: [
      "Frontend Development",
      "Backend Development",
      "System Analyst",
    ],
    interestsId: [
      "Pengembangan Frontend",
      "Pengembangan Backend",
      "Analis Sistem",
    ],
    resume: "/cv_fhira_triana.pdf",
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
      descriptionEn:
        "A full-stack employee performance appraisal system development project, with employee performance evaluation and project management features, implemented in the GitHub API for automated project progress.",
      descriptionId:
        "Proyek pengembangan sistem penilaian kinerja karyawan full-stack, dengan fitur evaluasi kinerja karyawan dan manajemen proyek, diimplementasikan dalam API GitHub untuk kemajuan proyek otomatis.",
      tech: ["React", "Node.js", "MongoDB", "Tailwind"],
      media: [
        { type: "video", url: project2 },
        { type: "image", url: project1 }
      ],
      Frontend: "https://github.com/fhira21/be_bytelogic",
      Backend: "https://github.com/fhira21/fe_bytelogic",
      live: "https://fe.bytelogic.orenjus.com/",
    },
    {
      title: "Booking Bengkel Online",
      descriptionEn:
        "A web-based application that enables customers to book car service appointments online. The system includes role-based access for customers, mechanics, warehouse staff, and cashiers. Key features include booking management, spare part tracking, service activity logging, and e-receipts. Focused on clean UI/UX and efficient workflow integration.",
      descriptionId:
        "Aplikasi berbasis web yang memungkinkan pelanggan memesan layanan servis mobil secara online. Sistem ini mencakup akses berbasis peran untuk pelanggan, mekanik, staf gudang, dan kasir.",
      tech: ["React", "Tailwind CSS", "Supabase"],
      media: [
        { type: "image", url: project1 }
      ],
      Frontend: "https://github.com/fhira21/Manajemen_Bengkel_Online",
      live: "https://volkswagen-sand.vercel.app/",
    },
    {
      title: "App Quizz Mobile",
      descriptionEn:
        "A cross-platform mobile quiz application built to provide an engaging learning experience. It supports multiple-choice questions, score tracking, and result summaries. Designed with a responsive and interactive interface for seamless user experience.",
      descriptionId:
        "Aplikasi kuis seluler lintas platform yang dibangun untuk memberikan pengalaman belajar yang menarik. Mendukung pertanyaan pilihan ganda, pelacakan skor, dan ringkasan hasil.",
      tech: ["Flutter"],
      media: [
        { type: "image", url: project1 }
      ],
      Frontend: "https://github.com/fhira21/QuizzApp",
      live: "-",
    },
    {
      title: "PM Manajemen Capstone Project",
      descriptionEn:
        "A project management platform developed as a capstone project to streamline task assignments, progress tracking, and team collaboration. It provides dashboards for monitoring project performance and facilitates better communication between team members.",
      descriptionId:
        "Platform manajemen proyek yang dikembangkan sebagai capstone project untuk mempermudah penugasan tugas, pelacakan kemajuan, dan kolaborasi tim.",
      tech: ["React", "Tailwind"],
      media: [
        { type: "image", url: project1 }
      ],
      Frontend: "https://github.com/fhira21/Manajemen-Capstone-Project",
      live: "-",
    },
    {
      title: "Project portfolio",
      descriptionEn:
        "A personal portfolio website developed to showcase freelance projects and previous work. The website features a modern, responsive design, allowing visitors to explore project details, technologies used, and access links to GitHub repositories and live demos. Visual elements and clear descriptions enhance the presentation of each project.",
      descriptionId:
        "Situs web portofolio pribadi yang dikembangkan untuk memamerkan proyek freelance dan karya sebelumnya. Situs web ini menampilkan desain modern dan responsif.",
      tech: ["React", "Tailwind"],
      media: [
        { type: "image", url: project1 }
      ],
      Frontend: "https://github.com/fhira21/ardhita-portfolio.git",
      live: "https://ardhita-portfolio.netlify.app/",
    },
    {
      title: "AI Travell Planner",
      descriptionEn:
        "AI Travel Planner is a web application that automatically generates personalized travel itineraries using AI based on the user’s destination and trip duration.",
      descriptionId:
        "AI Travel Planner adalah aplikasi web yang secara otomatis menghasilkan rencana perjalanan yang dipersonalisasi menggunakan AI berdasarkan tujuan dan durasi perjalanan pengguna.",
      tech: ["Next", "Tailwind"],
      media: [
        { type: "image", url: project1 }
      ],
      Frontend: "https://github.com/fhira21/ai-travell-planning.git",
      live: "-",
    },
  ],

  experience: [
    {
      company: "Sistem Informasi UAD",
      role: "Project Manager",
      periodEn: "February - August 2025",
      periodId: "Februari - Agustus 2025",
      detailsEn: [
        "Defined project scope, roadmap, and milestones for a fullstack development capstone project",
        "Coordinated cross-functional team (analist system, ui/ux, frontend, backend, database) to ensure smooth collaboration.",
        "Applied agile practices to monitor progress, manage risks, and maintain project timeline.",
        "Ensured code quality, documentation, and testing throughout the development cycle.",
        "Delivered final product aligned with stakeholder requirements and project objectives.",
      ],
      detailsId: [
        "Menentukan ruang lingkup proyek, peta jalan, dan tonggak pencapaian untuk proyek akhir pengembangan fullstack",
        "Mengoordinasikan tim lintas fungsi (analis sistem, ui/ux, frontend, backend, database) untuk memastikan kolaborasi yang lancar.",
        "Menerapkan praktik agile untuk memantau kemajuan, mengelola risiko, dan mempertahankan garis waktu proyek.",
        "Memastikan kualitas kode, dokumentasi, dan pengujian di seluruh siklus pengembangan.",
        "Menyerahkan produk akhir yang sejalan dengan persyaratan pemangku kepentingan dan tujuan proyek.",
      ],
    },
    {
      company: "Bytelogic",
      role: "System Analyst, Backend & Frontend Developer",
      periodEn: "January - May 2025",
      periodId: "Januari - Mei 2025",
      detailsEn: [
        "Developed a web-based system for evaluating employee performance across multiple projects.",
        "Responsible for system analysis, backend API development, and frontend implementation.",
        "Implemented dashboards, evaluation metrics, and data visualization.",
        "Ensured system reliability to meet both academic and real-world requirements.",
      ],
      detailsId: [
        "Mengembangkan sistem berbasis web untuk mengevaluasi kinerja karyawan di berbagai proyek.",
        "Bertanggung jawab atas analisis sistem, pengembangan API backend, dan implementasi frontend.",
        "Menerapkan tata letak dasbor, metrik evaluasi, dan visualisasi data.",
        "Memastikan keandalan sistem untuk memenuhi persyaratan akademik maupun dunia nyata.",
      ],
    },
  ],

  contact: {
    email: "mfhiratriana@gmail.com",
    phone: "+62 851-7670-0253",
    location: "Jakarta, Indonesia",
    social: {
      linkedin: "https://linkedin.com/in/fhira",
      github: "https://github.com/fhira21",
    },
  },
};

export default portfolioData;
