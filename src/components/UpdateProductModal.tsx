import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Product, ProductVariation } from '../types';
import { ProductForm } from './ProductForm';

interface UpdateProductModalProps {
  product: Product;
  onClose: () => void;
  onUpdate: (product: Product) => void;
}

export function UpdateProductModal({ product, onClose, onUpdate }: UpdateProductModalProps) {
  const handleUpdate = (updatedData: Omit<Product, 'id' | 'createdAt'>) => {
    onUpdate({
      ...updatedData,
      id: product.id,
      createdAt: product.createdAt,
      variations: updatedData.variations.map((v, index) => ({
        ...v,
        id: product.variations[index]?.id || `${product.id}-${index + 1}`
      }))
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Update Product</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <ProductForm
            initialData={product}
            onSave={handleUpdate}
            submitLabel="Update Product"
          />
        </div>
      </div>
    </div>
  );
}