import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Dashboard() {
    const navigate = useNavigate();

    // Check if the user is authenticated
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to access the dashboard.");
            navigate("/login"); // Redirect to login if token doesn't exist
        }
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-6">
            <h2 className="text-3xl font-semibold mb-6">Welcome to the Dashboard</h2>

            {/* Cards for Borrow, Donate, Rent */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
                {/* Borrow Card */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img
                        src="https://via.placeholder.com/400x250"
                        alt="Borrow"
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <h3 className="text-xl font-semibold">Borrow</h3>
                        <p className="text-gray-600">Browse items available for borrowing. Choose what you need.</p>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Explore</button>
                    </div>
                </div>

                {/* Donate Card */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img
                        src="https://via.placeholder.com/400x250"
                        alt="Donate"
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <h3 className="text-xl font-semibold">Donate</h3>
                        <p className="text-gray-600">Help others by donating items you no longer need.</p>
                        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg">Donate Now</button>
                    </div>
                </div>

                {/* Rent Card */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img
                        src="https://via.placeholder.com/400x250"
                        alt="Rent"
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <h3 className="text-xl font-semibold">Rent</h3>
                        <p className="text-gray-600">Find items available for rent. Rent what you need for a short time.</p>
                        <button className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg">Rent Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
