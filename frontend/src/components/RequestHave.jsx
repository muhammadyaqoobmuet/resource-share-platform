import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

const RequestHave = () => {
    const queryClient = useQueryClient();

    // Fetching data using React Query
    const { data, isLoading, isError } = useQuery({
        queryKey: ["receiveRequests"],
        queryFn: () => axiosInstance.get("/request/receive").then((res) => res.data),
    });

    console.log("requst got", data);

    // Mutation for approving a request
    const approveMutation = useMutation({
        mutationFn: (row) =>
            axiosInstance.put(`/request/approve`, row).then((res) => res.data),
        onSuccess: () => {
            toast.success("Request approved successfully");
            // Refetch or optimistically update the cache
            queryClient.invalidateQueries(["receiveRequests"]);
            window.location.reload()
        },
        onError: () => {
            toast.error("Error approving request");
            window.location.reload()
        },
    });

    // Mutation for declining a request (if applicable)
    const declineMutation = useMutation({
        mutationFn: (row) =>
            axiosInstance.put(`/request/decline/${row.id}`).then((res) => res.data),
        onSuccess: () => {
            toast.success("Request declined successfully");
            queryClient.invalidateQueries(["receiveRequests"]);
        },
        onError: () => {
            toast.error("Error declining request");
        },
    });

    const statusStyles = {
        Pending: "bg-yellow-200 text-yellow-700",
        Approved: "bg-green-500 text-white",
        Rejected: "bg-red-500 text-white",
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    return (
        <div className="min-h-screen max-w-[2000px] mx-auto bg-gray-50 p-8">
            {/* Page Heading */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold bg-clip-text text-[#0e1726]">
                    Received Request
                </h1>
                <p className="mt-2 text-gray-600">
                    Review and manage the resource requests efficiently
                </p>
            </div>

            {/* Table Container */}
            <div className="w-full  mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
                <table className="min-w-full border-collapse text-left">
                    {/* Table Header */}
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-gray-600 font-semibold text-sm">
                                Item
                            </th>
                            <th className="px-6 py-4 text-gray-600 font-semibold text-sm">
                                User
                            </th>
                            <th className="px-10 py-4 text-gray-600 font-semibold text-sm">
                                Status
                            </th>
                            <th className="px-10 py-4 text-gray-600 font-semibold text-sm">
                                Date
                            </th>
                            <th className="px-10 py-4 text-gray-600 font-semibold text-sm">
                                Return Date
                            </th>
                            <th className="px-6 py-4 text-gray-600 font-semibold text-sm text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="bg-white">
                        {data.map((row, index) => (
                            <tr
                                key={index}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-gray-100 transition duration-150`}
                            >
                                <td className="px-6 py-4 text-gray-700 border-b border-gray-300">
                                    {row.resourceDto.name}
                                </td>
                                <td className="px-6 py-4 text-gray-700 border-b border-gray-300">
                                    {row.borrower.name}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-300">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyles[row.status]}`}
                                    >
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-6 py-3 text-gray-700 border-b border-gray-300">
                                    {row.requestDate}
                                </td>
                                <td className="px-6 py-4 text-gray-700 border-b border-gray-300">
                                    {row.returnDate || "no date availe for now"}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-300">
                                    <div className="flex justify-center gap-2">
                                        {row.status !== "ACCEPTED" && row.status !== "DECLINED" && (
                                            <>
                                                <Button
                                                    className="bg-[#10B981]"
                                                    onClick={() => approveMutation.mutate(row)}
                                                    disabled={approveMutation.isLoading}
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    className="bg-[#EF4444]"
                                                    onClick={() => declineMutation.mutate(row)}
                                                    disabled={declineMutation.isLoading}
                                                >
                                                    Decline
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestHave;
