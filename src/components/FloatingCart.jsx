import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { findVariant } from "../utils/catalogue";
import { getPrice } from "../utils/pricing";
import { formatRand } from "../utils/format";

const HIDDEN_ON = ["/cart", "/checkout", "/order-confirmed"];

function FloatingCart() {
  const { cart, count } = useCart();
  const { pathname } = useLocation();

  if (count === 0 || HIDDEN_ON.includes(pathname)) return null;

  const subtotal = cart.items.reduce((sum, item) => {
    const found = findVariant(item.sku);
    if (!found) return sum;
    const { finalCents } = getPrice(found.product, found.variant, cart.storeCode);
    return sum + finalCents * item.qty;
  }, 0);

  return (
    <Link to="/cart" className="float-cart" aria-label={`View basket, ${count} items`}>
      <span className="float-count" key={count}>{count}</span>
      <span className="float-label">View basket</span>
      <span className="float-total">{formatRand(subtotal)}</span>
    </Link>
  );
}

export default FloatingCart;