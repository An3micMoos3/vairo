import { useCart } from "../context/CartContext";
import { stock } from "../data/stock";
import { getAvailable } from "../utils/availability";

// One shared "add to basket" rule, used by the catalogue and the specials page
export function useAddToCart(code) {
  const { cart, addItem, clearCart } = useCart();

  return function handleAdd(sku, qty) {
    const otherStore = cart.items.length > 0 && cart.storeCode !== code;
    if (otherStore) {
      const ok = window.confirm(
        `Your basket has items from ${cart.storeCode}. Clear it and start a new basket for ${code}?`
      );
      if (!ok) return;
      clearCart();
    }
    addItem(code, sku, qty, getAvailable(stock, code, sku));
  };
}