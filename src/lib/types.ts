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
};

export type CartItem = Wig & {
  quantity: number;
  cartItemId?: string;
};
