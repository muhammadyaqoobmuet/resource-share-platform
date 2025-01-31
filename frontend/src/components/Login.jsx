import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

import { Eye, EyeOff } from "lucide-react";
import useAuthStore from "../store/authStore";

function Login() {
    const { login, isLoading, error, isAuthenticated } = useAuthStore();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    console.log(errors);
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
        navigate("/dashboard");
        return null;
    }

    const onSubmit = async (data) => {
        try {
            await login(data);
            toast.success("Welcome back! 🎉");
            navigate("/dashboard");
        } catch (error) {
            if (error?.message == "account not Verified") {
                navigate('/verify')
            }

            toast.error(error?.message || "Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl">
                {/* Image Section */}
                <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                    <img
                        src="./../../public/images/login.jpg"
                        className="h-full grayscale  w-full object-cover"
                        alt="Student collaboration"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30 md:bg-gradient-to-t" >
                        <div className="absolute  bottom-0 w-full text-center bg-[#225BE4] text-white ">
                            <h1 className="text-3xl poppins-semibold tracking-wide font-bold mb-4 bg-gradient-to-r from-blue-400 via-[#cd9edae7] to-white bg-clip-text text-transparent">
                                Explore communities
                            </h1>

                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/2 bg-[#0A0A0A] p-4 sm:p-6 lg:p-12">
                    <div className="max-w-md mx-auto">
                        <div className="text-center mb-8 md:mb-12">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                                Welcome Back
                            </h2>
                            <p className="text-gray-400 text-sm sm:text-base">
                                Sign in to access your account
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                            {/* Email Field */}
                            <div>
                                <label className="block text-sm sm:text-base font-medium text-gray-300 mb-2">
                                    University Email
                                </label>
                                <Input
                                    type="email"
                                    placeholder="you@students.muet.edu.pk"
                                    className="bg-gray-800 border-gray-700 text-white rounded-lg py-2 sm:py-3 px-4 
                                             focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+/i,
                                            message: "Please enter a valid email"
                                        }
                                    })}
                                />
                                {errors.email && (
                                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-400">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm sm:text-base font-medium text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="bg-gray-800 border-gray-700 text-white rounded-lg py-2 sm:py-3 px-4 pr-12 
                                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                        {...register("password", {
                                            required: "Password is required"
                                        })}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-2 sm:top-3 text-gray-400 hover:text-blue-400 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                                        ) : (
                                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-400">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between text-sm sm:text-base">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-blue-500 
                                                 focus:ring-blue-500 focus:ring-offset-gray-900"
                                    />
                                    <label htmlFor="remember" className="ml-2 text-gray-300">
                                        Remember me
                                    </label>
                                </div>
                                <Link
                                    to="/forgot-password"
                                    className="text-blue-500 hover:text-blue-400 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-2.5 sm:py-3.5 font-medium rounded-lg transition-all 
                                          text-sm sm:text-base ${isLoading
                                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Signing in...
                                    </div>
                                ) : (
                                    "Sign in"
                                )}
                            </Button>

                            {/* Sign Up Link */}
                            <p className="text-center text-gray-400 text-sm sm:text-base">
                                Don't have an account?{' '}
                                <Link
                                    to="/signup"
                                    className="text-blue-500 hover:text-blue-400 transition-colors font-medium"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </form>

                        {/* Error Message */}
                        {error && (
                            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                <p className="text-red-400 text-sm text-center">{error}
                                    <br />
                                    <span onClick={() => navigate('/verify')} className="text-white underline cursor-pointer">account not verified ?</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
