import { findVariant } from "./catalogue";
import { getAvailable } from "./availability";

// Joins each basket entry with its product details and live availability
export function buildLines(cart, stock) {
  return cart.items
    .map(item => {
      const found = findVariant(item.sku);
      if (!found) return null;
      const available = getAvailable(stock, cart.storeCode, item.sku) ?? 0;
      return { ...item, ...found, available };
    })
    .filter(Boolean);
}