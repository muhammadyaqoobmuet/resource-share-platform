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
    const { verify, isLoading, error } = useAuthStore();

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
        <div className="flex items-center justify-center bg-gray-100">
            <div className="w-[500px] bg-[#f3f4f6c6] rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-semibold text-center mb-6">Verify OTP</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                    <div>
                        <label htmlFor="email" className="text-gray-700">Email</label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="verificationCode" className="text-gray-700">Verification Code</label>
                        <Input
                            id="verificationCode"
                            type="text"
                            placeholder="Enter OTP"
                            {...register("verificationCode", { required: "Verification code is required" })}
                        />
                        {errors.verificationCode && <p className="text-red-600">{errors.verificationCode.message}</p>}
                    </div>
                    <Button
                        type="submit"
                        className={`w-full py-2 bg-blue-600 text-white ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isLoading} // Disable button while loading
                    >
                        {isLoading ? "Verifying..." : "Verify"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default VerifyOTP;
