import { Link } from "react-router-dom";
import { stores } from "../data/stores";
import { formatRand } from "../utils/format";

function loadOrder() {
  try {
    const raw = localStorage.getItem("viro-last-order");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function OrderPlaced() {
  const order = loadOrder();

  if (!order) {
    return (
      <main>
        <h1>No recent order</h1>
        <Link to="/stores" className="link">Choose a store</Link>
      </main>
    );
  }

  const store = stores.find(s => s.code === order.storeCode);

  return (
    <main>
      <h1>Thank you, {order.customer.name.split(" ")[0]}!</h1>
      <p>Your order <strong>{order.number}</strong> has been received (demo).</p>

      <div className="summary">
        <h2>{order.fulfilment === "collect" ? "Collect from" : "Delivering from"} {store?.name}</h2>
        {order.address && (
          <p className="note">
            {order.address.street}, {order.address.suburb}, {order.address.city}, {order.address.postal}
          </p>
        )}
        {order.notes && <p className="note">Notes: {order.notes}</p>}

        {order.lines.map(l => (
          <p key={l.sku}>
            <span>{l.qty} × {l.name} ({l.label})</span>
            <span>{formatRand(l.priceCents * l.qty)}</span>
          </p>
        ))}
        <p><span>Subtotal</span><span>{formatRand(order.subtotalCents)}</span></p>
        <p>
          <span>{order.fulfilment === "collect" ? "Collection" : "Delivery"}</span>
          <span>{order.deliveryCents === 0 ? "Free" : formatRand(order.deliveryCents)}</span>
        </p>
        <p className="total"><span>Total</span><span>{formatRand(order.totalCents)}</span></p>
      </div>

      <p className="note">Please have your ID ready: age is verified when you collect or receive your order.</p>
      <Link to="/stores" className="link">Continue shopping</Link>
    </main>
  );
}

export default OrderPlaced;