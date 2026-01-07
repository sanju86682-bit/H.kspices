
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  tag?: string;
  category: 'Spices' | 'Oils' | 'Essentials';
}

export interface CartItem extends Product {
  quantity: number;
}
