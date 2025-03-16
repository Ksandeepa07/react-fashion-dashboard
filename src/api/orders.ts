import {Order, Product} from "../types.ts";
import axios from "axios";

export async function fetchOrders(): Promise<Order[]> {
    try {
        const response = await axios.get<Order[]>('http://localhost:3003/api/v1/orders/all');
        return response.data
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        return [];
    }
}
