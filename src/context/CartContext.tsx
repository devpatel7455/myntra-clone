import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD"; product: Product; size: string }
  | { type: "REMOVE"; productId: number; size: string }
  | { type: "UPDATE_QTY"; productId: number; size: string; quantity: number }
  | { type: "CLEAR" };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find(i => i.product.id === action.product.id && i.size === action.size);
      if (existing) {
        return { items: state.items.map(i => i.product.id === action.product.id && i.size === action.size ? { ...i, quantity: i.quantity + 1 } : i) };
      }
      return { items: [...state.items, { product: action.product, quantity: 1, size: action.size }] };
    }
    case "REMOVE":
      return { items: state.items.filter(i => !(i.product.id === action.productId && i.size === action.size)) };
    case "UPDATE_QTY":
      return { items: state.items.map(i => i.product.id === action.productId && i.size === action.size ? { ...i, quantity: action.quantity } : i) };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
};

const getInitial = (): CartState => {
  try {
    const stored = localStorage.getItem("myntra-cart");
    return stored ? JSON.parse(stored) : { items: [] };
  } catch { return { items: [] }; }
};

const CartContext = createContext<{ state: CartState; dispatch: React.Dispatch<CartAction> } | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, getInitial);
  useEffect(() => { localStorage.setItem("myntra-cart", JSON.stringify(state)); }, [state]);
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
