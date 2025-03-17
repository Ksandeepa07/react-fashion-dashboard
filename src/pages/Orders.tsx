import {ArrowLeft, Eye} from 'lucide-react';
import {Order} from '../types';
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {fetchOrders} from "../api/orders.ts";
import orderTableSkeleton from "../components/skeleton/OrderTableSkeleton.tsx";
import OrderTableSkeleton from "../components/skeleton/OrderTableSkeleton.tsx";

interface OrdersPageProps {
    // orders: Order[];
    onBack: () => void;
}

export function OrdersPage({onBack}: OrdersPageProps) {

    const [ordersList, setOrders] = useState<Order[]>();


    async function fetchAll() {
        const data = await fetchOrders()
        if (data) {
            setOrders(data)
        }
    }


    useEffect(() => {
        fetchAll()
    }, []);


    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={onBack}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6"/>
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                            <tr className="bg-gray-50">
                              <th scope="col"
                                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer Details
                              </th>
                              <th scope="col"
                                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Order Date
                              </th>
                              <th scope="col"
                                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Products
                              </th>
                              <th scope="col"
                                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                address
                              </th>
                              <th scope="col"
                                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                city
                              </th>
                              <th scope="col"
                                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                postal code
                              </th>
                              <th scope="col"
                                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                              </th>
                              <th scope="col"
                                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                View
                              </th>
                            </tr>
                            </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                          {ordersList?.length > 0 ?
                              ordersList?.map((order) => (
                                      <tr  className="hover:bg-gray-50 transition-colors">
                                          <td className="px-6 py-4">
                                              {/*<div className="text-sm font-medium text-gray-900">#{order.id}</div>*/}
                                              <div
                                                  className="text-sm text-gray-500">{order.firstName + " " + order.lastName}</div>
                                              <div className="text-sm text-gray-400 mt-2">{order.email}</div>
                                          </td>

                                          <td className="px-6 py-4">
                                              <div className="text-xs text-gray-400">
                                                  {new Date(order.createdAt).toLocaleDateString()}
                                              </div>
                                          </td>

                                          <td className="px-6 py-4">
                                              <div className="space-y-1">
                                                  <div className="space-y-3">
                                                      {order.products.map((product) => (
                                                          <div className="text-sm text-gray-900">
                                                         <span
                                                             className="bg-green-100 rounded-full px-2 py-1 font-medium">
                                                               {product.size + " / Qty - " + product.quantity}
                                                         </span>

                                                          </div>
                                                      ))}
                                                  </div>
                                              </div>
                                          </td>
                                          <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium `}>
                        {order.address}
                      </span>
                                          </td>
                                          <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium `}>
                        {order.city}
                      </span>
                                          </td>
                                          <td className="px-6 py-4 text-left">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium `}>
                        {order.postalCode}
                      </span>
                                          </td>
                                          <td className="px-6 py-4">
                                              <div className="text-sm font-medium text-gray-900">
                                                  LKR {order.totalPrice.toFixed(2)}
                                              </div>
                                          </td>

                                          <td className="px-6 py-4 text-center">
                                              <button
                                                  // onClick={() => onView(product)}
                                                  className="text-gray-600 hover:text-gray-900"
                                                  title="View Details"
                                              >
                                                  <Eye className="w-5 h-5"/>
                                              </button>
                                          </td>
                                      </tr>

                                  )
                              )
                          :
                            <OrderTableSkeleton/>

                            }

                          </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
}