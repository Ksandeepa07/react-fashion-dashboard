export default function OrderTableSkeleton(){
    return(
        Array(5).fill(0).map((_, index) => (
        <tr key={index} className="hover:bg-gray-50 transition-colors animate-pulse">
            <td className="px-6 py-4">
                <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
            </td>

            <td className="px-6 py-4">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
            </td>

            <td className="px-6 py-4">
                <div className="space-y-1">
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                </div>
            </td>

            <td className="px-6 py-4">
                <div className="h-3 bg-gray-200 rounded w-28"></div>
            </td>

            <td className="px-6 py-4">
                <div className="h-3 bg-gray-200 rounded w-20"></div>
            </td>

            <td className="px-6 py-4 text-left">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
            </td>

            <td className="px-6 py-4">
                <div className="h-4 bg-gray-300 rounded w-20"></div>
            </td>

            <td className="px-6 py-4 text-center">
                <div className="h-5 w-5 bg-gray-300 rounded"></div>
            </td>
        </tr>
    ))
    )
}