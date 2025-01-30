import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "@/store/authStore";
import { toast } from "react-toastify";
import { Search, Settings } from "lucide-react";
import EditForm from "./EditForm";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import GenralLoader from "./GenralLoader";
import { RefreshCcwDotIcon } from "lucide-react"

const ResourceList = () => {
    const { fetchResources, resources, user, deleteProduct, isLoading } = useAuthStore();
    const [activeMenu, setActiveMenu] = useState(null);
    const [localLoading, setLocalLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedResource, setSelectedResource] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
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

    // Add refresh function
    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await fetchResources();
            toast.success("Resources refreshed!");
        } catch (error) {
            toast.error("Failed to refresh resources");
        } finally {
            setIsRefreshing(false);
        }
    };

    if (isLoading || localLoading) {
        return (
            <GenralLoader />
        );
    }

    return (
        <div className="max-w-[1350px] mx-auto px-4 py-8  min-h-screen">
            <div className="text-center mb-12">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4"
                >
                    Community Hub
                    <div className="w-60 hidden md:block h-[3px] mb-2 mt-1 mx-auto bg-gradient-to-r from-purple-500 to-blue-500" />
                </motion.h1>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
                    Explore shared knowledge and contribute your resources
                </p>
            </div>

            {/* Premium Search Input */}
            <div className="max-w-3xl mx-auto mb-16">
                <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="relative group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center">
                        <Search className="absolute left-4 text-purple-300/80 h-6 w-6 z-10" />
                        <input
                            type="text"
                            placeholder="Discover resources..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-full pl-14 pr-6 py-4 border border-purple-500/30 rounded-2xl 
                                        focus:outline-none focus:ring-2 focus:ring-purple-400/50 
                                        bg-gray-900/80 backdrop-blur-sm text-gray-200 placeholder-gray-500 
                                        shadow-xl shadow-purple-900/10 hover:border-purple-400/40 transition-all"
                        />
                    </div>
                </motion.div>
            </div>
            <div className="w-full flex justify-end text-white p-4">
                <button
                    onClick={handleRefresh}
                    className="hover:text-purple-400 transition-all duration-300"
                    disabled={isRefreshing}
                >
                    <RefreshCcwDotIcon
                        size={25}
                        className={`${isRefreshing ? 'animate-spin' : 'hover:rotate-180 transition-all duration-500'}`}
                    />
                </button>
            </div>

            {!Array.isArray(resources) || resources.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-400/80 font-light">No resources found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resources.map((resource, index) => (
                        <motion.div
                            key={resource.id}
                            className="group relative bg-[#292929] from-gray-900/80 to-gray-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-900/20 transition-shadow"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="relative overflow-hidden">

                                {
                                    resource.imageUrl ?
                                        <img
                                            src={resource.imageUrl || "/placeholder.svg"}
                                            alt={resource.name}
                                            className="w-full h-52 object-cover transform group-hover:scale-105 transition-transform duration-300"
                                        /> :
                                        <div className="w-full h-full bg-gray-800/30 relative overflow-hidden">
                                            <img
                                                src="/animatepulse.svg"
                                                alt="Loading..."
                                                className="w-full h-52 object-cover"
                                            />
                                        </div>
                                }
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />

                                <span className="absolute bottom-4 left-4 bg-gradient-to-r from-purple-500 to-blue-500 text-gray-100 px-4 py-1.5 rounded-full text-sm font-medium shadow-lg">
                                    {resource.category}
                                </span>

                                {user?.id === resource.userId && (
                                    <button
                                        className="absolute top-4 right-4 p-2 bg-gray-800/80 backdrop-blur-sm rounded-full hover:bg-gray-700/80 transition-colors"
                                        onClick={() => toggleMenu(resource.id)}
                                    >
                                        <Settings className="w-5 h-5 text-purple-300/90" />
                                    </button>
                                )}

                                <AnimatePresence>
                                    {activeMenu === resource.id && (
                                        <motion.div
                                            className="absolute top-14 right-4 w-44 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl z-20"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                        >
                                            <button
                                                className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-gray-700/50 transition-colors border-b border-gray-700/50"
                                                onClick={() => handleEdit(resource)}
                                            >
                                                <span className="text-sm">Edit Resource</span>
                                            </button>
                                            <button
                                                className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-gray-700/50 transition-colors"
                                                onClick={() => handleDelete(resource.id)}
                                            >
                                                <span className="text-sm">Delete</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="p-6 space-y-4">
                                <h2 className="text-2xl font-semibold   text-gray-50">{resource.name}</h2>
                                <p className="text-gray-100 text-lg max-w-full text-balance leading-relaxed font-light">
                                    description:  {resource.description}
                                </p>
                                <div className="flex items-center justify-between text-lg h-auto">
                                    <span className="text-[#b2b4b6] font-medium text-balance mb-auto">
                                        {resource.resourceType}
                                    </span>
                                </div>
                            </div>

                            <Button
                                onClick={() => goToMain(resource.id)}
                                disabled={list.includes(resource.status)}
                                className={`w-full mt-4 rounded-t-none rounded-b-2xl border-t border-gray-700/50
                                        ${list.includes(resource.status)
                                        ? "bg-gradient-to-r from-green-900 to-emerald-900 text-emerald-300"
                                        : "bg-gradient-to-r from-purple-200 to-blue-500 text-black hover:text-white hover:from-purple-500/30 hover:to-blue-500/30"
                                    } h-12 text-sm font-medium transition-all`}
                            >
                                {list.includes(resource.status) ? 'Unavailable' : 'Available Now'}
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