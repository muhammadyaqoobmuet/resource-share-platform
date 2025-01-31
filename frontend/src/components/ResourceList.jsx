import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "@/store/authStore";
import { toast } from "react-toastify";
import { Search, Settings, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import EditForm from "./EditForm";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import GenralLoader from "./GenralLoader";
import { RefreshCcwDotIcon } from "lucide-react"
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const ResourceList = () => {
    const { fetchResources, resources, user, deleteProduct, isLoading } = useAuthStore();
    const [activeMenu, setActiveMenu] = useState(null);
    const [localLoading, setLocalLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedResource, setSelectedResource] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const navigate = useNavigate()
    const list = ["DONATED", "UNAVAILABLE", "BORROWED"]
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 9; // Items per page
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        type: "All",
        category: "All",
        status: "Any"
    });
    const [showFilters, setShowFilters] = useState(false);
    const searchTimeoutRef = useRef(null);

    // Remove fetchResources from dependency since we're using React Query now
    useEffect(() => {
        setLocalLoading(false);
    }, []);

    // Update the query to handle both search and filters
    const { data, isLoading: queryLoading, error, refetch } = useQuery({
        queryKey: ['resources', currentPage, pageSize, filters, debouncedSearchQuery],
        queryFn: async () => {
            const params = {
                page: currentPage,
                size: pageSize
            };


            // Add search param if exists
            if (debouncedSearchQuery) {
                params.keyword = debouncedSearchQuery;
                return axiosInstance.get('/resource/search', { params })
                    .then(response => {
                        setTotalPages(Math.ceil(response.data.totalElements / pageSize));
                        return response.data.content;
                    });
            }

            // If no search, use filters
            if (filters.type !== "All") {
                params.type = filters.type.toUpperCase();
            }
            if (filters.category !== "All") {
                params.category = filters.category.toUpperCase();
            }
            if (filters.status !== "Any") {
                params.status = filters.status.toUpperCase();
            }

            return axiosInstance.get('/resource/', { params })
                .then(response => {
                    setTotalPages(Math.ceil(response.data.totalElements / pageSize));
                    return response.data.content;
                });
        },
        staleTime: 300,
        refetchOnWindowFocus: false
    });

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

    // Update search handling to use setTimeout
    const handleSearchInput = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        // Clear any existing timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        // If empty, clear search immediately
        if (!value.trim()) {
            setDebouncedSearchQuery("");
            setCurrentPage(0);
            return;
        }

        // Set new timeout for search
        searchTimeoutRef.current = setTimeout(() => {
            setDebouncedSearchQuery(value);
            setCurrentPage(0);
        }, 500);
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    // Pagination controls
    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(0, prev - 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
    };

    // Update handleRefresh to use refetch
    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await refetch();
            toast.success("Resources refreshed!");
        } catch (error) {
            toast.error("Failed to refresh resources");
        } finally {
            setIsRefreshing(false);
        }
    };

    // Update filter change to not need manual refetch
    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
        setCurrentPage(0);
        // Remove the refetch() call since query will auto-update
    };

    // Update filter options to match backend expectations
    const filterOptions = {
        type: ["All", "LEND", "DONATE"],
        category: ["All", "BOOKS", "NOTES", "EQUIPMENT", "OTHER"],
        status: ["Any", "AVAILABLE", "UNAVAILABLE", "DONATED"]
    };

    if (isLoading || localLoading || queryLoading) {
        return (
            <GenralLoader />
        );
    }

    console.log(data);
    return (
        <div className="max-w-[1350px] mx-auto px-4 py-8  min-h-screen">
            <div className="text-center mb-12">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4"
                >
                    Campus Hub
                    <div className="w-60 hidden md:block h-[3px] mb-2 mt-1 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 curved-div"></div>
                </motion.h1>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
                    Explore shared knowledge and contribute your resources
                </p>
            </div>

            {/* Search and Filter Section */}
            <div className="max-w-3xl mx-auto mb-16 space-y-4">
                {/* Search Input with Button */}
                <div className="flex items-center gap-4">
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="relative group flex-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative flex items-center">
                            <Search className="absolute left-4 text-purple-300/80 h-6 w-6 z-10" />
                            <input
                                type="text"
                                placeholder="Search resources..."
                                value={searchQuery}
                                onChange={handleSearchInput}
                                className="w-full pl-14 pr-6 py-4 border border-purple-500/30 rounded-2xl 
                                            focus:outline-none focus:ring-2 focus:ring-purple-400/50 
                                            bg-gray-900/80 backdrop-blur-sm text-gray-200 placeholder-gray-500 
                                            shadow-xl shadow-purple-900/10 hover:border-purple-400/40 transition-all"
                            />
                        </div>
                    </motion.div>

                    <button
                        onClick={handleRefresh}
                        className="px-4 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all"
                    >
                        Search
                    </button>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`p-3 rounded-xl transition-all ${showFilters
                            ? 'bg-purple-500/20 text-purple-300'
                            : 'bg-gray-800 text-gray-400 hover:text-gray-200'
                            }`}
                    >
                        <Filter className="w-5 h-5" />
                    </button>
                </div>

                {/* Filters */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {Object.entries(filterOptions).map(([filterType, options]) => (
                                    <div key={filterType}>
                                        <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                                            {filterType}
                                        </label>
                                        <select
                                            value={filters[filterType.toLowerCase()]}
                                            onChange={(e) => handleFilterChange(filterType.toLowerCase(), e.target.value)}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-200 
                                                     focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                                        >
                                            {options.map(option => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
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

            {/* Resources Grid */}
            {!Array.isArray(data) || data.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-400/80 font-light">No resources found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
                    {data.map((resource, index) => (
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
                                <p className="text-gray-100 text-lg poppins max-w-full text-balance leading-relaxed font-light">
                                    {resource.description}
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
                                className={`w-full mt-4 rounded-t-none just rounded-b-2xl border-t border-gray-700/50
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

            {/* Pagination Controls */}
            <div className="mt-8 flex items-center justify-center gap-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 0}
                    className={`p-2 rounded-lg transition-all ${currentPage === 0
                        ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <span className="text-gray-400">
                    Page {currentPage + 1} of {totalPages}
                </span>

                <button
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages - 1}
                    className={`p-2 rounded-lg transition-all ${currentPage >= totalPages - 1
                        ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Error State */}
            {error && (
                <div className="text-center py-12 text-red-400">
                    Failed to load resources. Please try again.
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