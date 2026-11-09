export function makeSku({ brand, type, number, variant }) {
  const num = String(number).padStart(3, "0");
  return variant ? `${brand}-${type}-${num}-${variant}` : `${brand}-${type}-${num}`;
}