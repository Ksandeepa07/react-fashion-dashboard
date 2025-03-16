import axios from 'axios';
import {Product, ProductVariation} from "../types.ts";
import toast from "react-hot-toast";

const token = localStorage.getItem('token');


export async function fetchProducts(): Promise<Product[]> {
    try {
        const response = await axios.get<Product[]>('http://localhost:3003/api/v1/products/all',
            {headers: {
                    'Authorization': token ? `Bearer ${token}` : ''
                }}
        );
        return response.data
    } catch (error) {
        console.error('Error fetching products:', error.message);
        return [];
    }
}

export const saveProduct = async (product): Promise<String> => {
    try {
        const response = await axios.post<Product>('http://localhost:3003/api/v1/products/save', product,{
            headers: {
                'Authorization': token ? `Bearer ${token}` : ''
            }
        });
        toast.success(response.data.message)
        return JSON.stringify({ message: response.data.message, data:response.data });
    } catch (error) {
        console.error("Error saving product:", error.message);
        toast.error(error.message)
        return JSON.stringify({ message: "Error saving product", data:error.data });
    }
};

export const updateProduct = async (product): Promise<String> => {
    try {
        const response = await axios.patch<Product>('http://localhost:3003/api/v1/products/update', product,{
            headers: {
                'Authorization': token ? `Bearer ${token}` : ''
            }
        });
        toast.success(response.data.message)
        return JSON.stringify({ message: response.data.message, data:response.data });
    } catch (error) {
        console.error("Error updating product:", error.message);
        toast.error(error.message)
        return JSON.stringify({ message: "Error updating product", data:error.data });

    }
};


export const deleteProduct = async (id): Promise<Product> => {
    try {
        const response = await axios.delete<Product>(`http://localhost:3003/api/v1/products/delete/${id}`,{
            headers: {
                'Authorization': token ? `Bearer ${token}` : ''
            }
        });
        toast.success(response.data.message)
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        toast.error(error.message)
        throw error;
    }
};