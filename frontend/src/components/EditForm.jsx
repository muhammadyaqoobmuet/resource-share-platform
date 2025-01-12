import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import useAuthStore from "@/store/authStore";

const EditForm = ({ closeModal, resource }) => {
    const { updateData } = useAuthStore();
    const [file, setFile] = useState(null);
    const [name, setName] = useState(resource?.name || "");
    const [description, setDescription] = useState(resource?.description || "");
    const [category, setCategory] = useState(resource?.category || "BOOKS");
    const [resourceType, setResourceType] = useState(resource?.resourceType || "LEND");
    const [isUpdating, setIsUpdating] = useState(false);
    const [localLoading,setLocalLoading] = useState(false)
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure resourceId is a number
        const resourceIdNumber = Number(resource.id);

        // Create JSON data to update the resource
        const jsonContent = JSON.stringify({
            name: String(name), // Ensure name is a string
            description: String(description), // Ensure description is a string
            category: String(category), // Ensure category is a string
            resourceType: String(resourceType), // Ensure resourceType is a string
            id: resourceIdNumber, // Ensure resourceId is a number
        });

        // Create a Blob with the JSON data
        const jsonFile = new Blob([jsonContent], { type: "application/json" });

        // Create FormData object
        const formData = new FormData();

        // Append the JSON file to formData
        formData.append("resource", jsonFile, "resource.json");

        // Append the image file to formData (if provided)
        if (file) {
            formData.append("image", file);
        }

        // Call the updateData function to send the formData via API
        try {
            setLocalLoading(true)
            await updateData(formData);
            setLocalLoading(false)
            window.location.reload();
            toast.success("Resource updated successfully!");
            closeModal(); // Close the modal after successful update
        } catch (error) {
            toast.error("Error updating resource");
            setLocalLoading(false)
        }
    };

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Resource</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 text-sm mb-2" htmlFor="file">
                            Image:
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm mb-2" htmlFor="name">
                            Resource Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm mb-2" htmlFor="category">
                            Category
                        </label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        >
                            <option value="BOOKS">Books</option>
                            <option value="LAB_EQUIPMENT">Lab Equipment</option>
                            <option value="ELECTRONICS">Electronics</option>
                            <option value="STATIONERY">Stationery</option>
                            <option value="MISCELLANEOUS">Miscellaneous</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm mb-2" htmlFor="resourceType">
                            Resource Type
                        </label>
                        <select
                            id="resourceType"
                            value={resourceType}
                            onChange={(e) => setResourceType(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        >
                            <option value="LEND">Lend</option>
                            <option value="DONATE">Donate</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="mr-2 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md"
                            disabled={isUpdating}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md"
                            disabled={localLoading}
                        >
                            {localLoading ? "Updating..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default EditForm;
