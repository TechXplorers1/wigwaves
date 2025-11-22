
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
