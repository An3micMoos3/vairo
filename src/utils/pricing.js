import { discounts } from "../data/discounts";
import { formatRand } from "./format";

export function isLive(d, now = Date.now()) {
  return d.active && now >= Date.parse(d.startsAt) && now <= Date.parse(d.endsAt);
}

function matches(rule, product, variant) {
  if (rule.all) return true;
  const hasRule = rule.category || rule.brand || rule.ids || rule.skus;
  if (!hasRule) return false;
  if (rule.category && product.category !== rule.category) return false;
  if (rule.brand && product.brand !== rule.brand) return false;
  if (rule.ids && !rule.ids.includes(product.id)) return false;
  if (rule.skus && !rule.skus.includes(variant.sku)) return false;
  return true;
}

function priceAfter(d, cents) {
  const off = d.type === "percent" ? Math.round((cents * d.value) / 100) : d.value;
  return Math.max(0, cents - off);
}

// storeCode can be null (all-stores views). Then only global deals apply.
export function getPrice(product, variant, storeCode, now = Date.now()) {
  const originalCents = variant.priceCents;
  let finalCents = originalCents;
  let best = null;

  for (const d of discounts) {
    if (!isLive(d, now)) continue;
    if (d.stores.length > 0 && !d.stores.includes(storeCode)) continue;
    if (!matches(d.appliesTo, product, variant)) continue;

    const price = priceAfter(d, originalCents);
    if (price < finalCents) { best = d; finalCents = price; }
  }
  return { originalCents, finalCents, discount: best };
}

export function badgeText(d) {
  return d.type === "percent" ? `-${d.value}%` : `${formatRand(d.value)} off`;
}

export function endsLabel(d) {
  return new Date(d.endsAt).toLocaleDateString("en-ZA", { day: "numeric", month: "long" });
}