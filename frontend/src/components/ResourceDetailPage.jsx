import { useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery } from "@tanstack/react-query"; // React Query import
import axios from "axios";

import useAuthStore from "@/store/authStore";

import { Button } from "./ui/button";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";



// Function to fetch resource by ID



const fetchResourceById = async (id, token) => {



    if (!token) {
        throw new Error("No token found");
    }

    try {
        const response = await axios.get(`http://localhost:8080/resource/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching resource:", error);
        throw new Error("Failed to fetch resource details");
    }
};

const ResourceDetailPage = () => {




    const navigate = useNavigate();
    const { token, user } = useAuthStore();
    const { id } = useParams();
    const { data: resource, isLoading, error, isError } = useQuery({
        queryKey: ["resource", id],  // Key for caching
        queryFn: () => fetchResourceById(id, token),  // Function to fetch data
    });

    const mutation = useMutation({
        mutationFn: async (id) => {
            return axiosInstance.post(`request/create/${id}`)
        }
    })
    console.log(resource);  // i get this
    const userId = resource?.userId;
    console.log(resource?.userId); // i get 2

    const userStatus = useQuery({
        queryKey: ["user", userId],
        queryFn: () => axiosInstance.get(`/user/${userId}`),
        enabled: !!userId,
    });

    if (userStatus.isLoading) {
        console.log("Loading");
    }

    if (userStatus.isError) {
        console.log(userStatus.error);
    }
    if (!userStatus.isLoading) {

        console.log(userStatus.data?.data.name); // Use this to access fetched data
    }
    // Data is available as userStatus.data



    const handleSumbitofButton = async (id) => {

        try {
            mutation.mutate(id)


            toast.success('Request Sent')

            navigate('/sent-request')
            console.log("Request Sent")
        } catch (error) {
            console.error(error)
            toast.error("Failed to send request", error.message)
        }

    }

    // Handle loading and error states
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    if (!resource) {
        return <div>Resource not found</div>;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 relative">
            <div className="absolute right-0 top-0 p-10 ">
                <h1 onClick={() => navigate('/dashboard')} className="font-extrabold text-white text-xl rounded-full bg-red-900 px-4 cursor-pointer">X</h1>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                    src={resource.imageUrl || "/placeholder.svg?height=400&width=600"}
                    alt={resource.name}
                    className="w-full h-64 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4 text-blue-600">{resource.name}</h1>
                    <p className="text-xl font-bold tracking-wider">name: {userStatus.data?.data.name || "unkown"}</p>
                    <p className="text-gray-700 mb-4">description: {resource.description}</p>
                    <p className="text-sm text-gray-500 mb-4">
                        Category: <span className="text-gray-800">{resource.category}</span>
                    </p>

                    <p className="text-sm text-gray-500">
                        Resource Type: <span className="text-gray-800">{resource.resourceType}</span>
                    </p>
                </div>

                <Button disabled={user.name == userStatus.data?.data.name} onClick={() => handleSumbitofButton(resource.id)} className="w-full ">Get Now</Button>

            </div>
        </div>
    );
};

export default ResourceDetailPage;
