import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Loader2, Plus, Edit2, Trash2, X, Check, MinusCircle, Upload, Eye, Link as LinkIcon } from "lucide-react";

const ProjectsManager = ({ showToast }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [uploadingMediaIndex, setUploadingMediaIndex] = useState(null);

    const initialForm = {
        title: "", description_en: "", description_id: "",
        category: "", year: "", frontend_repo: "", backend_repo: "",
        techs: [{ tech_name: "" }],
        media: [{ media_type: "image", media_url: "", file: null }]
    };

    const [formData, setFormData] = useState(initialForm);

    const fetchProjects = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('projects')
            .select(`
        *,
        project_tech (*),
        project_media (*)
      `)
            .order('id', { ascending: false });

        if (!error && data) setProjects(data);
        else if (error) showToast?.(error.message, "error");
        setLoading(false);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleOpenModal = (project = null) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                title: project.title,
                description_en: project.description_en,
                description_id: project.description_id,
                category: project.category,
                year: project.year,
                frontend_repo: project.frontend_repo || "",
                backend_repo: project.backend_repo || "",
                techs: project.project_tech?.length ? project.project_tech.map(t => ({ tech_name: t.tech_name })) : [{ tech_name: "" }],
                media: project.project_media?.length ? project.project_media.map(m => ({ media_type: m.media_type, media_url: m.media_url, file: null })) : [{ media_type: "image", media_url: "", file: null }]
            });
        } else {
            setEditingProject(null);
            setFormData(initialForm);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProject(null);
    };

    const handleArrayChange = (index, arrayName, field, value) => {
        const newArray = [...formData[arrayName]];
        newArray[index][field] = value;
        setFormData({ ...formData, [arrayName]: newArray });
    };

    const uploadMedia = async (file) => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
            const filePath = `projects/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('portfolio-media')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('portfolio-media')
                .getPublicUrl(filePath);

            return data?.publicUrl;
        } catch (error) {
            console.error("Supabase Storage Upload Error:", error);
            throw error;
        }
    };

    const handleFileUpload = async (index, file) => {
        if (!file) return;

        setUploadingMediaIndex(index);

        try {
            const publicUrl = await uploadMedia(file);

            if (publicUrl) {
                const detectedType = file.type.startsWith('video/') ? 'video' : 'image';
                const newArray = [...formData.media];
                newArray[index].media_url = publicUrl;
                newArray[index].media_type = detectedType; // Auto-detect
                newArray[index].file = null;
                setFormData({ ...formData, media: newArray });
                showToast?.("File uploaded successfully to Supabase Storage!");
            }
        } catch (error) {
            showToast?.(error.message || "Failed to upload file", "error");
        } finally {
            setUploadingMediaIndex(null);
        }
    };

    const addArrayItem = (arrayName, defaultObj) => {
        setFormData({ ...formData, [arrayName]: [...formData[arrayName], defaultObj] });
    };

    const removeArrayItem = (index, arrayName) => {
        const newArray = formData[arrayName].filter((_, i) => i !== index);
        setFormData({ ...formData, [arrayName]: newArray });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let operationError = null;

        // Check if any files are currently uploading. If so, wait or error. 
        // Ideally user waits for upload to finish before saving.
        if (uploadingMediaIndex !== null) {
            showToast?.("Please wait for media uploads to finish before saving.", "error");
            setLoading(false);
            return;
        }

        const pData = {
            title: formData.title,
            description_en: formData.description_en,
            description_id: formData.description_id,
            category: formData.category,
            year: formData.year,
            frontend_repo: formData.frontend_repo,
            backend_repo: formData.backend_repo
        };

        let pId;

        if (editingProject) {
            pId = editingProject.id;
            const { error } = await supabase.from('projects').update(pData).eq('id', pId);
            if (error) operationError = error.message;

            if (!operationError) {
                // Clean up old relations
                await supabase.from('project_tech').delete().eq('project_id', pId);
                await supabase.from('project_media').delete().eq('project_id', pId);
            }
        } else {
            const { data, error } = await supabase.from('projects').insert([pData]).select();
            if (error) operationError = error.message;
            if (data && data.length > 0) pId = data[0].id;
        }

        if (!operationError && pId) {
            // Insert Techs
            const techsToInsert = formData.techs
                .filter(t => t.tech_name.trim() !== '')
                .map(t => ({ project_id: pId, tech_name: t.tech_name }));
            if (techsToInsert.length > 0) {
                const { error } = await supabase.from('project_tech').insert(techsToInsert);
                if (error) operationError = error.message;
            }

            // Insert Media
            if (!operationError) {
                const mediaToInsert = formData.media
                    .filter(m => m.media_url.trim() !== '')
                    .map(m => ({ project_id: pId, media_type: m.media_type, media_url: m.media_url }));
                if (mediaToInsert.length > 0) {
                    const { error } = await supabase.from('project_media').insert(mediaToInsert);
                    if (error) operationError = error.message;
                }
            }
        }

        if (operationError) {
            showToast?.(operationError, "error");
        } else {
            showToast?.(`Project ${editingProject ? "updated" : "added"} successfully!`);
        }

        handleCloseModal();
        fetchProjects();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this project? All associated media and tech stacks will be removed.")) {
            setLoading(true);
            const { error: techError } = await supabase.from('project_tech').delete().eq('project_id', id);
            const { error: mediaError } = await supabase.from('project_media').delete().eq('project_id', id);
            const { error: projError } = await supabase.from('projects').delete().eq('id', id);

            if (techError || mediaError || projError) {
                showToast?.(projError?.message || mediaError?.message || techError?.message, "error");
            } else {
                showToast?.("Project deleted successfully!");
            }
            fetchProjects();
        }
    };

    if (loading && projects.length === 0) {
        return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-indigo-600" size={32} /></div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Projects</h2>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition whitespace-nowrap"
                >
                    <Plus size={18} /> Add Project
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                            <th className="p-4 font-semibold">Title</th>
                            <th className="p-4 font-semibold">Year</th>
                            <th className="p-4 font-semibold">Category</th>
                            <th className="p-4 font-semibold">Media Files</th>
                            <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td className="p-4 font-medium">{project.title}</td>
                                <td className="p-4 text-gray-500">{project.year}</td>
                                <td className="p-4"><span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-md">{project.category}</span></td>
                                <td className="p-4 text-sm text-gray-500">{project.project_media?.length || 0} media files</td>
                                <td className="p-4 flex justify-end gap-3">
                                    <a href={`/project`} target="_blank" rel="noreferrer" className="p-2 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition" title="Preview all projects page">
                                        <Eye size={18} />
                                    </a>
                                    <button onClick={() => handleOpenModal(project)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition" title="Edit">
                                        <Edit2 size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(project.id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition" title="Delete">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {projects.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-gray-500">No projects found. Add your first project!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6 overflow-y-auto">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl relative my-auto">
                        <div className="sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800 z-10">
                            <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{editingProject ? "Edit Project" : "New Project"}</h3>
                            <button type="button" onClick={handleCloseModal} className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-400 transition"><X size={20} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar">

                            {/* Basic Details (same as previous) */}
                            <div className="bg-gray-50 dark:bg-gray-800/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                                <h4 className="font-bold text-lg mb-4 text-indigo-600 dark:text-indigo-400 border-b border-indigo-100 dark:border-indigo-900/30 pb-2">Primary Info</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <div className="md:col-span-3">
                                        <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">Project Title</label>
                                        <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none" />
                                    </div>
                                    <div className="md:col-span-3">
                                        <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">Description (English)</label>
                                        <textarea required rows={3} value={formData.description_en} onChange={(e) => setFormData({ ...formData, description_en: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none" />
                                    </div>
                                    <div className="md:col-span-3">
                                        <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">Description (Indonesian)</label>
                                        <textarea required rows={3} value={formData.description_id} onChange={(e) => setFormData({ ...formData, description_id: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">Category</label>
                                        <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Web Development" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">Year</label>
                                        <input type="text" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. 2024" />
                                    </div>
                                </div>
                            </div>

                            {/* Links */}
                            <div className="bg-gray-50 dark:bg-gray-800/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                                <h4 className="font-bold text-lg mb-4 text-indigo-600 dark:text-indigo-400 border-b border-indigo-100 dark:border-indigo-900/30 pb-2">Repository Links</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">Frontend Repo URL</label>
                                        <input type="url" value={formData.frontend_repo} onChange={(e) => setFormData({ ...formData, frontend_repo: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-mono" placeholder="https://github.com/..." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">Backend Repo URL</label>
                                        <input type="url" value={formData.backend_repo} onChange={(e) => setFormData({ ...formData, backend_repo: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-mono" placeholder="https://github.com/..." />
                                    </div>
                                </div>
                            </div>

                            {/* Tech Stack */}
                            <div className="bg-gray-50 dark:bg-gray-800/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                                <div className="flex justify-between items-center mb-4 border-b border-indigo-100 dark:border-indigo-900/30 pb-2">
                                    <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400">Tech Stack</h4>
                                    <button type="button" onClick={() => addArrayItem("techs", { tech_name: "" })} className="text-xs flex items-center gap-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-lg hover:border-indigo-500 transition shadow-sm font-medium">
                                        <Plus size={14} /> Add Tech
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {formData.techs.map((tech, index) => (
                                        <div key={index} className="flex gap-1 relative group">
                                            <input
                                                type="text"
                                                placeholder="e.g. React"
                                                value={tech.tech_name}
                                                onChange={(e) => handleArrayChange(index, "techs", "tech_name", e.target.value)}
                                                className="w-full p-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none transition font-medium"
                                            />
                                            {formData.techs.length > 1 && (
                                                <button type="button" onClick={() => removeArrayItem(index, "techs")} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition shadow-sm z-10 scale-75 hover:scale-90">
                                                    <X size={14} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Media with File Upload */}
                            <div className="bg-gray-50 dark:bg-gray-800/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                                <div className="flex justify-between items-center mb-4 border-b border-indigo-100 dark:border-indigo-900/30 pb-2">
                                    <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400">Project Media</h4>
                                    <button type="button" onClick={() => addArrayItem("media", { media_type: "image", media_url: "", file: null })} className="text-xs flex items-center gap-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-lg hover:border-indigo-500 transition shadow-sm font-medium">
                                        <Plus size={14} /> Add Media
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {formData.media.map((med, index) => (
                                        <div key={index} className="flex flex-col xl:flex-row gap-3 items-start xl:items-center bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden group">
                                            <select
                                                value={med.media_type}
                                                onChange={(e) => handleArrayChange(index, "media", "media_type", e.target.value)}
                                                className="w-full xl:w-32 p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500"
                                            >
                                                <option value="image">Image</option>
                                                <option value="video">Video</option>
                                            </select>

                                            {/* Flex container for the inputs so they stack nicely but keep the delete button aligned */}
                                            <div className="flex-1 w-full flex flex-col sm:flex-row gap-2">
                                                <div className="relative flex-1 group/input">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                        <LinkIcon size={16} />
                                                    </div>
                                                    <input
                                                        type="url"
                                                        placeholder={`Option 1: Paste URL here`}
                                                        value={med.media_url}
                                                        onChange={(e) => handleArrayChange(index, "media", "media_url", e.target.value)}
                                                        className="w-full pl-10 p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-mono"
                                                    />
                                                </div>

                                                <div className="flex items-center gap-2 flex-1 relative">
                                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">OR</span>
                                                    <div className="relative flex-1">
                                                        <input
                                                            type="file"
                                                            accept={med.media_type === "image" ? "image/*" : "video/*"}
                                                            onChange={(e) => {
                                                                if (e.target.files && e.target.files.length > 0) {
                                                                    handleFileUpload(index, e.target.files[0]);
                                                                }
                                                            }}
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                            disabled={uploadingMediaIndex === index}
                                                        />
                                                        <div className={`w-full flex items-center justify-center gap-2 p-2.5 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm font-medium transition ${uploadingMediaIndex === index ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 border-indigo-300" : "hover:bg-gray-50 dark:hover:bg-gray-800"}`}>
                                                            {uploadingMediaIndex === index ? (
                                                                <Loader2 size={16} className="animate-spin" />
                                                            ) : (
                                                                <Upload size={16} className="text-gray-500" />
                                                            )}
                                                            <span className="truncate max-w-[150px]">
                                                                {uploadingMediaIndex === index ? "Uploading..." : "Upload File"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Preview mini logic */}
                                            {med.media_url && (
                                                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700 mr-2 xl:mr-0">
                                                    {med.media_type === "image" ? (
                                                        <img src={med.media_url} alt="thumbnail" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <video src={med.media_url} className="w-full h-full object-cover" />
                                                    )}
                                                </div>
                                            )}

                                            {formData.media.length > 1 && (
                                                <button type="button" onClick={() => removeArrayItem(index, "media")} className="p-2.5 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition shrink-0 absolute top-3 right-3 xl:static xl:top-auto xl:right-auto">
                                                    <MinusCircle size={18} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </form>

                        <div className="sticky bottom-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 z-10">
                            <button type="button" onClick={handleCloseModal} className="px-6 py-3 rounded-xl font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition">Cancel</button>
                            <button type="submit" onClick={handleSubmit} disabled={loading || uploadingMediaIndex !== null} className="px-8 py-3 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-50">
                                {loading ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />} Save Project
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectsManager;
