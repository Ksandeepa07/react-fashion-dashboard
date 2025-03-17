import {Order} from "../types.ts";
import axios from "axios";

const token = localStorage.getItem('token');


export async function fetchOrders(): Promise<Order[]> {
    try {
        const response = await axios.get<Order[]>('http://localhost:3003/api/v1/orders/all', {
            headers: {
                'Authorization': token ? `Bearer ${token}` : ''
            }
        });
        return response.data
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        return [];
    }
}
