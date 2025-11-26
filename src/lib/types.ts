
import type { FieldValue } from "firebase/firestore";

export type Wig = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  style: 'Straight' | 'Wavy' | 'Curly' | 'Pixie' | 'Bob';
  color: 'Blonde' | 'Brunette' | 'Black' | 'Red' | 'Grey' | 'Pastel';
  length: 'Short' | 'Medium' | 'Long';
  material: 'Human Hair' | 'Synthetic';
  isNew?: boolean;
  type?: 'wig' | 'extension' | 'toupee';
  stock?: number;
};

export type CartItem = Wig & {
  quantity: number;
  cartItemId?: string;
};

export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  role: 'admin' | 'user';
};

export type OrderItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export type CustomerInfo = {
    name: string;
    email: string;
    address: string;
    city: string;
    zip: string;
}

export type Order = {
    id: string;
    userId: string;
    items: OrderItem[];
    total: number;
    status: 'Pending' | 'Approved' | 'Packing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Canceled';
    customerInfo: CustomerInfo;
    createdAt: any;
}
