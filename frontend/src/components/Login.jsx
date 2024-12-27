import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input"; // Assuming Input is a component from ShadeCN
import { Button } from "@/components/ui/button"; // Assuming Button is a component from ShadeCN
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // You can handle the form submission logic here
        console.log("Form submitted", data);
    };

    const notifyError = (message) => toast.error(message);

    return (
        <div className="flex items-center justify-center bg-gray-100">
            {/* Form Container */}
            <div className="w-[500px] bg-[#f3f4f6c6] rounded-lg shadow-lg p-8 flex flex-col items-center">
                <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>

                {/* Form Section */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full p-10">
                    {/* Email Input */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-gray-700">Email</label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="p-2 border border-gray-300 rounded-lg mt-2"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@muet\.edu\.pk$/,
                                    message: "Please enter a valid @muet.edu.pk email address"
                                }
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-600 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-gray-700">Password</label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className="p-2 border border-gray-300 rounded-lg mt-2"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-600 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Log In
                    </Button>
                </form>

                {/* Sign Up Link */}
                <p className="text-center text-sm mt-4">
                    Don't have an account?{" "}
                    <Link to="signup">
                        <a href="/signup" className="text-blue-600 hover:text-blue-700">
                            Sign up
                        </a>
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
