import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuthStore from '@/store/authStore';
import { Menu } from 'lucide-react';



const ProfileCard = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { logout, user } = useAuthStore()
    const navigate = useNavigate();
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = async () => {
        // Handle logout functionality here
        try {
            await logout();
        } catch (error) {
            console.log(error);
        }
        console.log('Logging out...');
    };

    const handleViewProfile = () => {
        navigate('/profile');
        setIsDropdownOpen(false);
    };

    // Get first letter of name, handle loading state
    const getInitial = () => {
        if (!user?.name) return '...';
        return user.name.charAt(0).toUpperCase();
    };

    return (
        <div className="flex items-center space-x-4 px-2 bg-white  rounded-lg max-w-sm mx-auto">
            {/* Profile Image */}
            <div className='w-10 h-8 bg-gray-800 text-white text-xl font-bold text-center px-2 content-center cursor-pointer rounded-full'>
                {getInitial()}
            </div>

            {/* Name and Dropdown */}
            <div className="flex gap-2 justify-between w-full items-center ">
                <span className="text-sm font-semibold">
                    {user?.name || (
                        <div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
                    )}
                </span>

                {/* Dropdown */}
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className=" px-4 py-2  ml-2rounded-md"
                    >
                        <Menu />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md">
                            <button
                                onClick={handleViewProfile}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 border-b border-gray-200"
                            >
                                View Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
