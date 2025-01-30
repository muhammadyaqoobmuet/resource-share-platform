import useAuthStore from "@/store/authStore";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import GenralLoader from "./GenralLoader";

function Transactions() {
    const queryClient = useQueryClient();
    const { token } = useAuthStore();

    const headers = {
        Authorization: `Bearer ${token}`,

    };

    // Fetch borrowed items
    const { data: borrowedItems, isLoading: borrowedLoading } = useQuery({
        queryKey: ["borrowedItems"],
        queryFn: () => axios.get("http://localhost:8080/transactions/borrowed", { headers })
            .then((res) => res.data),
    });

    // Fetch lent items
    const { data: lentItems, isLoading: lentLoading } = useQuery({
        queryKey: ["lentItems"],
        queryFn: () => axios.get("http://localhost:8080/transactions/lent", { headers })
            .then((res) => res.data),
    });

    // Mutations
    const returnMutation = useMutation({
        mutationFn: (id) => axios.patch(
            `http://localhost:8080/transactions/return/${id}`, {}, { headers }


        ),
        onSuccess: () => {
            queryClient.invalidateQueries(["borrowedItems"]);
            toast.success("Return request sent successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data || "Failed to send return request");
        }
    });

    const confirmMutation = useMutation({
        mutationFn: (id) => axios.patch(
            `http://localhost:8080/transactions/confirm/${id}`,
            {},
            { headers }
        ),
        onSuccess: () => {
            queryClient.invalidateQueries(["lentItems"]);
            toast.success("Return confirmed successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data || "Failed to confirm return");
        }
    });

    const declineMutation = useMutation({
        mutationFn: ({ id, disputeDetails }) => axios.patch(
            `http://localhost:8080/transactions/decline/${id}`,
            { disputeDetails },
            { headers }
        ),
        onSuccess: () => {
            queryClient.invalidateQueries(["lentItems"]);
            toast.info("Return request declined");
        },
        onError: (error) => {
            toast.error(error.response?.data || "Failed to decline return");
        }
    });
    const handleReturn = (itemId) => {
        returnMutation.mutate(itemId);
    };

    const handleConfirmReturn = (itemId) => {
        confirmMutation.mutate(itemId);
    };

    const handleDeclineReturn = (itemId) => {
        // For simplicity, using a basic reason. You could add a modal for reason input
        declineMutation.mutate({
            id: itemId,
            disputeDetails: "Item condition unsatisfactory"
        });
    };

    const statusStyles = {
        Pending: "bg-gradient-to-r from-yellow-500/30 to-amber-500/20 text-amber-300 border border-amber-500/30",
        Active: "bg-gradient-to-r from-green-500/30 to-emerald-500/20 text-emerald-300 border border-emerald-500/30",
        Dispute: "bg-gradient-to-r from-red-500/30 to-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse",
        Completed: "bg-gradient-to-r from-blue-500/30 to-cyan-500/20 text-cyan-300 border border-cyan-500/30",
        PendingConfirmation: "bg-gradient-to-r from-purple-500/30 to-indigo-500/20 text-indigo-300 border border-indigo-500/30",
        Disputed: "bg-gradient-to-r from-red-500/30 to-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse",
        // Add any other status variations you might have
    };

    if (borrowedLoading || lentLoading) {
        return <GenralLoader />;
    }

    return (
        <div className="min-h-screen max-w-[2000px] mx-auto bg-[#0a0a0a] p-6 sm:p-8 lg:p-12">
            {/* Page Heading */}
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Transaction History
                </h1>
                <p className="mt-3 text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
                    Track your resource sharing activities
                </p>
            </div>

            {/* Borrowed Items Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6 text-gray-200">Borrowed Resources</h2>
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-800 overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-gray-800/90">
                            <tr>
                                {["Item", "Lender", "Start Date", "End Date", "Status", "Actions"].map((header) => (
                                    <th key={header} className="px-4 py-4 sm:px-6 sm:py-5 text-left text-sm font-medium text-gray-300">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                            {borrowedItems?.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-800/40 transition-colors">
                                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-200 font-medium">{item.resource.name}</td>
                                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-300">{item.lender.name}</td>
                                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-400">{item.startDate}</td>
                                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-400">{item.endDate}</td>
                                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm text-white ${statusStyles[item.transactionStatus]}`}>
                                            {item.transactionStatus}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                                        <button
                                            onClick={() => handleReturn(item.id)}
                                            disabled={["PendingConfirmation", "DISPUTE", "COMPLETED"].includes(item.transactionStatus)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${["PendingConfirmation", "DISPUTE", "COMPLETED"].includes(item.transactionStatus)
                                                    ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                                                    : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                                                }`}
                                        >
                                            Return Item
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Lent Items Section */}
            <div>
                <h2 className="text-2xl font-semibold mb-6 text-gray-200">Lent Resources</h2>
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-800 overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-gray-800/90">
                            <tr>
                                {["Item", "Borrower", "Start Date", "End Date", "Status", "Actions"].map((header) => (
                                    <th key={header} className="px-4 py-4 sm:px-6 sm:py-5 text-left text-sm font-medium text-gray-300">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                            {lentItems?.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-800/40 transition-colors">
                                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-200 font-medium">{item.resource.name}</td>
                                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-300">{item.borrower.name}</td>
                                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-400">{item.startDate}</td>
                                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-400">{item.endDate}</td>
                                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                                        <span className={`inline-flex  text-white items-center px-3 py-1 rounded-full text-xs sm:text-sm ${statusStyles[item.transactionStatus]}`}>
                                            {item.transactionStatus}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                                        {item.transactionStatus === "PendingConfirmation" && (
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => handleConfirmReturn(item.id)}
                                                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    onClick={() => handleDeclineReturn(item.id)}
                                                    className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                                >
                                                    Decline
                                                </button>
                                            </div>
                                        )}
                                        {item.transactionStatus === "DISPUTE" && (
                                            <span className="text-rose-400 text-sm">Under Review</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Transactions;