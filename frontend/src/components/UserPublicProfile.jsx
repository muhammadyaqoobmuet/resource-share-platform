import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import GenralLoader from "./GenralLoader";

const UserPublicProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const { data: user, isLoading } = useQuery({
        queryKey: ['userPublic', userId],
        queryFn: async () => {
            const response = await axiosInstance.get(`/user/${userId}`);
            return response.data;
        }
    });

    const getInstitute = (email) => {
        if (!email) return "Not Available";
        if (email.includes("@students.muet.edu.pk")) return "MUET Student";
        if (email.includes("@faculty.muet.edu.pk")) return "MUET Faculty";
        return "Other";
    };

    if (isLoading) return <GenralLoader />;

    return (
        <div className="min-h-screen bg-[#0a0a0a] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>

                {/* Profile Header */}
                <div className="relative bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl p-8 mb-8 overflow-hidden backdrop-blur-sm border border-gray-800">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 animate-pulse" />
                    <div className="relative flex items-center gap-6">
                        <div className="h-24 w-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-4xl font-bold text-white">
                            {user?.name?.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                {user?.name}
                            </h1>
                            <p className="text-gray-400 mt-1">{getInstitute(user?.email)}</p>
                        </div>
                    </div>
                </div>

                {/* Account Type Card */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                    <h2 className="text-xl font-semibold text-gray-200 mb-4">Account Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                            <p className="text-sm font-medium text-gray-400">Institute</p>
                            <p className="text-lg font-semibold text-purple-400 mt-1">
                                {getInstitute(user?.email)}
                            </p>
                        </div>
                        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                            <p className="text-sm font-medium text-gray-400">Account Type</p>
                            <p className="text-lg font-semibold text-blue-400 mt-1">
                                {user?.email?.includes("@faculty") ? "Faculty" : "Student"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPublicProfile; 