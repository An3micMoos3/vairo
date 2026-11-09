export function getAvailable(stock, storeCode, sku) {
  const entry = stock[storeCode]?.[sku];
  if (!entry) return null;
  return Math.max(0, entry.qty - entry.reserved);
}