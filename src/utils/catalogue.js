import { getAvailable } from "./availability";
import { getPrice } from "./pricing";
import { products } from "../data/products";
import { stores } from "../data/stores";

export const categoryLabels = {
  juice: "Vape juices",
  coil: "Coils",
  device: "Devices",
};

export function lowestPrice(product, storeCode) {
  return Math.min(...product.variants.map(v => getPrice(product, v, storeCode).finalCents));
}

export function makeSorters(storeCode) {
  return {
    "name-asc":   (a, b) => a.name.localeCompare(b.name),
    "name-desc":  (a, b) => b.name.localeCompare(a.name),
    "price-asc":  (a, b) => lowestPrice(a, storeCode) - lowestPrice(b, storeCode),
    "price-desc": (a, b) => lowestPrice(b, storeCode) - lowestPrice(a, storeCode),
  };
}

export function applyFilters(list, { code, stock, search, category, brand, nic, inStock }) {
  const term = search.trim().toLowerCase();

  return list.filter(p => {
    let carried = p.variants.filter(v => getAvailable(stock, code, v.sku) !== null);
    if (carried.length === 0) return false;

    if (category && p.category !== category) return false;
    if (brand && p.brand !== brand) return false;

    if (term &&
        !p.name.toLowerCase().includes(term) &&
        !p.brand.toLowerCase().includes(term)) return false;

    if (nic) {
      carried = carried.filter(v => v.label === nic);
      if (carried.length === 0) return false;
    }

    if (inStock && !carried.some(v => getAvailable(stock, code, v.sku) > 0)) return false;

    return true;
  });
}

// Keep a product if ANY store passes the filters
export function applyGlobalFilters(list, stock, filters) {
  return list.filter(p =>
    stores.some(s => applyFilters([p], { code: s.code, stock, ...filters }).length > 0)
  );
}

// Every store that carries this product, with an in / low / out status.
// If a nicotine strength is chosen, only that strength is counted.
export function storeAvailability(product, stock, { nic } = {}) {
  return stores
    .map(s => {
      let carried = product.variants.filter(v => getAvailable(stock, s.code, v.sku) !== null);
      if (nic) carried = carried.filter(v => v.label === nic);
      if (carried.length === 0) return null;

      const total = carried.reduce((sum, v) => sum + getAvailable(stock, s.code, v.sku), 0);
      return {
        code: s.code,
        name: s.name,
        status: total === 0 ? "out" : total <= 3 ? "low" : "in",
      };
    })
    .filter(Boolean);
}

export function findVariant(sku) {
  for (const p of products) {
    const v = p.variants.find(v => v.sku === sku);
    if (v) return { product: p, variant: v };
  }
  return null;
}