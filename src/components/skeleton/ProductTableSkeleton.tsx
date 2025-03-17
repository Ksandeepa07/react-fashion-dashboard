export default function ProductTableSkeleton(){


    return(

        [...Array(5)].map((_, index) => (
            <tr className="animate-pulse">
                <td className="px-6 py-4">
                    <div className="flex items-center">
                        <div className="h-10 w-10 bg-gray-300 rounded-lg"></div>
                        <div className="ml-4">
                            <div className="h-4 w-32 bg-gray-300 rounded"></div>
                            <div className="h-3 w-24 bg-gray-300 rounded mt-2"></div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                </td>
                <td className="px-6 py-4">
                    <div className="h-4 w-16 bg-gray-300 rounded"></div>
                </td>
                <td className="px-6 py-4">
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                </td>
                <td className="px-6 py-4">
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </td>
                <td className="px-6 py-4 text-right">
                    <div className="h-5 w-5 bg-gray-300 rounded inline-block mx-1"></div>
                    <div className="h-5 w-5 bg-gray-300 rounded inline-block mx-1"></div>
                </td>
            </tr>
        ))
    )

}

