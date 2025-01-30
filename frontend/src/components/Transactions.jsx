import useAuthStore from "@/store/authStore";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import GenralLoader from "./GenralLoader";

import { useState } from "react";

function Transactions() {
    const queryClient = useQueryClient();
    const { token } = useAuthStore();
    const [showDisputeDialog, setShowDisputeDialog] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [disputeType, setDisputeType] = useState("UNRETURNED_ITEM");



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

    // Add donation items query
    const { data: donationItems, isLoading: donationLoading } = useQuery({
        queryKey: ["donationItems"],
        queryFn: () => axios.get("http://localhost:8080/donation/", { headers })
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
        mutationFn: ({ id, disputeType }) => axios.patch(
            `http://localhost:8080/transactions/decline/${id}`,
            { disputeType },
            { headers }
        ),
        onSuccess: () => {
            queryClient.invalidateQueries(["lentItems"]);
            toast.info("Return request declined");
            setShowDisputeDialog(false);
        },
        onError: (error) => {
            toast.error(error.response?.data || "Failed to decline return");
        }
    });

    const disputeTypes = {
        UNRETURNED_ITEM: "Item Not Returned",
        DAMAGED_ITEM: "Item Damaged",
        OTHER: "Other Issue"
    };

    const handleReturn = (itemId) => {
        returnMutation.mutate(itemId);
    };

    const handleConfirmReturn = (itemId) => {
        confirmMutation.mutate(itemId);
    };

    const handleDeclineClick = (itemId) => {
        setSelectedItemId(itemId);
        setShowDisputeDialog(true);
    };

    const handleDisputeSubmit = () => {
        declineMutation.mutate({
            id: selectedItemId,
            disputeType: disputeType
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

    // Add this helper function to check if there are any disputed items
    const hasDisputedItems = () => {
        return lentItems?.some(item => item.transactionStatus === "Disputed") ||
            borrowedItems?.some(item => item.transactionStatus === "Disputed");
    };

    if (borrowedLoading || lentLoading || donationLoading) {
        return <GenralLoader />;
    }

    return (
        <div className="min-h-screen max-w-[2000px] mx-auto bg-[#0a0a0a] p-6 sm:p-8 lg:p-12">
            {/* Add this alert section right after the page heading */}
            {hasDisputedItems() && (
                <div className="mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 animate-pulse" />
                    <div className="relative bg-gray-900/80 backdrop-blur-sm border border-red-500/20 rounded-xl p-6">
                        <div className="flex items-start gap-4">
                            <div className="min-w-[40px] h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-red-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-red-400 mb-2">
                                    Active Dispute Notice
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    We've noticed there's an ongoing dispute with one or more of your transactions.
                                    Our admin team has been notified and will review the case shortly.
                                    We appreciate your patience while we work to resolve this matter.
                                </p>
                                <div className="mt-4 flex flex-wrap gap-3">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-red-500/20 text-red-300 border border-red-500/30">
                                        Under Review
                                    </span>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-orange-500/20 text-orange-300 border border-orange-500/30">
                                        Admin Notified
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Page Heading */}
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Transaction History
                </h1>
                <p className="mt-3 text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
                    Track your resource sharing activities
                </p>
            </div>

            {/* Donations Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6 text-gray-200">Donations</h2>
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-800 overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-gray-800/90">
                            <tr>
                                {["Resource", "Donor", "Recipient", "Actions"].map((header) => (
                                    <th key={header} className="px-4 py-4 sm:px-6 sm:py-5 text-left text-sm font-medium text-gray-300">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                            {donationItems?.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-800/40 transition-colors">
                                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-200 font-medium">
                                        {item.donatedResource}
                                    </td>
                                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-300">
                                        {item.ownerName}
                                    </td>
                                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-300">
                                        {item.recipientName}
                                    </td>
                                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm bg-gradient-to-r from-purple-500/30 to-blue-500/20 text-blue-300 border border-blue-500/30">
                                            Completed
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
                                                    onClick={() => handleDeclineClick(item.id)}
                                                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white"
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

            {/* Simplified Dispute Dialog */}
            {showDisputeDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-md w-full">
                        <h2 className="text-xl font-semibold text-gray-200 mb-2">
                            Decline Return Request
                        </h2>
                        <p className="text-gray-400 mb-4">
                            Please select the reason for declining the return request.
                        </p>

                        <select
                            value={disputeType}
                            onChange={(e) => setDisputeType(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg 
                                     text-gray-200 focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
                                     outline-none mb-4"
                        >
                            {Object.entries(disputeTypes).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDisputeDialog(false)}
                                className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDisputeSubmit}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Decline Return
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Transactions;