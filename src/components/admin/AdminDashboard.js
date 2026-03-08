import React, { useState, useEffect } from "react";
import { LogOut, Code, UserCircle, BookOpen, Menu, X, CheckCircle, AlertCircle } from "lucide-react";
import ProjectsManager from "./ProjectsManager";
import SkillsManager from "./SkillsManager";
import ExperienceManager from "./ExperienceManager";
import { motion, AnimatePresence } from "framer-motion";

const AdminDashboard = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState("projects");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Toast Notification System Payload: { message: "", type: "success" | "error" }
    const [toast, setToast] = useState(null);

    const showToast = (message, type = "success") => {
        setToast({ message, type });
    };

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const tabs = [
        { id: "projects", label: "Projects", icon: <Code size={20} /> },
        { id: "skills", label: "Skills", icon: <UserCircle size={20} /> },
        { id: "experience", label: "Experience", icon: <BookOpen size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans flex flex-col md:flex-row">

            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-20">
                <h1 className="font-bold text-lg text-indigo-600 dark:text-indigo-400">Content Manager</h1>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar Overlay (Mobile) */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden fixed inset-0 bg-black/50 z-30"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Navigation */}
            <motion.aside
                className={`fixed md:sticky top-0 left-0 h-full md:h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40 flex flex-col transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="p-6 hidden md:block border-b border-gray-200 dark:border-gray-800">
                    <h1 className="font-bold text-xl text-indigo-600 dark:text-indigo-400 tracking-tight">Content Manager</h1>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === tab.id
                                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50"
                                }`}
                        >
                            <div className={`${activeTab === tab.id ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 dark:text-gray-500"}`}>
                                {tab.icon}
                            </div>
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 dark:text-red-400 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-xl transition-colors"
                    >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="max-w-7xl mx-auto"
                        >
                            {activeTab === "projects" && <ProjectsManager showToast={showToast} />}
                            {activeTab === "skills" && <SkillsManager showToast={showToast} />}
                            {activeTab === "experience" && <ExperienceManager showToast={showToast} />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {/* Toast Notification Container */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 min-w-[300px]"
                    >
                        {toast.type === "success" ? (
                            <CheckCircle className="text-emerald-500" size={24} />
                        ) : (
                            <AlertCircle className="text-red-500" size={24} />
                        )}
                        <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{toast.message}</p>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default AdminDashboard;
