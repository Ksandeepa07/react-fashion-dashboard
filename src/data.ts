import { Order, Product } from './types';

export const demoProducts: Product[] = [
  // {
  //   id: '1',
  //   name: 'Summer Floral Dress',
  //   description: 'Beautiful floral print dress perfect for summer occasions',
  //   images: [
  //     'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446',
  //     'https://images.unsplash.com/photo-1516762689617-e1cffcef479d'
  //   ],
  //   variations: [
  //     { id: '1-1', color: 'Blue', size: 'S', price: 89.99, quantity: 10 },
  //     { id: '1-2', color: 'Blue', size: 'M', price: 89.99, quantity: 15 },
  //     { id: '1-3', color: 'Pink', size: 'S', price: 89.99, quantity: 8 }
  //   ],
  //   createdAt: '2024-03-15T10:00:00Z'
  // }
];

export const demoOrders: Order[] = [
  {
    id: '1',
    customerName: 'Emma Thompson',
    products: [
      {
        productId: '1',
        productName: 'Summer Floral Dress',
        quantity: 1,
        variation: { id: '1-1', color: 'Blue', size: 'S', price: 89.99, quantity: 1 }
      }
    ],
    total: 89.99,
    status: 'completed',
    createdAt: '2024-03-15T12:00:00Z'
  }
];