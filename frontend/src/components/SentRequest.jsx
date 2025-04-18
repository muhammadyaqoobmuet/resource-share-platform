import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from "./ui/button";
import axiosInstance from '@/utils/axiosInstance';
import { toast } from 'react-toastify';
import GenralLoader from './GenralLoader';
import { Mail, AlertCircle, MessageCircle } from 'lucide-react';

const SentRequest = () => {
    // Fetching data using React Query
    const { data, isLoading, isError } = useQuery({
        queryKey: ['sentRequests'],
        queryFn: () => axiosInstance.get('/request/sent').then(res => res.data),
    });

    const queryClient = useQueryClient();



    // Mutation for deleting a request
    const mutation = useMutation({
        mutationFn: (id) => axiosInstance.delete(`/request/cancel/${id}`).then(res => res.data),
        onSuccess: (deletedRequest) => {
            // Show success toast
            toast.success('Request cancelled successfully');

            // Optimistically update the cache by removing the deleted request
            queryClient.setQueryData('sentRequests', (oldData) =>
                oldData.filter((request) => request.id !== deletedRequest.id)
            );
        },
        onError: () => {
            // Show error toast
            window.location.reload()

        },
    });

    const handleDelete = (id) => {
        mutation.mutate(id);
    };

    const statusStyles = {
        PENDING: "bg-gradient-to-r from-yellow-500/30 to-amber-500/20 text-amber-300 border border-amber-500/30",
        APPROVED: "bg-gradient-to-r from-green-500/30 to-emerald-500/20 text-emerald-300 border border-emerald-500/30",
        REJECTED: "bg-gradient-to-r from-red-500/30 to-rose-500/20 text-rose-300 border border-rose-500/30",
        ACCEPTED: "bg-gradient-to-r from-blue-500/30 to-cyan-500/20 text-cyan-300 border border-cyan-500/30",
        DECLINED: "bg-gradient-to-r from-purple-500/30 to-indigo-500/20 text-indigo-300 border border-indigo-500/30"
    };

    if (isLoading) return <GenralLoader />;
    if (isError) return <div className="text-center text-red-400 py-8">Error loading requests</div>;
    console.log(data);
    return (
        <div className="min-h-screen max-w-[2000px] mx-auto bg-[#0a0a0a] p-6 sm:p-8 lg:p-12">
            {/* Warning Banner */}
            <div className="mb-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/20 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                        <h3 className="text-blue-400 font-medium mb-1">Communication Options</h3>
                        <p className="text-gray-300 text-xl leading-relaxed ">
                            you can communate about each request seprately by clicking the respective request  icons.
                            <span className="text-red-400 ml-1">
                                Note: share any sensitive information at your own risk.
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Page Heading */}
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Sent Requests
                </h1>
                <p className="mt-3 text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
                    Manage your resource sharing requests
                </p>
            </div>

            {/* Table Container */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-800 overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                    {/* Table Header */}
                    <thead className="bg-gray-800/90">
                        <tr>
                            {["Item", "User", "Lender", "Status", "Date", "Return Date", "Actions"].map((header) => (
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
                                <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-300 flex items-center">
                                    {row.lender.name}
                                    {row.status === "ACCEPTED" && (
                                        <div className="flex items-center gap-2">
                                            <a
                                                href={`mailto:${row.lender.email}`}
                                                className="ml-2 inline-flex items-center p-1 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 transition-all hover:scale-110 group relative"
                                                title={`Send email to ${row.lender.email}`}
                                            >
                                                <Mail className="w-4 h-4 text-cyan-300" />
                                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-cyan-100 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg border border-gray-700">
                                                    {row.lender.email}
                                                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 transform rotate-45 border-b border-r border-gray-700"></div>
                                                </span>
                                            </a>
                                            <a
                                                href={`https://tlk.io/request-${row.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center p-1 rounded-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 transition-all hover:scale-110 group relative"
                                                title="Start private chat"
                                            >
                                                <MessageCircle className="w-4 h-4 text-purple-300" />
                                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-purple-100 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg border border-gray-700">
                                                    Private Chat Room
                                                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 transform rotate-45 border-b border-r border-gray-700"></div>
                                                </span>
                                            </a>
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-3 sm:px-6 sm:py-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm ${statusStyles[row.status]}`}>
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-400">{row.requestDate}</td>
                                <td className="px-4 py-3 sm:px-6 sm:py-4 text-gray-400">{row.returnDate}</td>
                                <td className="px-4 py-3 sm:px-6 sm:py-4">
                                    <div className="flex justify-center">
                                        <Button
                                            onClick={() => handleDelete(row.id)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mutation.isLoading || ['ACCEPTED', 'DECLINED'].includes(row.status)
                                                ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                                                : "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white"
                                                }`}
                                            disabled={mutation.isLoading || ['ACCEPTED', 'DECLINED'].includes(row.status)}
                                        >
                                            {mutation.isLoading ? 'Canceling...' : 'Cancel'}
                                        </Button>
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

export default SentRequest;