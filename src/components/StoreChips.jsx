import { Link } from "react-router-dom";

const STATUS_LABEL = { in: "In stock", low: "Low stock", out: "Sold out" };

function StoreChips({ product, availability }) {
  return (
    <div className="chips">
      <span className="chips-label">Sold at</span>
      {availability.map(a => (
        <Link
          key={a.code}
          to={`/store/${a.code}?q=${encodeURIComponent(product.name)}`}
          className={`chip ${a.status}`}
          title={`${a.name}: ${STATUS_LABEL[a.status]}`}
        >
          {a.code}
        </Link>
      ))}
    </div>
  );
}

export default StoreChips;