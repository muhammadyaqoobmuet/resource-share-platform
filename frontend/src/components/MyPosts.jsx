import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "@/store/authStore";
import { toast } from "react-toastify";
import { Loader } from 'lucide-react';

const MyPosts = () => {
    const { fetchResources, resources, user, deleteProduct, isLoading } = useAuthStore();
    const [activeMenu, setActiveMenu] = useState(null);
    const [localLoading, setLocalLoading] = useState(true);

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
            window.location.reload();
            toast.success("Post deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete post");
        }
    };

    const toggleMenu = (id) => {
        setActiveMenu(activeMenu === id ? null : id);
    };

    if (isLoading || localLoading) {
        return (
            <div className="w-screen h-screen flex items-center justify-center" aria-live="polite" aria-busy="true">
                <Loader className="animate-spin text-blue-600" size={64} />
                <span className="sr-only">Loading your posts...</span>
            </div>
        );
    }

    const userPosts = resources.filter(resource => resource.userId === user?.id);

    return (
        <div className="max-w-[1350px] h-screen mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-center text-blue-600 mb-2">My Posts</h1>
            <p className="text-center text-gray-600 mb-8">View and manage your posts</p>

            {userPosts.length === 0 ? (
                <div className="text-center text-gray-600 py-8">
                    <p className="text-xl">You haven't created any posts yet.</p>
                    <p className="mt-2">Start sharing your knowledge by creating a new post!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            className="bg-white rounded-lg overflow-hidden shadow-md"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <div className="relative">
                                <img
                                    src={post.imageUrl || "/placeholder.svg?height=200&width=300"}
                                    alt={post.name}
                                    className="w-full h-48 object-cover"
                                />
                                <span className="absolute top-3 left-3 bg-blue-600 text-white text-sm px-3 py-1 rounded-md">
                                    {post.category}
                                </span>

                                <button
                                    className="absolute top-3 right-3 text-white bg-gray-800 rounded-full p-2"
                                    onClick={() => toggleMenu(post.id)}
                                    aria-label="Post options"
                                >
                                    <motion.span
                                        className="block w-5 h-5"
                                        whileHover={{ rotate: 90 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        ⋮
                                    </motion.span>
                                </button>

                                <AnimatePresence>
                                    {activeMenu === post.id && (
                                        <motion.div
                                            className="absolute top-12 right-3 w-40 bg-white border rounded-md shadow-lg z-10"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <button
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => handleEdit(post.id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                                                onClick={() => handleDelete(post.id)}
                                            >
                                                Delete
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{post.name}</h2>
                                <p className="text-gray-600 text-sm mb-3">{post.description}</p>
                                <p className="text-sm text-gray-500">Post Type: {post.resourceType}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyPosts;

