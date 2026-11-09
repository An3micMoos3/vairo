import { useState } from "react";
import { stores } from "../data/stores";
import { getAvailable } from "../utils/availability";

function ProductCard({ product, storeCode, stock, onAdd }) {
  // 1. Variants this store carries (null means "not carried")
  const carried = product.variants.filter(
    v => getAvailable(stock, storeCode, v.sku) !== null
  );

  // 2. Start on the first variant with stock, otherwise the first one
  const firstInStock =
    carried.find(v => getAvailable(stock, storeCode, v.sku) > 0) ?? carried[0];

  // 3. Card state
  const [selectedSku, setSelectedSku] = useState(firstInStock?.sku);
  const [qty, setQty] = useState(1);

  // 4. Safety net
  const selected = carried.find(v => v.sku === selectedSku);
  if (!selected) return null;

  // 5. Work out what to display
  const available = getAvailable(stock, storeCode, selected.sku);
  const outOfStock = available === 0;
  const lowStock = available > 0 && available <= 3;
  const label = outOfStock ? "Sold out" : lowStock ? "Low stock" : "In stock";

  const elsewhere = stores
    .filter(s => s.code !== storeCode && getAvailable(stock, s.code, selected.sku) > 0)
    .map(s => s.code);

  return (
    <div className="card">
      <img src={product.image} alt={product.name} loading="lazy" />
      {product.ageRestricted && <span className="badge">18+</span>}

      <h3>{product.name}</h3>
      <p className="brand">{product.brand}</p>
      <p className="price">R{(selected.priceCents / 100).toFixed(2)}</p>

      <div className="variants">
        {carried.map(v => (
          <button
            key={v.sku}
            className={v.sku === selectedSku ? "variant active" : "variant"}
            disabled={getAvailable(stock, storeCode, v.sku) === 0}
            onClick={() => { setSelectedSku(v.sku); setQty(1); }}
          >
            {v.label}
          </button>
        ))}
      </div>

      <p className={outOfStock ? "status out" : "status"}>
        {label}
        {outOfStock && elsewhere.length > 0 && ` - available at ${elsewhere.join(", ")}`}
      </p>

      {!outOfStock && (
        <div className="counter">
          <button onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
          <span>{qty}</span>
          <button onClick={() => setQty(q => Math.min(available, q + 1))}>+</button>
        </div>
      )}

      <button
        className="add"
        disabled={outOfStock}
        onClick={() => onAdd(selected.sku, qty)}
      >
        Add to basket
      </button>
    </div>
  );
}

export default ProductCard;