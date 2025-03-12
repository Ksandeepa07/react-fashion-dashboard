import React, { useState } from 'react';
import { ArrowLeft, Pencil, Trash2, Eye } from 'lucide-react';
import { Product } from '../types';
import { UpdateProductModal } from '../components/UpdateProductModal';
import toast, { Toaster } from 'react-hot-toast';

interface ProductsPageProps {
  products: Product[];
  onBack: () => void;
  onUpdate: (product: Product) => void;
  onDelete: (id: string) => void;
  onView: (product: Product) => void;
}

export function ProductsPage({ products, onBack, onUpdate, onDelete, onView }: ProductsPageProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleDelete = (product: Product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      onDelete(product.id);
      toast.success('Product deleted successfully');
    }
  };

  const handleUpdate = (updatedProduct: Product) => {
    onUpdate(updatedProduct);
    setShowUpdateModal(false);
    toast.success('Product updated successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Variations
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Stock
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-lg object-cover"
                            src={product.images[0]}
                            alt={product.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {product.variations.map((v) => (
                          <div key={v.id} className="mb-1">
                            {v.color} / {v.size} - ${v.price}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.variations.reduce((sum, v) => sum + v.quantity, 0)} units
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => onView(product)}
                        className="text-gray-600 hover:text-gray-900"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowUpdateModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showUpdateModal && selectedProduct && (
        <UpdateProductModal
          product={selectedProduct}
          onClose={() => {
            setShowUpdateModal(false);
            setSelectedProduct(null);
          }}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}