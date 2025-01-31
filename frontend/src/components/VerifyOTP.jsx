import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import useAuthStore from "@/store/authStore"; // Import Zustand store
import { useNavigate } from "react-router-dom";

function VerifyOTP() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    // Destructure required values and methods from Zustand store
    const { verify, isLoading, error, email } = useAuthStore();

    const onSubmit = async (data) => {
        try {
            await verify(data); // Call verify method from Zustand store
            toast.success("Verification successful! Login now.");
            navigate("/dashboard");
        } catch (err) {
            toast.error(err.message || "Verification failed. Please try again.");
            console.error("Verification Error:", err.response?.data || err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
                <div className="w-full bg-[#0A0A0A] p-4 sm:p-6 lg:p-12">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                            Email Verification
                        </h2>
                        <p className="text-gray-400 text-sm sm:text-base">
                            Enter the verification code sent to your email
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-300 mb-2">
                                University Email
                            </label>
                            <Input
                                type="email"
                                value={email || null}
                                placeholder="you@students.muet.edu.pk"
                                className="bg-gray-800 border-gray-700 text-white rounded-lg py-2 sm:py-3 px-4 
                                         focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && (
                                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-400">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-300 mb-2">
                                Verification Code
                            </label>
                            <Input
                                type="text"
                                placeholder="Enter verification code"
                                className="bg-gray-800 border-gray-700 text-white rounded-lg py-2 sm:py-3 px-4 
                                         focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                {...register("verificationCode", { required: "Verification code is required" })}
                            />
                            {errors.verificationCode && (
                                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-400">
                                    {errors.verificationCode.message}
                                </p>
                            )}
                        </div>

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
                                    Verifying...
                                </div>
                            ) : (
                                "Verify Account"
                            )}
                        </Button>
                    </form>

                    {error && (
                        <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <p className="text-red-400 text-sm text-center">{error}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VerifyOTP;
