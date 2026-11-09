import { getAvailable } from "./availability";   // top of the file
import { products } from "../data/products"; 

// Cheapest variant price, used for sorting and later for "from R..." labels
export function lowestPrice(product) {
  return Math.min(...product.variants.map(v => v.priceCents));
}

// One comparison function per sort option
export const sorters = {
  "name-asc":   (a, b) => a.name.localeCompare(b.name),
  "name-desc":  (a, b) => b.name.localeCompare(a.name),
  "price-asc":  (a, b) => lowestPrice(a) - lowestPrice(b),
  "price-desc": (a, b) => lowestPrice(b) - lowestPrice(a),
};
export const categoryLabels = {
  juice: "Vape juices",
  coil: "Coils",
  device: "Devices",
};

export function applyFilters(products, { code, stock, search, category, brand, nic, inStock }) {
  const term = search.trim().toLowerCase();

  return products.filter(p => {
    // Variants this store carries
    let carried = p.variants.filter(v => getAvailable(stock, code, v.sku) !== null);
    if (carried.length === 0) return false;

    if (category && p.category !== category) return false;
    if (brand && p.brand !== brand) return false;

    if (term &&
        !p.name.toLowerCase().includes(term) &&
        !p.brand.toLowerCase().includes(term)) return false;

    // Nicotine: narrow to the chosen strength, drop the product if none
    if (nic) {
      carried = carried.filter(v => v.label === nic);
      if (carried.length === 0) return false;
    }

    // In stock: at least one of the remaining variants has stock
    if (inStock && !carried.some(v => getAvailable(stock, code, v.sku) > 0)) return false;

    return true;
  });
}

export function findVariant(sku) {
  for (const p of products) {
    const v = p.variants.find(v => v.sku === sku);
    if (v) return { product: p, variant: v };
  }
  return null;
}