

import { useEffect } from 'react';
import { Timeline } from './Timeline'
import { InputWithButton } from './ui/InputWithButton'

import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

function LandingPage() {
    const navigate = useNavigate();
    const { user, isAuthenticated, isVerified } = useAuthStore();

    useEffect(() => {
        console.log('Authenticated:', isAuthenticated);
        console.log('Verified:', isVerified);
        console.log('User:', user);
        if (isAuthenticated && isVerified) {
            navigate('/dashboard')
        }
    }, [isAuthenticated, isVerified])

    return (
        <div>

            <div className='wrapper max-w-[1350px] mx-auto px-4 py-8'>

                <div className='w-full  flex flex-col gap-6 lg:flex-row justify-center items-center text-center lg:text-left'>
                    {/* Left Section */}
                    <div className='left max-w-[55%] mb-8 lg:mb-0'>
                        <h1 className='text-5xl netflix max-w-[80%] font-bold text-[#171717] tracking-wider leading-tight mb-8'>
                            Share Resources, Exchange Knowledge, and Empower Students – All in One Platform
                        </h1>
                        <h3 className=' text-lg text-gray-600 leading-relaxed'>
                            This emphasizes the platform's role in connecting students, sharing knowledge, and providing easy access to resources.
                        </h3>
                        <div className='mt-4 '>
                            <InputWithButton />
                        </div>
                    </div>

                    {/* Right Section (Image) */}
                    <div className='right w-[520px] h-[500px]'>
                        <img
                            className='h-full w-full object-cover rounded-lg '
                            src='/images/Illustration_1.png'
                            alt='Illustration representing the platform'
                        />
                    </div>
                </div>
            </div>
            <Timeline />
        </div>

    )
}

export default LandingPage
