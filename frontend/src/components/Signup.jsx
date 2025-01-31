import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import useAuthStore from "@/store/authStore"; // Import your Zustand store
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Check, X } from "lucide-react";

function Signup() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState(0);
    const [validations, setValidations] = useState({
        length: false,
        number: false,
        special: false,
        capital: false
    });

    const navigate = useNavigate();
    // Destructure required values and methods from the store
    const { signup, setUser, isLoading, error, setEmail } = useAuthStore();
    const password = watch("password", ""); // Watch password field

    // Password strength checker
    useEffect(() => {
        const checks = {
            length: password.length >= 8,
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            capital: /[A-Z]/.test(password)
        };
        setValidations(checks);

        // Calculate strength
        const strengthScore = Object.values(checks).filter(Boolean).length;
        setStrength(strengthScore);
    }, [password]);

    const onSubmit = async (data) => {
        if (strength < 3) {
            toast.error("Please create a stronger password");
            return;
        }
        try {
            await signup(data);
            toast.success("Signup successful! Please verify your email.");
            setUser(data?.name);
            setEmail(data?.email);
            navigate("/verify");
        } catch (error) {
            toast.error("Signup failed. Please try again.");
            console.error("Signup Error:", error.response?.data || error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl">
                {/* Image Section - Full width on mobile, half on desktop */}
                <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                    <img
                        src="./../../public/images/shareme.jpg"
                        className="h-full w-full object-cover"
                        alt="Student collaboration"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30 md:bg-gradient-to-t">
                        {/* Optional: Add responsive text overlay if needed */}
                    </div>
                </div>

                {/* Form Section - Full width on mobile, half on desktop */}
                <div className="w-full md:w-1/2 bg-[#0A0A0A] p-4 sm:p-6 lg:p-12">
                    <div className="max-w-md mx-auto">
                        <div className="text-center mb-8 md:mb-12">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                                Create Account
                            </h2>
                            <p className="text-gray-400 text-sm sm:text-base">
                                Connect with thousands of students
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                            {/* Name Field */}
                            <div>
                                <label className="block text-sm sm:text-base font-medium text-gray-300 mb-2">
                                    Full Name
                                </label>
                                <Input
                                    type="text"
                                    placeholder="John Doe"
                                    className="bg-gray-800 border-gray-700 text-white rounded-lg py-2 sm:py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                    {...register("name", { required: "Name is required" })}
                                />
                                {errors.name && (
                                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-400">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm sm:text-base font-medium text-gray-300 mb-2">
                                    University Email
                                </label>
                                <Input
                                    type="email"
                                    placeholder="you@students.muet.edu.pk"
                                    className="bg-gray-800 border-gray-700 text-white rounded-lg py-2 sm:py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@(students\.muet\.edu\.pk|faculty\.muet\.edu\.pk)$/i,
                                            message: "Must be a valid MUET student email"
                                        }
                                    })}
                                />
                                {errors.email && (
                                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-400">{errors.email.message}</p>
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
                                        className="bg-gray-800 border-gray-700 text-white rounded-lg py-2 sm:py-3 px-4 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 8,
                                                message: "Password must be at least 8 characters"
                                            }
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

                                {/* Password Strength Indicator */}
                                {password && (
                                    <div className="mt-4 space-y-2 sm:space-y-4">
                                        <div className="flex gap-1.5">
                                            {[...Array(4)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`h-1.5 sm:h-2 flex-1 rounded-full transition-all ${i < strength
                                                        ? strength === 1 ? 'bg-red-500'
                                                            : strength === 2 ? 'bg-yellow-500'
                                                                : strength === 3 ? 'bg-green-500'
                                                                    : 'bg-blue-500'
                                                        : 'bg-gray-700'
                                                        }`}
                                                />
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                                            <div className="flex items-center gap-2 text-gray-400">
                                                {validations.length ?
                                                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" /> :
                                                    <X className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />}
                                                ≥8 characters
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-400">
                                                {validations.number ?
                                                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" /> :
                                                    <X className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />}
                                                Contains number
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-400">
                                                {validations.capital ?
                                                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" /> :
                                                    <X className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />}
                                                Uppercase letter
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-400">
                                                {validations.special ?
                                                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" /> :
                                                    <X className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />}
                                                Special character
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading || strength < 3}
                                className={`w-full py-2.5 sm:py-3.5 font-medium rounded-lg transition-all text-sm sm:text-base ${(isLoading || strength < 3)
                                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                            >
                                {isLoading ? "Creating Account..." : "Create Account"}
                            </Button>
                            <p className="text-center text-gray-400 text-sm sm:text-base">
                                have an account?{'  '}
                                <Link
                                    to="/signup"
                                    className="text-blue-500 hover:text-blue-400 transition-colors font-medium"
                                >
                                    Login now
                                </Link>
                            </p>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;