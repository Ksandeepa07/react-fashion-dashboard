import React from 'react';
import { ShoppingBag, Package, CheckCircle, DollarSign } from 'lucide-react';
import { Order, Product } from '../types';

interface StatsProps {
  productsCount: number;
  orders: Order[];
}

export function DashboardStats({ productsCount, orders }: StatsProps) {
  const completedOrders = orders.filter(order => order.status === 'completed');
  const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0);

  const stats = [
    {
      title: 'Total Products',
      value: productsCount,
      icon: ShoppingBag,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Orders',
      value: orders.length,
      icon: Package,
      color: 'bg-green-500'
    },
    {
      title: 'Completed Orders',
      value: completedOrders.length,
      icon: CheckCircle,
      color: 'bg-purple-500'
    },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
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