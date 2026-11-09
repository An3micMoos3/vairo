// Builds a correct path whether the site lives at "/" or at "/viro-vapes/"
export function imgUrl(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

// Product image from the product ID: "SLK-LF-001" -> img/products/slk-lf-001.webp
export function productImage(product) {
  return imgUrl(`img/products/${product.id.toLowerCase()}.webp`);
}

export const PLACEHOLDER = imgUrl("img/placeholder.webp");