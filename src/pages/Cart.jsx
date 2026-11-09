import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { stock } from "../data/stock";
import { stores } from "../data/stores";
import { buildLines } from "../utils/cartLines";
import { formatRand } from "../utils/format";

function Cart() {
  const { cart, setQty, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.items.length === 0) {
    return (
      <main>
        <h1>Your basket</h1>
        <p className="empty">Your basket is empty.</p>
        <Link to="/stores" className="link">Choose a store</Link>
      </main>
    );
  }

  const store = stores.find(s => s.code === cart.storeCode);
  const lines = buildLines(cart, stock);

  const subtotal = lines.reduce((sum, l) => sum + l.variant.priceCents * l.qty, 0);
  const problem = lines.some(l => l.qty > l.available);

  return (
    <main>
      <h1>Your basket</h1>
      <p>Shopping at <strong>{store?.name ?? cart.storeCode}</strong></p>

      <div className="cart-lines">
        {lines.map(l => (
          <div key={l.sku} className="cart-line">
            <div className="cart-info">
              <h3>{l.product.name}</h3>
              <p className="brand">{l.variant.label}</p>
              <p>{formatRand(l.variant.priceCents)}</p>
              {l.qty > l.available && (
                <p className="status out">
                  {l.available === 0 ? "No longer available" : `Only ${l.available} available`}
                </p>
              )}
            </div>

            <div className="counter">
              <button onClick={() => setQty(l.sku, l.qty - 1)}>-</button>
              <span>{l.qty}</span>
              <button
                disabled={l.qty >= l.available}
                onClick={() => setQty(l.sku, l.qty + 1)}
              >+</button>
            </div>

            <p className="line-total">{formatRand(l.variant.priceCents * l.qty)}</p>
            <button className="link" onClick={() => removeItem(l.sku)}>Remove</button>
          </div>
        ))}
      </div>

      <div className="summary">
        <p><span>Subtotal</span><span>{formatRand(subtotal)}</span></p>
        <p className="note">Delivery is calculated at checkout.</p>

        <button className="add" disabled={problem} onClick={() => navigate("/checkout")}>
          Checkout
        </button>
        <button className="link" onClick={clearCart}>Empty basket</button>
        <Link to={`/store/${cart.storeCode}`} className="link">Continue shopping</Link>
      </div>
    </main>
  );
}

export default Cart;