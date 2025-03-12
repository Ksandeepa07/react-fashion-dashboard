import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Plus, X, Upload } from 'lucide-react';
import { Product, ProductVariation } from '../types';

interface ProductFormProps {
  onSave: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  initialData?: Product;
  submitLabel?: string;
}

export function ProductForm({ onSave, initialData, submitLabel = 'Save Product' }: ProductFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [variations, setVariations] = useState<Omit<ProductVariation, 'id'>[]>(
    initialData?.variations.map(v => ({
      color: v.color,
      size: v.size,
      price: v.price,
      quantity: v.quantity
    })) || [{ color: '', size: '', price: 0, quantity: 0 }]
  );

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...newImages]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true
  });

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAddVariation = () => {
    setVariations([...variations, { color: '', size: '', price: 0, quantity: 0 }]);
  };

  const handleVariationChange = (index: number, field: keyof ProductVariation, value: string | number) => {
    const newVariations = [...variations];
    newVariations[index] = { ...newVariations[index], [field]: value };
    setVariations(newVariations);
  };

  const handleRemoveVariation = (index: number) => {
    setVariations(variations.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      description,
      images,
      variations
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
          <div
            {...getRootProps()}
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg
              ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
          >
            <div className="space-y-2 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="text-sm text-gray-600">
                <input {...getInputProps()} />
                <p>Drag & drop images here, or click to select files</p>
                <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB each</p>
              </div>
            </div>
          </div>

          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="h-24 w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Variations</label>
          <div className="space-y-4">
            {variations.map((variation, index) => (
              <div key={index} className="flex gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                  <input
                    type="text"
                    value={variation.color}
                    onChange={(e) => handleVariationChange(index, 'color', e.target.value)}
                    placeholder="Color"
                    className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                  <input
                    type="text"
                    value={variation.size}
                    onChange={(e) => handleVariationChange(index, 'size', e.target.value)}
                    placeholder="Size"
                    className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                  <input
                    type="number"
                    value={variation.price}
                    onChange={(e) => handleVariationChange(index, 'price', parseFloat(e.target.value))}
                    placeholder="Price"
                    min="0"
                    step="0.01"
                    className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                  <input
                    type="number"
                    value={variation.quantity}
                    onChange={(e) => handleVariationChange(index, 'quantity', parseInt(e.target.value))}
                    placeholder="Quantity"
                    min="0"
                    className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveVariation(index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddVariation}
              className="w-full py-2 px-4 border-2 border-dashed border-indigo-300 rounded-lg text-indigo-600 hover:border-indigo-500 hover:text-indigo-700 flex items-center justify-center"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Variation
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
      >
        {submitLabel}
      </button>
    </form>
  );
}