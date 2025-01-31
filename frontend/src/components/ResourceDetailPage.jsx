import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import useAuthStore from "@/store/authStore";
import { Button } from "./ui/button";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import { Loader } from "lucide-react";

const fetchResourceById = async (id, token) => {
    if (!token) throw new Error("No token found");
    try {
        const response = await axios.get(`http://localhost:8080/resource/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching resource:", error);
        throw new Error("Failed to fetch resource details");
    }
};

const ResourceDetailPage = () => {
    const [returnDate, setReturnDate] = useState("");
    const navigate = useNavigate();
    const { token, user } = useAuthStore();
    const { id } = useParams();

    const { data: resource, isLoading, error, isError } = useQuery({
        queryKey: ["resource", id],
        queryFn: () => fetchResourceById(id, token),
    });

    const mutation = useMutation({
        mutationFn: async ({ resourceId, returnDate }) => {
            const payload = {
                resourceId,
                ...(returnDate && { returnDate: format(new Date(returnDate), "dd-MM-yyyy") })
            };
            return axiosInstance.post(`request/create`, payload);
        },
        onSuccess: () => {
            toast.success('Request Sent');
            setTimeout(() => navigate('/dashboard'), 2000);
        },
        onError: (error) => {
            toast.error(`Failed to send request: ${error.message}`);
        }
    });

    const userId = resource?.userId;
    const userStatus = useQuery({
        queryKey: ["user", userId],
        queryFn: () => axiosInstance.get(`/user/${userId}`),
        enabled: !!userId,
    });

    const handleSubmit = async () => {
        if (resource?.resourceType === "LEND" && !returnDate) {
            toast.error("Please select a return date for lending");
            return;
        }

        mutation.mutate({
            resourceId: resource.id,
            ...(resource?.resourceType === "LEND" && { returnDate })
        });
    };

    const handleOwnerClick = () => {
        if (userId) {
            navigate(`/user/${userId}`);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D]">
                <Loader className="animate-spin text-blue-500" size={48} />
            </div>
        );
    }

    if (isError || !resource) return (
        <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D]">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-200 mb-2">
                    {isError ? "Error Loading Resource" : "Resource Not Found"}
                </h2>
                <Button
                    onClick={() => navigate('/dashboard')}
                    className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                    Return to Dashboard
                </Button>
            </div>
        </div>
    );

    console.log(resource.userId);
    return (
        <div className="min-h-screen bg-[#0D0D0D] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Close Button */}
                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-gray-400 hover:text-gray-200 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="bg-[#0d0d0d] shadow-2xl rounded-3xl p-8 border border-gray-700/30 overflow-hidden">
                    {/* Image Section */}
                    <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
                        {resource.imageUrl ? (
                            <img
                                src={resource.imageUrl}
                                alt={resource.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-800/50 relative overflow-hidden">
                                <img
                                    src="/animatepulse.svg"
                                    alt="Loading..."
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
                        <div className="absolute top-4 left-4">
                            <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                                {resource.category}
                            </span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-100 mb-4">{resource.name}</h1>
                            <div className="flex items-center mb-6 bg-gray-800/30 p-4 rounded-xl 
                                          hover:bg-gray-800/50 transition-all cursor-pointer"
                                onClick={handleOwnerClick}>
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold">
                                        {userStatus.data?.data.name?.[0]?.toUpperCase()}
                                    </span>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-300">Owner</p>
                                    <p className="text-sm text-gray-400">{userStatus.data?.data.name}</p>
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed"> description : {resource.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-800/30 p-4 rounded-xl">
                                <p className="text-sm text-gray-400">Category</p>
                                <p className="text-gray-200 font-medium">{resource.category}</p>
                            </div>
                            <div className="bg-gray-800/30 p-4 rounded-xl">
                                <p className="text-sm text-gray-400">Resource Type</p>
                                <p className="text-gray-200 font-medium">{resource.resourceType}</p>
                            </div>
                        </div>

                        {/* Return Date Section */}
                        <div className="border-t border-gray-700/30 pt-6 space-y-4">
                            {resource?.resourceType === "LEND" && (
                                <>
                                    <label className="block text-sm font-medium text-gray-300">
                                        Select Return Date
                                    </label>
                                    <Input
                                        type="date"
                                        min={format(new Date(), "yyyy-MM-dd")}
                                        value={returnDate}
                                        onChange={(e) => setReturnDate(e.target.value)}
                                        className="w-full px-5 py-3 rounded-xl bg-gray-800/50 border border-gray-700 
                                                 text-gray-200 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                                    />
                                </>
                            )}

                            <Button
                                disabled={user?.name === userStatus.data?.data.name ||
                                    (resource?.resourceType === "LEND" && !returnDate)}
                                onClick={handleSubmit}
                                className="w-full py-4 rounded-xl font-bold transition-all
                                         bg-gradient-to-r from-purple-600 to-blue-600 
                                         hover:from-purple-700 hover:to-blue-700 
                                         disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed"
                            >
                                Request Resource
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourceDetailPage;