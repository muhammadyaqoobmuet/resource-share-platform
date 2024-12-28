import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VerifyOTP() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/auth/verify", data);
            toast.success(response.data + " login now ");
            if (response.data) {
                navigate('/dashboard')
            }
        } catch (error) {
            toast.error("Verification failed. Please try again.");
            console.error("Verification Error:", error.response?.data || error.message);
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
                    <Button type="submit" className="w-full py-2 bg-blue-600 text-white">Verify</Button>
                </form>
            </div>
        </div>
    );
}

export default VerifyOTP;
