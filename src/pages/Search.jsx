import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import { stock } from "../data/stock";
import { stores } from "../data/stores";
import { makeSorters, applyGlobalFilters, storeAvailability } from "../utils/catalogue";
import SearchBar from "../components/SearchBar";
import SortSelect from "../components/SortSelect";
import FilterPanel from "../components/FilterPanel";
import SearchResult from "../components/SearchResult";

const sorters = makeSorters(null);   // all-stores view: no store-specific prices

function Search() {
  const [params, setParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const search   = params.get("q") ?? "";
  const sort     = params.get("sort") ?? "name-asc";
  const category = params.get("category") ?? "";
  const brand    = params.get("brand") ?? "";
  const nic      = params.get("nic") ?? "";
  const inStock  = params.get("instock") === "1";

  function update(key, value) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key === "category") next.delete("nic");
    setParams(next, { replace: true });
  }

  function clearFilters() {
    const next = new URLSearchParams();
    if (search) next.set("q", search);
    if (sort !== "name-asc") next.set("sort", sort);
    setParams(next, { replace: true });
  }

  // Dropdown options come from what at least one store carries
  const isCarried = sku => stores.some(s => sku in (stock[s.code] ?? {}));
  const carriedProducts = products.filter(p => p.variants.some(v => isCarried(v.sku)));

  const options = {
    categories: [...new Set(carriedProducts.map(p => p.category))],
    brands: [...new Set(carriedProducts.map(p => p.brand))].sort(),
    nic: [...new Set(
      carriedProducts
        .filter(p => p.category === "juice")
        .flatMap(p => p.variants.filter(v => isCarried(v.sku)).map(v => v.label))
    )].sort((a, b) => parseFloat(a) - parseFloat(b)),
  };

  const list = applyGlobalFilters(products, stock, { search, category, brand, nic, inStock })
    .sort(sorters[sort] ?? sorters["name-asc"]);

  const activeCount = [category, brand, nic, inStock].filter(Boolean).length;

  return (
    <main>
      <h1>{search ? `Results for "${search}"` : "Search all stores"}</h1>

      <div className="toolbar">
        <SearchBar value={search} onChange={v => update("q", v)} />
        <SortSelect value={sort} onChange={v => update("sort", v)} />
        <button className="filter-btn" onClick={() => setDrawerOpen(true)}>
          Filters{activeCount > 0 && ` (${activeCount})`}
        </button>
      </div>

      <div className="shop">
        <FilterPanel
          options={options}
          values={{ category, brand, nic, inStock }}
          onChange={update}
          onClear={clearFilters}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          resultCount={list.length}
        />

        <section>
          <p>{list.length} products</p>
          <p className="legend">Store chips: green = in stock, orange = low stock, grey = sold out</p>

          {list.length === 0 ? (
            <p className="empty">No products match your search.</p>
          ) : (
            <div className="result-list">
              {list.map(p => {
                let availability = storeAvailability(p, stock, { nic });
                if (inStock) availability = availability.filter(a => a.status !== "out");
                return <SearchResult key={p.id} product={p} availability={availability} />;
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Search;