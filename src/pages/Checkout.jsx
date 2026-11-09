import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { stock } from "../data/stock";
import { stores } from "../data/stores";
import { buildLines } from "../utils/cartLines";
import { provinces, quoteDelivery } from "../utils/delivery";
import { formatRand } from "../utils/format";

const EMPTY_FORM = {
  name: "", phone: "", email: "",
  fulfilment: "deliver",
  street: "", suburb: "", city: "", postal: "", province: "North West",
  notes: "",
  ageConfirmed: false,
};

// Returns an object of error messages. Empty object = form is valid.
function validate(form) {
  const e = {};
  if (!form.name.trim()) e.name = "Please enter your name.";

  const phone = form.phone.replace(/\s/g, "");
  if (!/^(\+27|0)\d{9}$/.test(phone)) e.phone = "Enter a valid SA number, e.g. 082 123 4567.";

  if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address.";

  if (form.fulfilment === "deliver") {
    if (!form.street.trim()) e.street = "Street address is required.";
    if (!form.suburb.trim()) e.suburb = "Suburb is required.";
    if (!form.city.trim()) e.city = "City or town is required.";
    if (!/^\d{4}$/.test(form.postal.trim())) e.postal = "Postal code must be 4 digits.";
  }

  if (!form.ageConfirmed) e.ageConfirmed = "You must confirm you are 18 or older.";
  return e;
}

// Demo only: the real system's server assigns this number
function nextOrderNumber(storeCode) {
  let seq = 0;
  try { seq = Number(localStorage.getItem("viro-order-seq")) || 0; } catch {}
  seq += 1;
  try { localStorage.setItem("viro-order-seq", String(seq)); } catch {}
  return `${storeCode}-WEB-${String(seq).padStart(8, "0")}`;
}

// Defined OUTSIDE Checkout on purpose (see notes below)
function Field({ label, error, children }) {
  return (
    <label className="field">
      {label}
      {children}
      {error && <span className="error">{error}</span>}
    </label>
  );
}

function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  // Nothing in the basket
  if (cart.items.length === 0) {
    return (
      <main>
        <h1>Checkout</h1>
        <p className="empty">Your basket is empty.</p>
        <Link to="/stores" className="link">Choose a store</Link>
      </main>
    );
  }

  const store = stores.find(s => s.code === cart.storeCode);
  const lines = buildLines(cart, stock);
  const problem = lines.some(l => l.qty > l.available);

  // Stock dropped since the item was added
  if (problem) {
    return (
      <main>
        <h1>Checkout</h1>
        <p className="status out">Some items in your basket are no longer available in the quantity you chose.</p>
        <Link to="/cart" className="link">Back to basket</Link>
      </main>
    );
  }

  const subtotal = lines.reduce((sum, l) => sum + l.variant.priceCents * l.qty, 0);
  const delivery = quoteDelivery(form);
  const total = subtotal + delivery;

  function handleSubmit(e) {
    e.preventDefault();                       // stop the browser reloading the page
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // Snapshot everything as it was at the moment of purchase
    const order = {
      number: nextOrderNumber(cart.storeCode),
      storeCode: cart.storeCode,
      placedAt: new Date().toISOString(),
      customer: { name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim() },
      fulfilment: form.fulfilment,
      address: form.fulfilment === "deliver"
        ? { street: form.street.trim(), suburb: form.suburb.trim(), city: form.city.trim(),
            postal: form.postal.trim(), province: form.province }
        : null,
      notes: form.notes.trim(),
      lines: lines.map(l => ({
        sku: l.sku, name: l.product.name, label: l.variant.label,
        qty: l.qty, priceCents: l.variant.priceCents,
      })),
      subtotalCents: subtotal,
      deliveryCents: delivery,
      totalCents: total,
    };

    try { localStorage.setItem("viro-last-order", JSON.stringify(order)); } catch {}
    navigate("/order-confirmed");
    clearCart();
  }

  return (
    <main>
      <h1>Checkout</h1>
      <p>Order from <strong>{store?.name ?? cart.storeCode}</strong></p>

      <form className="checkout" onSubmit={handleSubmit} noValidate>
        <div className="form-col">
          <h2>Your details</h2>
          <Field label="Full name" error={errors.name}>
            <input value={form.name} onChange={e => set("name", e.target.value)} />
          </Field>
          <Field label="Mobile number" error={errors.phone}>
            <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} />
          </Field>
          <Field label="Email" error={errors.email}>
            <input type="email" value={form.email} onChange={e => set("email", e.target.value)} />
          </Field>

          <h2>How would you like to get it?</h2>
          <div className="radio-row">
            <label>
              <input type="radio" name="fulfilment" checked={form.fulfilment === "deliver"}
                     onChange={() => set("fulfilment", "deliver")} />
              Courier delivery
            </label>
            <label>
              <input type="radio" name="fulfilment" checked={form.fulfilment === "collect"}
                     onChange={() => set("fulfilment", "collect")} />
              Collect in store (free)
            </label>
          </div>

          {form.fulfilment === "deliver" && (
            <>
              <Field label="Street address" error={errors.street}>
                <input value={form.street} onChange={e => set("street", e.target.value)} />
              </Field>
              <Field label="Suburb" error={errors.suburb}>
                <input value={form.suburb} onChange={e => set("suburb", e.target.value)} />
              </Field>
              <Field label="City / town" error={errors.city}>
                <input value={form.city} onChange={e => set("city", e.target.value)} />
              </Field>
              <Field label="Postal code" error={errors.postal}>
                <input inputMode="numeric" maxLength={4} value={form.postal}
                       onChange={e => set("postal", e.target.value)} />
              </Field>
              <Field label="Province">
                <select value={form.province} onChange={e => set("province", e.target.value)}>
                  {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </Field>
              <Field label="Delivery notes (optional)">
                <textarea rows={3} value={form.notes} onChange={e => set("notes", e.target.value)}
                          placeholder="Gate code, complex name, best time..." />
              </Field>
            </>
          )}

          <label className="check">
            <input type="checkbox" checked={form.ageConfirmed}
                   onChange={e => set("ageConfirmed", e.target.checked)} />
            I confirm I am 18 years or older. ID may be checked on delivery or collection.
          </label>
          {errors.ageConfirmed && <span className="error">{errors.ageConfirmed}</span>}
        </div>

        <aside className="summary">
          <h2>Order summary</h2>
          {lines.map(l => (
            <p key={l.sku}>
              <span>{l.qty} × {l.product.name} ({l.variant.label})</span>
              <span>{formatRand(l.variant.priceCents * l.qty)}</span>
            </p>
          ))}
          <p><span>Subtotal</span><span>{formatRand(subtotal)}</span></p>
          <p>
            <span>{form.fulfilment === "collect" ? "Collection" : "Delivery (estimate)"}</span>
            <span>{delivery === 0 ? "Free" : formatRand(delivery)}</span>
          </p>
          <p className="total"><span>Total</span><span>{formatRand(total)}</span></p>

          <button type="submit" className="add">Place order (demo)</button>
          <p className="note">Demo only: no payment is taken and nothing is sent.</p>
          <Link to="/cart" className="link">Back to basket</Link>
        </aside>
      </form>
    </main>
  );
}

export default Checkout;