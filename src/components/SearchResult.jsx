import { getPrice, badgeText } from "../utils/pricing";
import { formatRand } from "../utils/format";
import { productImage, PLACEHOLDER } from "../utils/imgUrl";
import StoreChips from "./StoreChips";

function SearchResult({ product, availability }) {
  // All-stores view: price each variant with no store, then take the cheapest
  const prices = product.variants.map(v => getPrice(product, v, null));
  const best = prices.reduce((a, b) => (b.finalCents < a.finalCents ? b : a));
  const differs = new Set(prices.map(p => p.finalCents)).size > 1;

  return (
    <div className="result">
      <img
        src={productImage(product)}
        alt={product.name}
        loading="lazy"
        onError={e => {
          if (e.currentTarget.src !== PLACEHOLDER) e.currentTarget.src = PLACEHOLDER;
        }}
      />
      <div className="result-info">
        <h3>{product.name}</h3>
        <p className="brand">{product.brand}</p>
        <p className="price">
          {best.discount && <span className="was">{formatRand(best.originalCents)}</span>}
          <span className={best.discount ? "now" : ""}>
            {differs && "From "}{formatRand(best.finalCents)}
          </span>
          {best.discount && <span className="deal">{badgeText(best.discount)}</span>}
        </p>
        <StoreChips product={product} availability={availability} />
      </div>
    </div>
  );
}

export default SearchResult;