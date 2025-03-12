import React, { useState } from 'react';
import { DashboardStats } from './components/DashboardStats';
import { ProductForm } from './components/ProductForm';
import { ProductTable } from './components/ProductTable';
import { OrdersPage } from './pages/Orders';
import { ProductsPage } from './pages/Products';
import { Product } from './types';
import { demoProducts, demoOrders } from './data';
import { ClipboardList, Package } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [products, setProducts] = useState<Product[]>(demoProducts);
  const [showOrders, setShowOrders] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSaveProduct = (newProduct: Omit<Product, 'id' | 'createdAt'>) => {
    const product: Product = {
      ...newProduct,
      id: (products.length + 1).toString(),
      createdAt: new Date().toISOString(),
      variations: newProduct.variations.map((v, index) => ({
        ...v,
        id: `${products.length + 1}-${index + 1}`
      }))
    };
    setProducts([...products, product]);
    toast.success('Product added successfully');
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  if (showOrders) {
    return <OrdersPage orders={demoOrders} onBack={() => setShowOrders(false)} />;
  }

  if (showProducts) {
    return (
      <ProductsPage
        products={products}
        onBack={() => setShowProducts(false)}
        onUpdate={handleUpdateProduct}
        onDelete={handleDeleteProduct}
        onView={(product) => setSelectedProduct(product)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Fashion Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowProducts(true)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow transition-shadow text-gray-700 hover:text-gray-900"
            >
              <Package className="w-5 h-5" />
              <span>View Products</span>
            </button>
            <button
              onClick={() => setShowOrders(true)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow transition-shadow text-gray-700 hover:text-gray-900"
            >
              <ClipboardList className="w-5 h-5" />
              <span>View Orders</span>
            </button>
          </div>
        </div>
        
        <DashboardStats products={products} orders={demoOrders} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <ProductForm onSave={handleSaveProduct} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;