// src/contexts/CartContext.jsx
import React, { createContext, useContext, useMemo, useState } from "react";

/** Cart Context 인스턴스 */
export const CartCtx = createContext(null);

/** Provider */
export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{id, name, price, qty, img, available}]
  const [open, setOpen] = useState(false);

  const addItem = (item) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === item.id);
      if (idx >= 0) {
        const cp = [...prev];
        cp[idx] = { ...cp[idx], qty: (cp[idx].qty || 1) + (item.qty || 1) };
        return cp;
      }
      return [...prev, { ...item, qty: item.qty || 1 }];
    });
  };

  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.id !== id));
  const clear = () => setItems([]);
  const openCart = () => setOpen(true);
  const closeCart = () => setOpen(false);

  const subtotal = useMemo(
    () => items.reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0),
    [items]
  );

  const value = { items, addItem, removeItem, clear, open, openCart, closeCart, subtotal };

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

/** Provider 밖에서도 앱이 죽지 않게 no-op 가드 */
const NOOP_CART = {
  items: [],
  addItem: () => console.warn("[Cart] addItem() called without <CartProvider>."),
  removeItem: () => console.warn("[Cart] removeItem() called without <CartProvider>."),
  clear: () => console.warn("[Cart] clear() called without <CartProvider>."),
  open: false,
  openCart: () => console.warn("[Cart] openCart() called without <CartProvider>."),
  closeCart: () => console.warn("[Cart] closeCart() called without <CartProvider>."),
  subtotal: 0,
};

/** Hook */
export const useCart = () => {
  const ctx = useContext(CartCtx);
  return ctx ?? NOOP_CART;
};
