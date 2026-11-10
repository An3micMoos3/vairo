import { products } from "../data/products";
import { stock } from "../data/stock";
import { discounts } from "../data/discounts";
import { isLive, getPrice, badgeText, endsLabel } from "../utils/pricing";
import { storeAvailability } from "../utils/catalogue";
import SearchResult from "../components/SearchResult";

function Specials() {
  // Global deals only for now (stores: []). Each product appears under the deal it wins.
  const campaigns = discounts
    .filter(d => isLive(d) && d.stores.length === 0)
    .map(d => ({
      d,
      items: products.filter(
        p =>
          p.variants.some(v => getPrice(p, v, null).discount?.id === d.id) &&
          storeAvailability(p, stock).length > 0      // sold in at least one store
      ),
    }))
    .filter(c => c.items.length > 0);

  return (
    <main>
      <h1>Specials</h1>
      <p className="note">These deals run in every store. Tap a store to shop there.</p>

      {campaigns.length === 0 ? (
        <p className="empty">No specials right now. Check back soon.</p>
      ) : (
        campaigns.map(({ d, items }) => (
          <section key={d.id} className="campaign">
            <div className="campaign-head">
              <div>
                <h2>{d.name} <span className="deal-inline">{badgeText(d)}</span></h2>
                <p>{d.description}</p>
              </div>
              <span className="ends">Ends {endsLabel(d)}</span>
            </div>

            <div className="result-list">
              {items.map(p => (
                <SearchResult key={`${d.id}-${p.id}`} product={p} availability={storeAvailability(p, stock)} />
              ))}
            </div>
          </section>
        ))
      )}
    </main>
  );
}

export default Specials;