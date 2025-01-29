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
            return axiosInstance.post(`request/create`, {
                resourceId,
                returnDate: format(new Date(returnDate), "dd-MM-yyyy")
            });
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
        if (!returnDate) {
            toast.error("Please select a return date");
            return;
        }

        mutation.mutate({
            resourceId: resource.id,
            returnDate
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader className="animate-spin text-blue-600" size={48} />
            </div>
        );
    }

    if (isError) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Resource</h2>
                <p className="text-gray-600">{error.message}</p>
                <Button onClick={() => navigate('/dashboard')} className="mt-4">
                    Return to Dashboard
                </Button>
            </div>
        </div>
    );

    if (!resource) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Resource Not Found</h2>
                <Button onClick={() => navigate('/dashboard')} className="mt-4">
                    Return to Dashboard
                </Button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Close Button */}
                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Image Section */}
                    <div className="relative h-96">
                        <img
                            src={resource.imageUrl || "/placeholder.svg?height=400&width=600"}
                            alt={resource.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                            <span className="bg-blue-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                                {resource.category}
                            </span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{resource.name}</h1>
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 font-semibold">
                                        {userStatus.data?.data.name?.[0]?.toUpperCase()}
                                    </span>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">Owner</p>
                                    <p className="text-sm text-gray-500">{userStatus.data?.data.name}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed mb-6">{resource.description}</p>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">Category</p>
                                    <p className="text-gray-900 font-medium">{resource.category}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">Resource Type</p>
                                    <p className="text-gray-900 font-medium">{resource.resourceType}</p>
                                </div>
                            </div>
                        </div>

                        {/* Return Date Section */}
                        <div className="border-t pt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Return Date
                            </label>
                            <Input
                                type="date"
                                min={format(new Date(), "yyyy-MM-dd")}
                                value={returnDate}
                                onChange={(e) => setReturnDate(e.target.value)}
                                className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
                            />
                            <Button
                                disabled={user.name === userStatus.data?.data.name || !returnDate}
                                onClick={handleSubmit}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
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