import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "viro-cart";
const EMPTY = { storeCode: null, items: [] };

// Read the saved basket, or start empty if there's none (or it's damaged)
function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(load);

  // Save to the browser every time the cart changes
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch {}
  }, [cart]);

  function addItem(storeCode, sku, qty, max) {
    setCart(prev => {
      const existing = prev.items.find(i => i.sku === sku);
      const items = existing
        ? prev.items.map(i =>
            i.sku === sku ? { ...i, qty: Math.min(max, i.qty + qty) } : i
          )
        : [...prev.items, { sku, qty: Math.min(max, qty) }];
      return { storeCode, items };
    });
  }

  function setQty(sku, qty) {
    setCart(prev => {
      const items = prev.items
        .map(i => (i.sku === sku ? { ...i, qty } : i))
        .filter(i => i.qty > 0);
      return items.length ? { ...prev, items } : EMPTY;
    });
  }

  function removeItem(sku) {
    setQty(sku, 0);
  }

  function clearCart() {
    setCart(EMPTY);
  }

  const count = cart.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, count, addItem, setQty, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// A shortcut so pages can write useCart() instead of useContext(CartContext)
export function useCart() {
  return useContext(CartContext);
}