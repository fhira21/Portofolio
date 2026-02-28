import profileImage from "../assets/fhira.jpeg";

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
      id: "performance-appraisal",
      title: "Employee performance appraisal system",
      descriptionEn:
        "A full-stack employee performance appraisal and project management system designed to streamline employee evaluation and track project progress efficiently. The application provides structured performance assessment features, role-based access control, and real-time project monitoring.One of its key implementations includes GitHub API integration to automatically monitor project progress and repository activities, enabling performance tracking based on actual development contributions.The system was developed with a focus on structured database design, scalable backend architecture, and clean user interface implementation.",
      descriptionId:
        "Sistem Penilaian Kinerja Karyawan berbasis full-stack yang dirancang untuk mempermudah proses evaluasi kinerja serta pemantauan progres proyek secara sistematis. Aplikasi ini menyediakan fitur penilaian terstruktur, akses berbasis peran, serta monitoring progres proyek secara real-time.Salah satu fitur unggulannya adalah integrasi GitHub API untuk memantau aktivitas repository dan kontribusi pengembangan secara otomatis, sehingga evaluasi kinerja dapat didasarkan pada data aktual.Dikembangkan dengan perancangan database terstruktur dan arsitektur backend yang scalable.",
      tech: ["React.js", "Node.js", "MongoDB", "Tailwind CSS"],
      category: "Web",
      year: "2025",
      media: [
        { type: "image", url: "/logo192.png" }
      ],
      Frontend: "https://github.com/fhira21/be_bytelogic",
      Backend: "https://github.com/fhira21/fe_bytelogic",
    },
    {
      id: "booking-bengkel",
      title: "Booking Bengkel Online",
      descriptionEn:
        "A web-based workshop management and booking system that allows customers to schedule car services online while enabling operational management for mechanics, warehouse staff, and cashiers.The system includes booking management, spare part tracking, service activity logging, role-based dashboards, and digital invoice (e-receipt) generation. It is designed to support real-world automotive workshop workflows, ensuring efficient communication between operational roles.The application emphasizes clean UI/UX design, structured database relationships, and optimized data handling using Supabase.",
      descriptionId:
        "Aplikasi manajemen bengkel berbasis web yang memungkinkan pelanggan melakukan booking servis mobil secara online serta mendukung operasional internal bengkel.Sistem ini mencakup pengelolaan booking, tracking sparepart, pencatatan aktivitas servis, dashboard berbasis peran (admin, montir, gudang, kasir), serta pembuatan nota digital.Dirancang untuk mensimulasikan kebutuhan bisnis bengkel nyata dengan alur kerja yang efisien dan database yang terstruktur.",
      tech: ["React.js", "Tailwind CSS", "Supabase"],
      category: "Web",
      year: "2024",
      media: [
        { type: "image", url: "/logo192.png" }
      ],
      Frontend: "https://github.com/fhira21/Manajemen_Bengkel_Online",
    },
    {
      id: "quizz-mobile",
      title: "App Quizz Mobile",
      descriptionEn:
        "A cross-platform mobile quiz application built to deliver an interactive learning experience. The application supports multiple-choice questions, real-time score tracking, and result summaries.Designed with a responsive UI and smooth navigation, the app ensures usability across different screen sizes. The project strengthened mobile state management and interactive UI development skills.",
      descriptionId:
        "Aplikasi kuis mobile lintas platform yang dirancang untuk memberikan pengalaman belajar interaktif. Mendukung soal pilihan ganda, pelacakan skor secara otomatis, serta ringkasan hasil akhir.Proyek ini memperkuat kemampuan pengembangan aplikasi mobile dan pengelolaan state secara dinamis.",
      tech: ["Flutter"],
      category: "Mobile",
      year: "2024",
      media: [
        { type: "image", url: "/logo192.png" }
      ],
      Frontend: "https://github.com/fhira21/QuizzApp",
    },
    {
      id: "pm-manajemen",
      title: "PM Manajemen Capstone Project",
      descriptionEn:
        "A project management platform developed as a capstone academic project to optimize task assignment, progress tracking, and team collaboration.The system includes dashboard monitoring, task categorization, and performance tracking to improve productivity and transparency within teams.The project demonstrates frontend structuring, component-based architecture, and collaborative system design.",
      descriptionId:
        "Platform manajemen proyek yang dikembangkan sebagai capstone project untuk mendukung penugasan tugas, monitoring progres, dan kolaborasi tim.Dilengkapi dengan dashboard pemantauan serta sistem pelacakan performa untuk meningkatkan produktivitas tim.",
      tech: ["React.js", "Tailwind CSS"],
      category: "Web",
      year: "2025",
      media: [
        { type: "image", url: "/logo192.png" }
      ],
      Frontend: "https://github.com/fhira21/Manajemen-Capstone-Project",
    },
    {
      id: "portfolio-website",
      title: "Project portfolio",
      descriptionEn:
        "A personal portfolio website developed to professionally showcase projects, technical skills, and freelance work.The website features a modern, responsive UI design with structured project categorization, GitHub integration, and live demo access. It highlights project descriptions, technology stacks, and development outcomes in a visually engaging format.",
      descriptionId:
        "Website portofolio pribadi yang dirancang untuk menampilkan proyek, keterampilan teknis, dan pengalaman secara profesional.Menggunakan desain modern dan responsif dengan struktur proyek yang jelas serta integrasi link GitHub dan demo aplikasi.",
      tech: ["React.js", "Tailwind CSS"],
      category: "Web",
      year: "2024",
      media: [
        { type: "image", url: "/logo192.png" }
      ],
      Frontend: "https://github.com/fhira21/ardhita-portfolio.git",
    },
    {
      id: "TravelEase",
      title: "TravelEase / AI Travel Planner",
      descriptionEn:
        "TravelEase is an AI-powered web application that generates personalized travel itineraries based on the user’s destination and trip duration.The system processes user inputs and dynamically generates structured travel plans, helping users optimize their time and budget efficiently.The project focuses on AI integration, dynamic data rendering, and modern UI design for enhanced user experience.",
      descriptionId:
        "TravelEase adalah aplikasi web berbasis AI yang menghasilkan itinerary perjalanan secara otomatis berdasarkan tujuan dan durasi perjalanan pengguna.Aplikasi ini mengolah input pengguna dan menghasilkan rencana perjalanan yang terstruktur serta membantu estimasi waktu dan anggaran.",
      tech: ["Next.js", "Tailwind CSS"],
      category: "Web",
      year: "2025",
      media: [
        { type: "video", url: "/TravelEase.mp4" },
        { type: "image", url: "/logo192.png" }
      ],
      Frontend: "https://github.com/fhira21/ai-travell-planning.git",
    },
    {
      id: "warung-pintar",
      title: "Warung Pintar",
      descriptionEn: "A web-based retail management system designed to manage product listings, selling prices, supplier information, and base pricing efficiently.The system enables structured product management, price adjustments, and supplier tracking, making it suitable for small to medium-scale retail operations.Developed with a scalable frontend structure and integrated database system.",
      descriptionId: "Aplikasi manajemen ritel berbasis web untuk mengelola data produk, harga jual, pemasok, dan harga dasar secara efisien.Dirancang untuk mendukung operasional toko skala kecil hingga menengah dengan sistem pengelolaan data yang terstruktur.",
      tech: ["Next.js", "React.js", "Tailwind CSS", "Supabase"],
      category: "Web",
      year: "2025",
      media: [
        { type: "image", url: "/logo192.png" }
      ],
      Frontend: "https://github.com/fhira21/Fe_Warung_pintar.git",
    },
    {
      id: "funlearn",
      title: "FunLearn Kids",
      descriptionEn: "FunLearn Kids is a colorful and interactive educational web application designed for children. It features three mini-games: Animal Guessing, Fruit Guessing, and Basic Math, each with progressive difficulty levels.The application focuses on interactive DOM manipulation, dynamic scoring systems, and engaging UI elements to create a fun learning environment.",
      descriptionId: "FunLearn Kids adalah aplikasi web edukatif yang interaktif dan penuh warna untuk anak-anak. Terdiri dari tiga mini-game: Tebak Hewan, Tebak Buah, dan Matematika Dasar dengan tingkat kesulitan bertahap.Aplikasi ini berfokus pada interaksi dinamis, sistem penilaian otomatis, dan pengalaman belajar yang menyenangkan.",
      tech: ["Vanila Js", "HTML", "CSS"],
      category: "Web",
      year: "2025",
      media: [
        { type: "image", url: "/logo192.png" }
      ],
      Frontend: "https://github.com/fhira21/FunLearn-Kids",
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
