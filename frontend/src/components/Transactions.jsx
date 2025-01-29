import useAuthStore from "@/store/authStore";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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

    const statusStyles = {
        PENDING: "bg-yellow-200 text-yellow-700",
        ACTIVE: "bg-green-200 text-green-700",
        DISPUTE: "bg-red-200 text-red-700",
        COMPLETED: "bg-blue-200 text-blue-700"
    };

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

    if (borrowedLoading || lentLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen max-w-[2000px] mx-auto bg-gray-50 p-8">
            {/* Page Heading */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold bg-clip-text text-[#0e1726]">
                    Transactions History
                </h1>
                <p className="mt-2 text-gray-600">
                    Track your borrowed and lent items
                </p>
            </div>

            {/* Borrowed Items Section */}
            <div className="mb-12 max-w-[2000px] mx-auto">
                <h2 className="text-2xl font-semibold mb-4 text-[#0e1726]">Items You Borrowed</h2>
                <div className="max-w-[2000px] mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
                    <table className="min-w-full border-collapse text-left">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-gray-600 font-semibold text-sm">Item</th>
                                <th className="px-6 py-4 text-gray-600 font-semibold text-sm">Lender</th>
                                <th className="px-6 py-4 text-gray-600 font-semibold text-sm">Start Date</th>
                                <th className="px-6 py-4 text-gray-600 font-semibold text-sm">End Date</th>
                                <th className="px-6 py-4 text-gray-600 font-semibold text-sm">Status</th>
                                <th className="px-6 py-4 text-gray-600 font-semibold text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {borrowedItems?.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-100">
                                    <td className="px-6 py-4 border-b">{item.resource.name}</td>
                                    <td className="px-6 py-4 border-b">{item.lender.name}</td>
                                    <td className="px-6 py-4 border-b">{item.startDate}</td>
                                    <td className="px-6 py-4 border-b">{item.endDate}</td>
                                    <td className="px-6 py-4 border-b">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyles[item.transactionStatus]}`}>
                                            {item.transactionStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 border-b">

                                        <button
                                            onClick={() => handleReturn(item.id)}
                                            className={` text-white px-4 py-2 
                                            rounded-md text-sm font-medium transition-colors
                                            ${item.transactionStatus == "PendingConfirmation" || item.transactionStatus == "Disputed" || item.transactionStatus == "Completed" ? "bg-gray-500 cursor-not-allowed " : "bg-blue-500 hover:bg-blue-600"}
                                            `}
                                            disabled={item.transactionStatus == "PendingConfirmation" || item.transactionStatus == "Disputed" || item.transactionStatus == "Completed"}

                                        >
                                            {console.log("return item" + item.transactionStatus)}
                                            Return Item
                                        </button>

                                        {item.transactionStatus == "DISPUTE" && (
                                            <span className="text-red-500 text-sm">
                                                Issue reported to admin
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Lent Items Section */}
            <div className="max-w-[2000px] mx-auto">
                <h2 className="text-2xl font-semibold mb-4 text-[#0e1726]">Items You Lent</h2>
                <div className="w-full bg-white shadow-xl rounded-lg overflow-hidden">
                    <table className="min-w-full border-collapse text-left">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-gray-600 font-semibold text-sm">Item</th>
                                <th className="px-6 py-4 text-gray-600 font-semibold text-sm">Borrower</th>
                                <th className="px-6 py-4 text-gray-600 font-semibold text-sm">Start Date</th>
                                <th className="px-6 py-4 text-gray-600 font-semibold text-sm">End Date</th>
                                <th className="px-6 py-4 text-gray-600 font-semibold text-sm">Status</th>
                                <th className="px-6 py-4 text-gray-600 font-semibold text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lentItems?.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-100">
                                    <td className="px-6 py-4 border-b">{item.resource.name}</td>
                                    <td className="px-6 py-4 border-b">{item.borrower.name}</td>
                                    <td className="px-6 py-4 border-b">{item.startDate}</td>
                                    <td className="px-6 py-4 border-b">{item.endDate}</td>
                                    <td className="px-6 py-4 border-b">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyles[item.transactionStatus]}`}>
                                            {item.transactionStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {console.log(item.transactionStatus + "this is PendingConfirmation")}
                                        {item?.transactionStatus == "PendingConfirmation" && (

                                            <div className="flex gap-2 items-center">
                                                <button
                                                    onClick={() => handleConfirmReturn(item.id)}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                                >
                                                    Confirm Return
                                                </button>
                                                <button
                                                    onClick={() => handleDeclineReturn(item.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                                >
                                                    Decline Return
                                                </button>
                                            </div>
                                        )}
                                        {item.transactionStatus === "DISPUTE" && (
                                            <span className="text-red-500 text-sm">
                                                Issue reported to admin
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}

export default Transactions;
