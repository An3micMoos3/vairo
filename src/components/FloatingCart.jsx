import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { findVariant } from "../utils/catalogue";
import { formatRand } from "../utils/format";

// Pages where the floating button would just be in the way
const HIDDEN_ON = ["/cart", "/checkout", "/order-confirmed"];

function FloatingCart() {
  const { cart, count } = useCart();
  const { pathname } = useLocation();

  if (count === 0 || HIDDEN_ON.includes(pathname)) return null;

  // Running total from the basket (names and prices come from the data, not the basket)
  const subtotal = cart.items.reduce((sum, item) => {
    const found = findVariant(item.sku);
    return found ? sum + found.variant.priceCents * item.qty : sum;
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