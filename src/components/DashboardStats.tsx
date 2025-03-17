import { ShoppingBag, Package, CheckCircle, DollarSign } from 'lucide-react';
import {Order, Product} from '../types';
import {fetchProducts} from "../api/product.ts";
import {useEffect, useState} from "react";
import {fetchOrders} from "../api/orders.ts";

export function DashboardStats() {
  // const completedOrders = orders.filter(order => order.status === 'completed');
  // const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0);

  const [products, setProducts] = useState<Product[]>();
  const [orders, setOrders] = useState<Order[]>([]);



  useEffect(() => {
    fetchAllProduct()
    fetchAllOrders()
  }, []);



  async function fetchAllProduct() {
    const data = await fetchProducts()
    if (data){
      setProducts(data)
    }
  }

  async function fetchAllOrders() {
    const data = await fetchOrders()
    if (data) {
      setOrders(data)
    }
  }

  const today = new Date().toISOString().split('T')[0];
  const todayOrders = orders.filter(order => order.createdAt?.startsWith(today));

  const stats = [
    {
      title: 'Total Products',
      value: products?.length ? products.length: 0 ,
      icon: ShoppingBag,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Orders',
      value: orders?.length ? orders.length:0,
      icon: Package,
      color: 'bg-green-500'
    },

    {
      title: 'Orders Today',
      value: todayOrders.length ? todayOrders.length:0,
      icon: CheckCircle,
      color: 'bg-purple-500'
    },

    {
      title: 'Total Income',
      value: new Intl.NumberFormat('en-LK', {
        style: 'currency',
        currency: 'LKR',
      }).format(orders.reduce((sum, order) => sum + order.totalPrice, 0)),
      icon: DollarSign,
      color: 'bg-yellow-500'
    }

  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
            </div>
            <div className={`${stat.color} p-3 rounded-full`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}