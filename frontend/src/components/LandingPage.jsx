import { SpotLight } from "./SplotLight";
import { Timeline } from "./Timeline";
import { InputWithButton } from "./ui/InputWithButton";
import NavBar from "./NavBar";
import { motion } from "framer-motion";
import { BookOpen, Users, Share2 } from "lucide-react";
import { BackgroundLines } from "./BackgroundLines";
import { GlareCard } from "./ui/GlareCard";
import { WobbleCardDemo } from "./WobbleCardDemo";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";




export function LandingPage() {
    const navigate = useNavigate();
    const { isAuthenticated, isVerified } = useAuthStore();

    if (isAuthenticated && isVerified) {
        navigate("/dashboard");
    } else {
        navigate("/");
    }

    const features = [
        {
            icon: <BookOpen className="w-6 h-6" />,
            title: "Resource Sharing",
            description: "Share books, notes, and study materials easily"
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Community Building",
            description: "Connect with peers and build lasting relationships"
        },
        {
            icon: <Share2 className="w-6 h-6" />,
            title: "Easy Exchange",
            description: "Seamless platform for lending and borrowing"
        }
    ];


    return (
        <div className="w-full flex flex-col bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">



            <NavBar properties={"bg-transparent border-none"} />
            <div className="min-h-screen w-full flex md:items-center md:justify-center relative">
                <SpotLight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

                {/* Content Wrapper */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">

                    <div className="text-center space-y-8">
                        {/* Main Heading */}
                        <BackgroundLines className={"absolute -z-20 top-1/4 left-1/2 w-1/2 -translate-y-1/2  -translate-x-1/2"} >

                        </BackgroundLines>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-5xl md:text-7xl font-bold netflix bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 tracking-tight leading-none"
                        >
                            Campus Resource
                            <span className="block mt-2 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                                Exchange Hub
                            </span>
                        </motion.h1>

                        {/* Subheading */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-300 leading-relaxed"
                        >
                            Empowering students through seamless resource sharing and community building.
                            Join the movement to create a more collaborative campus environment.
                        </motion.p>

                        {/* CTA Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex justify-center"
                        >
                            <InputWithButton />
                        </motion.div>

                        {/* Features Grid */}

                    </div>
                </div>
            </div>

            <WobbleCardDemo />

            {/* Timeline Section */}
            <div className="bg-white/5 backdrop-blur-lg">



                <Timeline />
            </div>
        </div>
    );
}

export default LandingPage;