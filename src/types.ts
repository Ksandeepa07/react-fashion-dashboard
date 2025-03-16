export interface Product {
  _id?: string;
  // name: string;
  // description: string;
  // images: string[];
  // variations: ProductVariation[];
  images: string[];
  variations: Omit<ProductVariation, "id">[];
  name: string;
  description: string
  category:string
  createdAt?: string;
}

export interface ProductVariation {
  _id?: string;
  id: string;
  // color: string;
  size: string;
  price: number;
  quantity: number;
}

// export interface Order {
//   id: string;
//   customerName: string;
//   products: OrderProduct[];
//   total: number;
//   status: 'pending' | 'completed' | 'cancelled';
//   createdAt: string;
// }
//
// export interface OrderProduct {
//   productId: string;
//   productName: string;
//   quantity: number;
//   variation: ProductVariation;
// }

export interface Order {
  _id?:string;
  email:string;
  firstName: string;
  lastName: string;
  address:string;
  city:string;
  postalCode:string;
  products: {
    productId: string;
    quantity: number;
    size: string;
  }[];
  totalPrice:number;
}