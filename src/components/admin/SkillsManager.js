import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Loader2, Plus, Edit2, Trash2, X, Check } from "lucide-react";

const SkillsManager = ({ showToast }) => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);

    const [formData, setFormData] = useState({ name: "", level: "Intermediate" });

    const fetchSkills = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('skills').select('*').order('id', { ascending: true });
        if (!error && data) setSkills(data);
        else if (error) showToast?.(error.message, "error");
        setLoading(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        fetchSkills();
    }, []);

    const handleOpenModal = (skill = null) => {
        if (skill) {
            setEditingSkill(skill);
            setFormData({ name: skill.name, level: skill.level });
        } else {
            setEditingSkill(null);
            setFormData({ name: "", level: "Intermediate" });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingSkill(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let errorStr = null;
        if (editingSkill) {
            const { error } = await supabase.from('skills').update(formData).eq('id', editingSkill.id);
            errorStr = error?.message;
        } else {
            const { error } = await supabase.from('skills').insert([formData]);
            errorStr = error?.message;
        }

        if (errorStr) {
            showToast?.(errorStr, "error");
        } else {
            showToast?.(`Skill ${editingSkill ? "updated" : "added"} successfully!`);
        }

        handleCloseModal();
        fetchSkills();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this skill?")) {
            setLoading(true);
            const { error } = await supabase.from('skills').delete().eq('id', id);
            if (error) {
                showToast?.(error.message, "error");
            } else {
                showToast?.("Skill deleted successfully!");
            }
            fetchSkills();
        }
    };

    if (loading && skills.length === 0) {
        return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-indigo-600" size={32} /></div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Skills</h2>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                >
                    <Plus size={18} /> Add Skill
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                            <th className="p-4 font-semibold">Name</th>
                            <th className="p-4 font-semibold">Level</th>
                            <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skills.map((skill) => (
                            <tr key={skill.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td className="p-4">{skill.name}</td>
                                <td className="p-4 capitalize">{skill.level}</td>
                                <td className="p-4 flex justify-end gap-3">
                                    <button onClick={() => handleOpenModal(skill)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition">
                                        <Edit2 size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(skill.id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {skills.length === 0 && (
                            <tr>
                                <td colSpan="3" className="p-8 text-center text-gray-500">No skills found. Add your first skill!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
                            <h3 className="text-xl font-bold">{editingSkill ? "Edit Skill" : "Add Skill"}</h3>
                            <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition"><X size={20} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Skill Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder="e.g. React.js"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Level</label>
                                <select
                                    value={formData.level}
                                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                    className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none"
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Novice">Novice</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="Expert">Expert</option>
                                </select>
                            </div>

                            <div className="flex gap-3 justify-end pt-4">
                                <button type="button" onClick={handleCloseModal} className="px-5 py-2 rounded-lg font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition">Cancel</button>
                                <button type="submit" disabled={loading} className="px-5 py-2 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition flex items-center gap-2">
                                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />} Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkillsManager;
