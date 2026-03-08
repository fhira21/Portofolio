import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Loader2, Plus, Edit2, Trash2, X, Check, MinusCircle } from "lucide-react";

const ExperienceManager = ({ showToast }) => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExp, setEditingExp] = useState(null);

    const initialForm = {
        company: "",
        role: "",
        period_en: "",
        period_id: "",
        details: [{ detail_en: "", detail_id: "" }]
    };

    const [formData, setFormData] = useState(initialForm);

    const fetchExperience = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('experience')
            .select(`
        *,
        experience_details (*)
      `)
            .order('id', { ascending: true });

        if (!error && data) setExperiences(data);
        else if (error) showToast?.(error.message, "error");
        setLoading(false);
    };

    useEffect(() => {
        fetchExperience();
    }, []);

    const handleOpenModal = (exp = null) => {
        if (exp) {
            setEditingExp(exp);
            setFormData({
                company: exp.company,
                role: exp.role,
                period_en: exp.period_en,
                period_id: exp.period_id,
                details: exp.experience_details?.length ? exp.experience_details.map(d => ({ detail_en: d.detail_en, detail_id: d.detail_id })) : [{ detail_en: "", detail_id: "" }]
            });
        } else {
            setEditingExp(null);
            setFormData(initialForm);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingExp(null);
    };

    const handleDetailChange = (index, field, value) => {
        const newDetails = [...formData.details];
        newDetails[index][field] = value;
        setFormData({ ...formData, details: newDetails });
    };

    const addDetailField = () => {
        setFormData({ ...formData, details: [...formData.details, { detail_en: "", detail_id: "" }] });
    };

    const removeDetailField = (index) => {
        const newDetails = formData.details.filter((_, i) => i !== index);
        setFormData({ ...formData, details: newDetails });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let operationError = null;

        const expData = {
            company: formData.company,
            role: formData.role,
            period_en: formData.period_en,
            period_id: formData.period_id
        };

        let expId;

        if (editingExp) {
            expId = editingExp.id;
            const { error } = await supabase.from('experience').update(expData).eq('id', expId);
            if (error) operationError = error.message;

            if (!operationError) {
                const { error: delError } = await supabase.from('experience_details').delete().eq('experience_id', expId);
                if (delError) operationError = delError.message;
            }
        } else {
            const { data, error } = await supabase.from('experience').insert([expData]).select();
            if (error) operationError = error.message;
            if (data && data.length > 0) expId = data[0].id;
        }

        if (!operationError && expId && formData.details.length > 0) {
            const detailsToInsert = formData.details
                .filter(d => d.detail_en || d.detail_id) // ignore completely empty ones
                .map(d => ({
                    experience_id: expId,
                    detail_en: d.detail_en,
                    detail_id: d.detail_id
                }));

            if (detailsToInsert.length > 0) {
                const { error } = await supabase.from('experience_details').insert(detailsToInsert);
                if (error) operationError = error.message;
            }
        }

        if (operationError) {
            showToast?.(operationError, "error");
        } else {
            showToast?.(`Experience ${editingExp ? "updated" : "added"} successfully!`);
        }

        handleCloseModal();
        fetchExperience();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this experience? Related details will also be deleted.")) {
            setLoading(true);
            // details should ideally cascade delete based on foreign key, but explicit is safer if not configured
            const { error: delDetailsError } = await supabase.from('experience_details').delete().eq('experience_id', id);
            const { error: delExpError } = await supabase.from('experience').delete().eq('id', id);

            if (delDetailsError || delExpError) {
                showToast?.(delExpError?.message || delDetailsError?.message, "error");
            } else {
                showToast?.("Experience deleted successfully!");
            }

            fetchExperience();
        }
    };

    if (loading && experiences.length === 0) {
        return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-indigo-600" size={32} /></div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Experience</h2>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                >
                    <Plus size={18} /> Add Experience
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                            <th className="p-4 font-semibold">Role</th>
                            <th className="p-4 font-semibold">Company</th>
                            <th className="p-4 font-semibold">Period (EN)</th>
                            <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {experiences.map((exp) => (
                            <tr key={exp.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td className="p-4 font-medium">{exp.role}</td>
                                <td className="p-4 text-gray-600 dark:text-gray-400">{exp.company}</td>
                                <td className="p-4 text-sm">{exp.period_en}</td>
                                <td className="p-4 flex justify-end gap-3">
                                    <button onClick={() => handleOpenModal(exp)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition">
                                        <Edit2 size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(exp.id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {experiences.length === 0 && (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-gray-500">No experiences found. Add your first experience!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto pt-24 pb-12">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative my-auto">
                        <div className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800 z-10">
                            <h3 className="text-xl font-bold">{editingExp ? "Edit Experience" : "Add Experience"}</h3>
                            <button type="button" onClick={handleCloseModal} className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition"><X size={20} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Company</label>
                                    <input
                                        type="text" required value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Role</label>
                                    <input
                                        type="text" required value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Period (English)</label>
                                    <input
                                        type="text" required value={formData.period_en}
                                        onChange={(e) => setFormData({ ...formData, period_en: e.target.value })}
                                        className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="e.g. Jan 2023 - Present"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Period (Indonesian)</label>
                                    <input
                                        type="text" required value={formData.period_id}
                                        onChange={(e) => setFormData({ ...formData, period_id: e.target.value })}
                                        className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="e.g. Jan 2023 - Sekarang"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex justify-between items-center mb-4">
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">Bullet Points (Details)</label>
                                    <button type="button" onClick={addDetailField} className="text-xs flex items-center gap-1 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 px-3 py-1.5 rounded-md hover:bg-indigo-100 transition">
                                        <Plus size={14} /> Add Detail
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {formData.details.map((detail, index) => (
                                        <div key={index} className="flex gap-3 items-start p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <textarea
                                                    placeholder={`Detail English ${index + 1}`}
                                                    value={detail.detail_en}
                                                    onChange={(e) => handleDetailChange(index, "detail_en", e.target.value)}
                                                    className="w-full p-3 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none min-h-[80px]"
                                                />
                                                <textarea
                                                    placeholder={`Detail Indonesian ${index + 1}`}
                                                    value={detail.detail_id}
                                                    onChange={(e) => handleDetailChange(index, "detail_id", e.target.value)}
                                                    className="w-full p-3 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none min-h-[80px]"
                                                />
                                            </div>
                                            {formData.details.length > 1 && (
                                                <button type="button" onClick={() => removeDetailField(index)} className="p-2 mt-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition shrink-0">
                                                    <MinusCircle size={20} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="sticky bottom-0 bg-white dark:bg-gray-900 pt-4 pb-2 flex gap-3 justify-end border-t border-gray-100 dark:border-gray-800 z-10">
                                <button type="button" onClick={handleCloseModal} className="px-5 py-2.5 rounded-xl font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition">Cancel</button>
                                <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-xl font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg shadow-indigo-600/20">
                                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />} Save Experience
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExperienceManager;
