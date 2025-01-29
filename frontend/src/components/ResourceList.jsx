import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "@/store/authStore";
import { toast } from "react-toastify";
import { Loader, Search } from "lucide-react";
import EditForm from "./EditForm";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import GenralLoader from "./GenralLoader";

const ResourceList = () => {
    const { fetchResources, resources, user, deleteProduct, isLoading } = useAuthStore();
    const [activeMenu, setActiveMenu] = useState(null);
    const [localLoading, setLocalLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedResource, setSelectedResource] = useState(null);
    const navigate = useNavigate()
    const list = ["DONATED", "UNAVAILABLE"]
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        console.log(resources);
        const loadResources = async () => {
            try {
                await fetchResources();
            } catch (error) {
                console.error("Failed to fetch resources:", error);
                toast.error("Failed to load resources. Please try again.");

            } finally {
                setLocalLoading(false);
            }
        };

        loadResources();
    }, [fetchResources]);

    const handleEdit = (resource) => {
        setSelectedResource(resource);
        setIsModalOpen(true);
    };

    const goToMain = (id) => {
        if (id) {
            navigate(`/resource/${id}`)
        }
    }
    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            toast.success("Resource deleted successfully");
            window.location.reload()
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete resource");
        }
    };

    const toggleMenu = (id) => {
        setActiveMenu(activeMenu === id ? null : id);
    };

    // Dummy search method - you can replace this with actual search logic later
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        // You can implement actual search logic here
        console.log("Searching for:", e.target.value);
    };

    if (isLoading || localLoading) {
        return (
            <GenralLoader />
        );
    }

    return (
        <div className="max-w-[1350px] mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Community Resources
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Discover and share resources with your community
                </p>
            </div>

            {/* Modern Search Input */}
            <div className="max-w-2xl mx-auto mb-12 ">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search resources..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full pl-10 pr-4 py-3 border border-gray-500 rounded-xl 
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 bg-white shadow-sm hover:border-gray-300 transition-colors"
                    />
                </div>
            </div>

            {!Array.isArray(resources) || resources.length === 0 ? (
                <div className="text-center text-gray-600 py-8">
                    <p className="text-xl">No resources found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources.map((resource, index) => (
                        <motion.div

                            key={resource.id}
                            className="bg-white rounded-lg  my-4 mx-2 overflow-hidden shadow-md "
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <div className="relative">
                                <img
                                    src={resource.imageUrl || "/placeholder.svg?height=200&width=300"}
                                    alt={resource.name}
                                    className="w-full h-48 object-cover"
                                />
                                <span className="absolute top-3 left-3 bg-blue-600 text-white text-sm px-3 py-1 rounded-md">
                                    {resource.category}
                                </span>
                                {user?.id === resource.userId && (
                                    <button
                                        className="absolute top-3 right-3 text-white bg-gray-800 rounded-full p-2"
                                        onClick={() => toggleMenu(resource.id)}
                                        aria-label="Resource options"
                                    >
                                        ⋮
                                    </button>
                                )}
                                <AnimatePresence>
                                    {activeMenu === resource.id && (
                                        <motion.div
                                            className="absolute top-12 right-3 w-40 bg-white border rounded-md shadow-lg z-10 "
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <button
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => handleEdit(resource)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                                                onClick={() => handleDelete(resource.id)}
                                            >
                                                Delete
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{resource.name}</h2>
                                <p className="text-gray-600 text-sm mb-3">{resource.description}</p>

                                <p className="text-sm text-gray-500">Resource Type: {resource.resourceType}</p>
                            </div>
                            <Button onClick={() => goToMain(resource.id)} disabled={list.includes(resource.status)}
                                className={`${resource.status ? "bg-green-950 " : "bg-gray-500"}  w-full my-2`}>
                                {resource.status}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            )}

            <AnimatePresence>
                {isModalOpen && (
                    <EditForm
                        closeModal={() => setIsModalOpen(false)}
                        resource={selectedResource}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default ResourceList;
