// Dashboard.js
import React, { Suspense, useEffect, useState } from 'react';
import useAuthStore from '@/store/authStore';
import { Link, redirect } from 'react-router-dom';
import ResourceList from './ResourceList';
import { Loader, Users } from 'lucide-react';
import GenralLoader from './GenralLoader';

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
            redirect('/')
        }
    }, [isAuthenticated, isVerified]);


    return (
        <div className=" min-h-screen bg-gray-100">
            <Suspense fallback={GenralLoader}>

                <ResourceList />
            </Suspense>
        </div>

    );
};

export default Dashboard;
