import {useEffect, useState} from 'react';
import {DashboardStats} from '../components/DashboardStats';
import {ProductForm} from '../components/ProductForm';
import {OrdersPage} from './Orders.tsx';
import {ProductsPage} from './Products';
import {ClipboardList, LogOut, Package} from 'lucide-react';
import toast, {Toaster} from 'react-hot-toast';
import {Link} from "react-router-dom";



function Dashboard() {
    const [showOrders, setShowOrders] = useState(false);
    const [showProducts, setShowProducts] = useState(false);

    function clearToken() {
        localStorage.removeItem('token')
    }

    if (showOrders) {
        return <OrdersPage onBack={() => setShowOrders(false)}/>;
    }

    if (showProducts) {
        return (
            <ProductsPage
                onBack={() => setShowProducts(false)}
            />
        );
    }


    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster position="top-right"/>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Fashion Dashboard</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowProducts(true)}
                            className="flex items-center bg-green-100 gap-2 px-4 py-2 rounded-lg shadow-sm hover:shadow transition-shadow text-gray-700 hover:text-gray-900"
                        >
                            <Package className="w-5 h-5"/>
                            <span>View Products</span>
                        </button>
                        <button
                            onClick={() => setShowOrders(true)}
                            className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg shadow-sm hover:shadow transition-shadow text-gray-700 hover:text-gray-900"
                        >
                            <ClipboardList className="w-5 h-5"/>
                            <span>View Orders</span>
                        </button>

                        <Link to={'/'}
                              onClick={clearToken}
                            className="flex items-center gap-2 bg-red-100 px-4 py-2 rounded-lg shadow-sm hover:shadow transition-shadow text-gray-700 hover:text-gray-900"
                        >
                            <LogOut className="w-5 h-5"/>
                        </Link>

                    </div>
                </div>

                <DashboardStats/>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
                        <ProductForm/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;