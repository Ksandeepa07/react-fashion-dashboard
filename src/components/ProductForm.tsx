import {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {Plus, Upload, X} from 'lucide-react';
import {Product, ProductVariation} from '../types';
import {saveProduct} from '../api/product.ts'
import toast from "react-hot-toast";


export function ProductForm() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [variations, setVariations] = useState<Omit<ProductVariation, 'id'>[]>(
        [{size: '', price: 0, quantity: 0}]
    );

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const readFiles = acceptedFiles.map((file) => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
            });
        });

        Promise.all(readFiles)
            .then((base64Images) => {
                setImages((prev) => [...prev, ...base64Images]);
            })
            .catch((error) => console.error("Error reading files:", error));
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        },
        multiple: false
    });

    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleAddVariation = () => {
        setVariations([...variations, {size: '', price: 0, quantity: 0}]);
    };

    const handleVariationChange = (index: number, field: keyof ProductVariation, value: string | number) => {
        const newVariations = [...variations];
        newVariations[index] = {...newVariations[index], [field]: value};
        setVariations(newVariations);
    };

    const handleRemoveVariation = (index: number) => {
        setVariations(variations.filter((_, i) => i !== index));
    };

    const clearFields=()=>{
        setName('');
        setDescription('');
        setCategory('');
        setImages([]);
        setVariations([]);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = await saveProduct({name, description, images, variations, category})
        if (data){
            clearFields();
        }
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
                        className="mt-1 p-3 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                        style={{boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'}}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                        style={{boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'}}
                    />
                </div>

                <div style={{marginBottom: '10px'}}>
                    <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151'}}>
                        Category
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            backgroundColor: '#fff',
                            fontSize: '14px',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer',
                        }}
                    >
                        <option value="">Select a category</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                    <div
                        {...getRootProps()}
                        className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg
              ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
                    >
                        <div className="space-y-2 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400"/>
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
                                        <X className="w-4 h-4"/>
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


                                    {/*variation size*/}
                                    <div>
                                        <select
                                            onChange={(e) => handleVariationChange(index, 'size', e.target.value)}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '10px',
                                                borderRadius: '8px',
                                                border: '1px solid #ccc',
                                                backgroundColor: '#fff',
                                                fontSize: '14px',
                                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <option value="">Select a size</option>
                                            <option value="M">M</option>
                                            <option value="L">L</option>
                                            <option value="XL">XL</option>
                                            <option value="XXL">XXL</option>
                                        </select>
                                    </div>

                                    {/*variation size end*/}


                                    {/*variation price*/}

                                    <input
                                        type="number"
                                        // value={variation.price}
                                        onChange={(e) => handleVariationChange(index, 'price', parseFloat(e.target.value))}
                                        placeholder="Price"
                                        min="0"
                                        step="0.01"
                                        className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                        style={{boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'}}
                                    />

                                    {/*variation price end*/}


                                    {/*variation quantity*/}

                                    <input
                                        type="number"
                                        // value={variation.quantity}
                                        onChange={(e) => handleVariationChange(index, 'quantity', parseInt(e.target.value))}
                                        placeholder="Quantity"
                                        min="0"
                                        className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                        style={{boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'}}
                                    />

                                    {/*variation quantity end*/}

                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveVariation(index)}
                                    className="p-2 text-red-500 hover:text-red-700"
                                >
                                    <X className="w-5 h-5"/>
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddVariation}
                            className="w-full py-2 px-4 border-2 border-dashed border-indigo-300 rounded-lg text-indigo-600 hover:border-indigo-500 hover:text-indigo-700 flex items-center justify-center"
                        >
                            <Plus className="w-4 h-4 mr-1"/> Add Variation
                        </button>
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="mt-8 w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
                Save Product
            </button>
        </form>
    );
}