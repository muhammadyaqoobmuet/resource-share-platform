import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function Login() {
    const { login } = useAuth(); // Use login from AuthContext
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/auth/login", data);
            const { token, expiresIn } = response.data;

            if (token) {
                const expirationTime = new Date().getTime() + expiresIn;
                localStorage.setItem("token", token);
                localStorage.setItem("tokenExpiration", expirationTime);
                login({ ...response.data, token }); // Update AuthContext with user data
                toast.success("Login successful!");
                navigate("/dashboard"); // Redirect to dashboard
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="   flex overflow-hidden items-center justify-center">
        <div className="my-36 flex items-center justify-center bg-gray-100">
    <div
        className="w-[500px] bg-white/30 backdrop-blur-md rounded-lg shadow-lg p-8 border border-white/40"
        style={{
            boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
        }}
    >
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
            Login
        </h2>
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 w-full"
        >
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
                    })}
                />
                {errors.password && (
                    <p className="text-red-600">{errors.password.message}</p>
                )}
            </div>
            <Button
                type="submit"
                className="w-full py-2  text-white rounded-lg shadow hover:bg-black/90"
            >
                Login
            </Button>
        </form>
    </div>
</div>

        </div>

    );
}

export default Login;
