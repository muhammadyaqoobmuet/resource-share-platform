import React, { useState } from "react";
import useAuthStore from "@/store/authStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 text-gray-900">
            <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-8 max-w-lg w-full border border-gray-300">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Upload Resource
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="file" className="block text-sm font-medium text-gray-800 mb-2">
                            Image:
                        </label>
                        <input
                            type="file"
                            id="file"
                            onChange={handleFileChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-white/30 backdrop-blur-md text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-2">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-white/30 backdrop-blur-md text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:outline-none"
                            placeholder="Enter name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-800 mb-2">
                            Description:
                        </label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-white/30 backdrop-blur-md text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:outline-none"
                            placeholder="Enter description"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-800 mb-2">
                            Category:
                        </label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-white/30 backdrop-blur-md text-gray-800 focus:ring-2 focus:ring-gray-900 focus:outline-none"
                        >
                            <option value="BOOKS">Books</option>
                            <option value="LAB_EQUIPMENT">Lab Equipment</option>
                            <option value="ELECTRONICS">Electronics</option>
                            <option value="STATIONERY">Stationery</option>
                            <option value="MISCELLANEOUS">Miscellaneous</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="resourceType" className="block text-sm font-medium text-gray-800 mb-2">
                            Resource Type:
                        </label>
                        <select
                            id="resourceType"
                            value={resourceType}
                            onChange={(e) => setResourceType(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-white/30 backdrop-blur-md text-gray-800 focus:ring-2 focus:ring-gray-900 focus:outline-none"
                        >
                            <option value="LEND">Lend</option>
                            <option value="DONATE">Donate</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={isUploading}
                        className={`w-full px-4 py-2 rounded-lg font-bold text-white ${isUploading
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-[#171717] hover:bg-[#333333]"
                            } transition-colors duration-300`}
                    >
                        {isUploading ? "Uploading..." : "Upload"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadResource;
