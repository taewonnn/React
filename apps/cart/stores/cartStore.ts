import { create } from 'zustand';

interface CartStore {
  products: any[];
  addProduct: (product: any) => void;
}

export const useCartStore = create<CartStore>(set => ({
  products: [],

  addProduct: product => {
    set(state => ({
      products: [...state.products, product],
    }));
  },
}));
