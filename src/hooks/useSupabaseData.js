import { useState, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";

export const useSupabaseData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProjects = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Fetch projects array, join with project_media and project_tech
            const { data, error } = await supabase
                .from("projects")
                .select(`
                    *,
                    project_media ( media_type, media_url ),
                    project_tech ( tech_name )
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data;
        } catch (err) {
            console.error("Error fetching projects:", err.message);
            setError(err.message);
            return [];
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchExperience = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from("experience")
                .select(`
                    id, company, role, period_en, period_id,
                    experience_details ( id, detail_en, detail_id )
                `)
                .order('id', { ascending: false });

            if (error) {
                console.error("Supabase Error fetching experience:", error.message);
                throw error;
            }
            return data;
        } catch (err) {
            console.error("Exception fetching experience:", err.message);
            setError(err.message);
            return [];
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchSkills = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from("skills")
                .select("id, name, level")
                .order('name', { ascending: true });

            if (error) {
                console.error("Supabase Error fetching skills:", error.message);
                throw error;
            }
            return data;
        } catch (err) {
            console.error("Exception fetching skills:", err.message);
            setError(err.message);
            return [];
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchAboutInfo = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from("about_info")
                .select("*")
                .limit(1)
                .single();

            if (error && error.code !== "PGRST116") throw error; // PGRST116 is "no rows returned"
            return data;
        } catch (err) {
            console.error("Error fetching about info:", err.message);
            setError(err.message);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchPersonalInfo = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from("personal_info")
                .select("*");

            if (error) throw error;
            return data;
        } catch (err) {
            console.error("Error fetching personal info:", err.message);
            setError(err.message);
            return [];
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchContactInfo = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from("contact_info")
                .select("*")
                .limit(1)
                .single();

            if (error && error.code !== "PGRST116") throw error;
            return data;
        } catch (err) {
            console.error("Error fetching contact info:", err.message);
            setError(err.message);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        error,
        fetchProjects,
        fetchExperience,
        fetchSkills,
        fetchAboutInfo,
        fetchPersonalInfo,
        fetchContactInfo
    };
};
