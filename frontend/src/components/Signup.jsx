import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const navigate = useNavigate();
    const { setName } = useAuth();

    const onSubmit = async (data) => {
        setIsLoading(true); // Set loading to true when request starts
        try {
            const response = await axios.post("http://localhost:8080/auth/signup", data);
            toast.success("Signup successful! Please verify your email.");
            console.log("Signup Response:", response.data);
            if (response.data) {
                navigate("/verify");
                setName(response.data.name);
            }
        } catch (error) {
            toast.error("Signup failed. Please try again.");
            console.error("Signup Error:", error.response?.data || error.message);
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <div className="my-36 flex items-center justify-center bg-gray-100">
            <div
                className="w-[500px] bg-white/30 backdrop-blur-md rounded-lg shadow-lg p-8 border border-white/40"
                style={{
                    boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
                }}
            >
                <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
                    Register
                </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 w-full"
                >
                    <div>
                        <label htmlFor="name" className="text-gray-700">
                            Name
                        </label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            className="bg-white/20 backdrop-blur-sm text-gray-800 border border-white/30 focus:outline-none focus:ring focus:ring-blue-300 rounded-lg"
                            {...register("name", {
                                required: "Name is required",
                            })}
                        />
                        {errors.name && (
                            <p className="text-red-600">{errors.name.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="email" className="text-gray-700">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="bg-white/20 backdrop-blur-sm text-gray-800 border border-white/30 focus:outline-none focus:ring focus:ring-blue-300 rounded-lg"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@students\.muet\.edu\.pk$/,
                                    message:
                                        "Enter a valid @muet.edu.pk email address",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-600">{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password" className="text-gray-700">
                            Password
                        </label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className="bg-white/20 backdrop-blur-sm text-gray-800 border border-white/30 focus:outline-none focus:ring focus:ring-blue-300 rounded-lg"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                                maxLength: {
                                    value: 12,
                                    message:
                                        "Password cannot exceed 12 characters",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-600">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className={`w-full py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={isLoading} // Disable button while loading
                    >
                        {isLoading ? "Registering..." : "Register"} {/* Show text based on loading */}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
