import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";

interface WishlistContextType {
  items: Product[];
  add: (p: Product) => void;
  remove: (id: number) => void;
  isWishlisted: (id: number) => boolean;
  toggle: (p: Product) => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>(() => {
    try { const s = localStorage.getItem("myntra-wishlist"); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  useEffect(() => { localStorage.setItem("myntra-wishlist", JSON.stringify(items)); }, [items]);

  const add = (p: Product) => setItems(prev => prev.find(i => i.id === p.id) ? prev : [...prev, p]);
  const remove = (id: number) => setItems(prev => prev.filter(i => i.id !== id));
  const isWishlisted = (id: number) => items.some(i => i.id === id);
  const toggle = (p: Product) => isWishlisted(p.id) ? remove(p.id) : add(p);

  return <WishlistContext.Provider value={{ items, add, remove, isWishlisted, toggle }}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
