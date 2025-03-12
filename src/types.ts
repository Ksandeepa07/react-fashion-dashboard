export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  variations: ProductVariation[];
  createdAt: string;
}

export interface ProductVariation {
  id: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  products: OrderProduct[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface OrderProduct {
  productId: string;
  productName: string;
  quantity: number;
  variation: ProductVariation;
}