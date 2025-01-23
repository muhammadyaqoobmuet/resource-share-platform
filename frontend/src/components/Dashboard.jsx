// Dashboard.js
import React, { useEffect, useState } from 'react';
import useAuthStore from '@/store/authStore';
import { Link, redirect } from 'react-router-dom';
import ResourceList from './ResourceList';
import { Users } from 'lucide-react';

const Dashboard = () => {
    const { user, isAuthenticated, isVerified, getUser } = useAuthStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('Authenticated:', isAuthenticated);
        console.log('Verified:', isVerified);

        if (isAuthenticated && isVerified) {
            console.log("here");
            redirect('/dashboard');
            setLoading(false);
            getUser()
        } else {
            window.location.href = '/login';
        }
    }, [isAuthenticated, isVerified]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className=" min-h-screen bg-gray-100">
            {/* <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Welcome to your Dashboard, {user?.name}
                </h1>
                <div className="border-b border-gray-200 pb-4 mb-4">
                    <p className="text-gray-600 text-sm mb-2">
                        <span className="font-medium">Email:</span> {user?.email}
                    </p>
                    <p className="text-gray-600 text-sm">
                        <span className="font-medium">Account Created:</span> {new Date(user?.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex space-x-4">
                    <Link
                        to="/settings"
                        className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        Edit Profile
                    </Link>
                    <Link
                        to="/logout"
                        className="flex-1 text-center bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        Logout
                    </Link>
                </div>
            </div> */}
            <ResourceList />
        </div>

    );
};

export default Dashboard;
