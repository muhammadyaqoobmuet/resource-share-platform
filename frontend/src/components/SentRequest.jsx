import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from "./ui/button";
import axiosInstance from '@/utils/axiosInstance';
import { toast } from 'react-toastify';

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

    console.log(data);
    return (
        <div className="min-h-screen max-w-[2000px] mx-auto bg-gray-50 p-8">
            {/* Page Heading */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold bg-clip-text text-[#0e1726]">Sent Request</h1>
                <p className="mt-2 text-gray-600">Review and manage the resource requests efficiently</p>
            </div>

            {/* Table Container */}
            <div className="w-full max-w-[90%] mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
                <table className="min-w-full border-collapse text-left">
                    {/* Table Header */}
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-gray-600 font-semibold text-sm">Item</th>
                            <th className="px-6 py-4 text-gray-600 font-semibold text-sm">User</th>
                            <th className="px-6 py-4 text-gray-600 font-semibold text-sm">Lender</th>
                            <th className="px-10 py-4 text-gray-600 font-semibold text-sm">Status</th>
                            <th className="px-10 py-4 text-gray-600 font-semibold text-sm">Date</th>
                            <th className="px-6 py-4 text-gray-600 font-semibold text-sm text-center">Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="bg-white">
                        {data.map((row, index) => (
                            <tr
                                key={index}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition duration-150`}
                            >
                                <td className="px-6 py-4 text-gray-700 border-b border-gray-300">{row.resourceDto.name}</td>
                                <td className="px-6 py-4 text-gray-700 border-b border-gray-300">{row.borrower.name}</td>
                                <td className="px-6 py-4 text-gray-700 border-b border-gray-300">{row.lender.name}</td>
                                <td className="px-6 py-4 border-b border-gray-300">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyles[row.status]}`}>
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-700 border-b border-gray-300">{row.requestDate}</td>
                                <td className="px-6 py-4 border-b border-gray-300">
                                    <div className="flex justify-center gap-2">
                                        <Button
                                            onClick={() => handleDelete(row.id)}
                                            className="bg-[#EF4444]"
                                            disabled={mutation.isLoading || row.status == 'ACCEPTED' || row.status == 'DECLINED'}
                                        >
                                            Cancel
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
