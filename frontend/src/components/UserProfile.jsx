import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import GenralLoader from "./GenralLoader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../store/authStore";


const UserProfile = () => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const { data: user, isLoading } = useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            const response = await axiosInstance.get('/user/me');
            return response.data;
        }
    });
    const navigate = useNavigate();
    const { logout } = useAuthStore();

    const getInstitute = (email) => {
        if (!email) return "Not Available";
        if (email.includes("@students.muet.edu.pk")) return "MUET Student";
        if (email.includes("@faculty.muet.edu.pk")) return "MUET Faculty";
        return "Other";
    };

    const handleDeleteAccount = async () => {
        try {
            await logout();
            toast.info("Your account will be permanently deleted in 3 days.", {
                autoClose: 5000
            });
            navigate('/');
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    if (isLoading) return <GenralLoader />;

    return (
        <div className="min-h-screen bg-[#0a0a0a] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
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

                {/* Profile Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* User Information */}
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                        <h2 className="text-xl font-semibold text-gray-200 mb-4">User Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                                <p className="text-gray-200 bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                                    {user?.name}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                                <p className="text-gray-200 bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                                    {user?.email}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">User ID</label>
                                <p className="text-gray-200 bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                                    {user?.id}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                        <h2 className="text-xl font-semibold text-gray-200 mb-4">Account Statistics</h2>
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

            <div className="max-w-4xl mx-auto mt-8">
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20">
                    <h2 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h2>
                    <p className="text-gray-400 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg border border-red-500/20 
                                 hover:bg-red-500/20 transition-all duration-300"
                    >
                        Delete Account
                    </button>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-900 border border-red-500/20 rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-xl font-semibold text-red-400 mb-2">
                            Delete Account
                        </h3>
                        <p className="text-gray-300 mb-4">
                            Are you sure you want to delete your account? This action will:
                        </p>
                        <ul className="list-disc list-inside mb-4 text-gray-400 space-y-2">
                            <li>Schedule your account for deletion in 3 days</li>
                            <li>Remove all your resources and transactions</li>
                            <li>Log you out immediately</li>
                        </ul>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg 
                                         hover:bg-red-500/30 border border-red-500/20"
                            >
                                Yes, Delete My Account
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile; 