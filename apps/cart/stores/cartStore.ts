import { create } from 'zustand';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
  category: string;
};

interface CartStore {
  products: Product[];
  addProduct: (product: any) => void;
  removeProduct: (product: any) => void;
}

export const useCartStore = create<CartStore>(set => ({
  products: [],

  addProduct: product => {
    set(state => ({
      products: [...state.products, product],
    }));
  },

  removeProduct: product => {
    set(state => ({ products: state.products.filter(p => p.id !== product.id) }));
  },
}));
