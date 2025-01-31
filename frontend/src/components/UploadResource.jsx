import { useState } from "react";
import useAuthStore from "@/store/authStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Upload } from "lucide-react";
import { motion } from "framer-motion";
const UploadResource = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("BOOKS");
    const [resourceType, setResourceType] = useState("LEND");

    const { isUploading, upload, uploadMessage } = useAuthStore();

    const navigate = useNavigate()
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jsonContent = JSON.stringify({
            name,
            description,
            category,
            resourceType,
        });

        const jsonFile = new Blob([jsonContent], { type: "application/json" });
        const formData = new FormData();
        if (file) formData.append("image", file);
        formData.append("resource", jsonFile, "resource.json");

        try {
            await upload(formData);
            console.log('upload message', uploadMessage);
            if (uploadMessage) {
                toast.success(uploadMessage);
                navigate('/dashboard');
            }
            toast.success("Resource uploaded successfully!");
            navigate('/dashboard');

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-[400px] flex items-center justify-center bg-[#0D0D0D] p-4 sm:p-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0d0d0d]  shadow-2xl rounded-3xl p-8 max-w-2xl w-full border border-gray-700/30 relative overflow-hidden"
            >
                {/* Gradient Border Effect */}
                {/* <div className="absolute inset-0 rounded-3xl p-px bg-gradient-to-br from-purple-500/20 to-blue-500/20 -m-px pointer-events-none" /> */}

                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-4xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-8"
                >
                    Share Your Resource
                </motion.h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* File Upload */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="group relative"
                    >
                        <label className="block">
                            <span className="text-gray-300 text-sm font-medium mb-2 block">Resource Image</span>
                            <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-700/50 rounded-2xl bg-gray-800/30 hover:border-purple-500/40 transition-all cursor-pointer">
                                <div className="text-center">
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-purple-400 transition-colors" />
                                    <p className="text-gray-400 group-hover:text-gray-200 transition-colors">
                                        {file ? file.name : 'Click to upload image'}
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    required
                                />
                            </div>
                        </label>
                    </motion.div>

                    {/* Name Input */}
                    <div className="space-y-2">
                        <label className="text-gray-300 text-sm font-medium">Resource Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-5 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                            placeholder="Enter resource name"
                            required
                        />
                    </div>

                    {/* Description Input */}
                    <div className="space-y-2">
                        <label className="text-gray-300 text-sm font-medium">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-5 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all h-32"
                            placeholder="Describe your resource..."
                            required
                        />
                    </div>

                    {/* Category Select */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-gray-300 text-sm font-medium">Category</label>
                            <div className="relative">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-5 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-200 appearance-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                                >
                                    <option className="text-black" value="BOOKS">Books</option>
                                    <option className="text-black" value="LAB_EQUIPMENT">Lab Equipment</option>
                                    <option className="text-black" value="ELECTRONICS">Electronics</option>
                                    <option className="text-black" value="STATIONERY">Stationery</option>
                                    <option className="text-black" value="MISCELLANEOUS">Miscellaneous</option>
                                </select>
                                <ArrowRight className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 transform rotate-90 pointer-events-none" />
                            </div>
                        </div>

                        {/* Resource Type Select */}
                        <div className="space-y-2">
                            <label className="text-gray-300 text-sm font-medium">Resource Type</label>
                            <div className="relative">
                                <select
                                    value={resourceType}
                                    onChange={(e) => setResourceType(e.target.value)}
                                    className="w-full px-5 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-200 appearance-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                                >
                                    <option className="text-black" value="LEND">Lend</option>
                                    <option className="text-black" value="DONATE">Donate</option>
                                </select>
                                <ArrowRight className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 transform rotate-90 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isUploading}
                        className={`w-full py-4 rounded-xl font-bold transition-all ${isUploading
                            ? "bg-gray-700/50 cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/20"
                            }`}
                    >
                        {isUploading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white/50 border-t-transparent rounded-full animate-spin" />
                                <span>Uploading...</span>
                            </div>
                        ) : (
                            "Share Resource"
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default UploadResource;