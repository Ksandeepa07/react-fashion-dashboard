import axios from 'axios';
import {Product, ProductVariation} from "../types.ts";
import {data} from "autoprefixer";

export async function fetchProducts(): Promise<Product[]> {
    try {
        const response = await axios.get<Product[]>('http://localhost:3003/api/v1/products/all');
        return response.data
    } catch (error) {
        console.error('Error fetching products:', error.message);
        return []; // Return an empty array to maintain consistency
    }
}

export const saveProduct = async (product): Promise<String> => {
    try {
        const response = await axios.post<Product>('http://localhost:3003/api/v1/products/save', product);
        return JSON.stringify({ message: response.data.message, data:data });
    } catch (error) {
        console.error("Error saving product:", error.message);
        return JSON.stringify({ message: "Error saving product", data:error.data });
    }
};

export const updateProduct = async (product): Promise<String> => {
    try {
        const response = await axios.patch<Product>('http://localhost:3003/api/v1/products/update', product);
        return JSON.stringify({ message: response.data.message, data:data });
    } catch (error) {
        console.error("Error updating product:", error.message);
        return JSON.stringify({ message: "Error updating product", data:error.data });

    }
};


export const deleteProduct = async (id): Promise<Product> => {
    try {
        const response = await axios.delete<Product>(`http://localhost:3003/api/v1/products/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};