import { create } from 'zustand';
import type { CartItem } from '../src/types';

interface ICartStore {
  products: CartItem[];
  addProduct: (product: CartItem) => void;
  removeProduct: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create(set => ({
  products: [],

  //actions
  addProduct: (product: CartItem) => {
    set(state => ({ products: [...state.products, product] }));
  },
  removeProduct: (id: number) => {
    set(state => ({ products: state.products.filter(product => product.id !== id) }));
  },
  clearCart: () => set(() => ({ products: [] })),
}));
