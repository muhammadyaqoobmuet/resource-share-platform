// Dashboard.js
import React, { useEffect, useState } from 'react';
import useAuthStore from '@/store/authStore';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user, isAuthenticated, isVerified } = useAuthStore();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log('Authenticated:', isAuthenticated);
        console.log('Verified:', isVerified);

        if (isAuthenticated && isVerified) {
            setLoading(false);
        } else {
            window.location.href = '/login';
        }
    }, [isAuthenticated, isVerified]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container p-6">
            <h1 className="text-2xl font-bold">Welcome to your Dashboard, {user?.name}</h1>
            <div className="dashboard-content mt-4">
                <div className="profile-info">
                    <p>Email: {user?.email}</p>
                    <p>Account created: {new Date(user?.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="actions mt-6">
                    <Link to="/settings" className="btn btn-primary">Edit Profile</Link>
                    <Link to="/logout" className="btn btn-secondary">Logout</Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
