export function formatRand(cents) {
  return `R${(cents / 100).toFixed(2)}`;
}