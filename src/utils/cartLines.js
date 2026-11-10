import { findVariant } from "./catalogue";
import { getAvailable } from "./availability";
import { getPrice } from "./pricing";

// Joins each basket entry with its product, live availability and CURRENT price
export function buildLines(cart, stock) {
  return cart.items
    .map(item => {
      const found = findVariant(item.sku);
      if (!found) return null;

      const price = getPrice(found.product, found.variant, cart.storeCode);
      const available = getAvailable(stock, cart.storeCode, item.sku) ?? 0;

      return {
        ...item,
        product: found.product,
        // Swap in the discounted price, so the basket and checkout pages
        // (which read variant.priceCents) pick up discounts without any edits
        variant: { ...found.variant, priceCents: price.finalCents, originalCents: price.originalCents },
        discount: price.discount,
        available,
      };
    })
    .filter(Boolean);
}