import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "@/store/authStore";
import { toast } from "react-toastify";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GenralLoader from "./GenralLoader";

const MyPosts = () => {
    const { fetchResources, resources, user, deleteProduct, isLoading } = useAuthStore();
    const [activeMenu, setActiveMenu] = useState(null);
    const [localLoading, setLocalLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadResources = async () => {
            try {
                await fetchResources();
            } catch (error) {
                console.error("Failed to fetch resources:", error);
                toast.error("Failed to load your posts. Please try again.");
            } finally {
                setLocalLoading(false);
            }
        };

        loadResources();
    }, [fetchResources]);

    const handleEdit = (id) => {
        console.log(`Edit post with id: ${id}`);
        // Implement edit functionality here
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            toast.success("Post deleted successfully");
            navigate('/dashboard');
            window.location.reload();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete post");
        }
    };

    const toggleMenu = (id) => {
        setActiveMenu(activeMenu === id ? null : id);
    };

    if (isLoading || localLoading) {
        return <GenralLoader />;
    }

    const userPosts = resources.filter(resource => resource.userId === user?.id);

    return (
    <div className="bg-[#0D0D0D] w-full ">
        <div className="max-w-[1350px] mx-auto px-4 py-8 min-h-screen bg-[#0D0D0D]">
            <div className="text-center mb-12">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold bg-gradient-to-r from-purple-700 to-blue-500 bg-clip-text text-transparent mb-4"
                >
                    My Resources
                </motion.h1>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
                    Manage and track your shared resources
                </p>
            </div>

            {userPosts.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                >
                    <p className="text-xl text-gray-400/80 font-light">You haven&apos;t shared any resources yet.</p>
                    <p className="mt-2 text-gray-500">Start contributing to the community by sharing your first resource!</p>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {userPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            className="group relative bg-[#292929] rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-900/20 transition-shadow"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="relative overflow-hidden">
                                
                                
                                <img
                                    src={post.imageUrl || "/placeholder.svg"}
                                    alt={post.name}
                                    className="w-full h-52 object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />

                                <span className="absolute bottom-4 left-4 bg-gradient-to-r from-purple-500 to-blue-500 text-gray-100 
                                               px-4 py-1.5 rounded-full text-sm font-medium shadow-lg">
                                    {post.category}
                                </span>

                                <button
                                    className="absolute top-4 right-4 p-2 bg-gray-800/80 backdrop-blur-sm rounded-full 
                                             hover:bg-gray-700/80 transition-colors"
                                    onClick={() => toggleMenu(post.id)}
                                >
                                    <Settings className="w-5 h-5 text-purple-300/90" />
                                </button>

                                <AnimatePresence>
                                    {activeMenu === post.id && (
                                        <motion.div
                                            className="absolute top-14 right-4 w-44 bg-gray-800/90 backdrop-blur-sm border 
                                                     border-gray-700 rounded-xl shadow-xl z-20"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                        >
                                            <button
                                                className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-gray-700/50 
                                                         transition-colors border-b border-gray-700/50"
                                                onClick={() => handleEdit(post.id)}
                                            >
                                                <span className="text-sm">Edit Resource</span>
                                            </button>
                                            <button
                                                className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-gray-700/50 
                                                         transition-colors"
                                                onClick={() => handleDelete(post.id)}
                                            >
                                                <span className="text-sm">Delete</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="p-6 space-y-4">
                                <h2 className="text-xl font-semibold tracking-widest text-gray-50">
                                    {post.name}
                                </h2>
                                <p className="text-gray-100 text-md leading-relaxed font-light">
                                    description: {post.description}
                                </p>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-[#b2b4b6] font-medium">
                                        {post.resourceType}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    </div>
    );
};

export default MyPosts;

