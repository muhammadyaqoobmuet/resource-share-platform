// Dashboard.js
import React, { Suspense, useEffect } from 'react';
import useAuthStore from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import ResourceList from './ResourceList';
import GenralLoader from './GenralLoader';
import ErrorBoundary from './ErrorBoundary';

const Dashboard = () => {
    const { isAuthenticated, isVerified, getUser } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && isVerified) {
            getUser();
        } else {
            navigate('/');
        }
    }, [isAuthenticated, isVerified, navigate, getUser]);

    return (
        <div className="min-h-screen bg-[#0d0d0d]">
            <ErrorBoundary>
                <Suspense fallback={<GenralLoader />}>
                    <ResourceList />
                </Suspense>
            </ErrorBoundary>
        </div>
    );
};

export default Dashboard;
