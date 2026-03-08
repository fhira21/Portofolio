import React, { useState, useEffect } from "react";
import AdminLogin from "../components/admin/AdminLogin";
import AdminDashboard from "../components/admin/AdminDashboard";

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check local storage for auth token/status on mount
        const authStatus = localStorage.getItem("adminAuth");
        if (authStatus === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLoginSuccess = () => {
        localStorage.setItem("adminAuth", "true");
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("adminAuth");
        setIsAuthenticated(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
            {!isAuthenticated ? (
                <AdminLogin onLoginSuccess={handleLoginSuccess} />
            ) : (
                <AdminDashboard onLogout={handleLogout} />
            )}
        </div>
    );
};

export default Admin;
