import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import GenralLoader from "./GenralLoader";

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
        PENDING: "bg-gradient-to-r from-yellow-500/30 to-amber-500/20 text-amber-300 border border-amber-500/30",
        APPROVED: "bg-gradient-to-r from-green-500/30 to-emerald-500/20 text-emerald-300 border border-emerald-500/30",
        REJECTED: "bg-gradient-to-r from-red-500/30 to-rose-500/20 text-rose-300 border border-rose-500/30",
        ACCEPTED: "bg-gradient-to-r from-blue-500/30 to-cyan-500/20 text-cyan-300 border border-cyan-500/30",
        DECLINED: "bg-gradient-to-r from-purple-500/30 to-indigo-500/20 text-indigo-300 border border-indigo-500/30"
    };

    if (isLoading) return <GenralLoader />;
    if (isError) return <div className="text-center text-red-400 py-8">Error loading requests</div>;

    return (
        <div className="min-h-screen max-w-[2000px] mx-auto bg-[#0a0a0a] p-6 sm:p-8 lg:p-12">
            {/* Page Heading */}
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Received Requests
                </h1>
                <p className="mt-3 text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
                    Manage incoming resource requests
                </p>
            </div>

            {/* Table Container */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-800 overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                    {/* Table Header */}
                    <thead className="bg-gray-800/90">
                        <tr>
                            {["Item", "User", "Status", "Date", "Return Date", "Actions"].map((header) => (
                                <th key={header} className="px-4 py-4 sm:px-6 sm:py-5 text-left text-sm font-medium text-gray-300">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y divide-gray-800/50">
                        {data.map((row) => (
                            <tr
                                key={row.id}
                                className="hover:bg-gray-800/40 transition-colors"
                            >
                                <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-200 font-medium">{row.resourceDto.name}</td>
                                <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-300">{row.borrower.name}</td>
                                <td className="px-4 py-3 sm:px-6 sm:py-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm ${statusStyles[row.status]}`}>
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-400">{row.requestDate}</td>
                                <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-400">{row.returnDate || "N/A"}</td>
                                <td className="px-4 py-3 sm:px-6 sm:py-4">
                                    <div className="flex justify-center gap-3">
                                        {row.status !== "ACCEPTED" && row.status !== "DECLINED" && (
                                            <>
                                                <Button
                                                    onClick={() => approveMutation.mutate(row)}
                                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${approveMutation.isLoading
                                                            ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                                                            : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                                                        }`}
                                                    disabled={approveMutation.isLoading}
                                                >
                                                    {approveMutation.isLoading ? 'Approving...' : 'Approve'}
                                                </Button>
                                                <Button
                                                    onClick={() => declineMutation.mutate(row)}
                                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${declineMutation.isLoading
                                                            ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                                                            : "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white"
                                                        }`}
                                                    disabled={declineMutation.isLoading}
                                                >
                                                    {declineMutation.isLoading ? 'Declining...' : 'Decline'}
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