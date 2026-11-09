import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import { stock } from "../data/stock";
import { sorters, applyFilters } from "../utils/catalogue";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import SortSelect from "../components/SortSelect";
import FilterPanel from "../components/FilterPanel";

function Catalogue() {
  const { code } = useParams();
  const [params, setParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // 1. Read everything from the URL
  const search   = params.get("q") ?? "";
  const sort     = params.get("sort") ?? "name-asc";
  const category = params.get("category") ?? "";
  const brand    = params.get("brand") ?? "";
  const nic      = params.get("nic") ?? "";
  const inStock  = params.get("instock") === "1";

  // 2. Change one setting in the URL
  function update(key, value) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key === "category") next.delete("nic");   // nicotine only applies to juices
    setParams(next, { replace: true });
  }

  function clearFilters() {
    const next = new URLSearchParams();
    if (search) next.set("q", search);
    if (sort !== "name-asc") next.set("sort", sort);
    setParams(next, { replace: true });
  }

  // 3. Options for the dropdowns, based on what THIS store carries
  const storeStock = stock[code] ?? {};
  const carriedProducts = products.filter(p => p.variants.some(v => v.sku in storeStock));

  const options = {
    categories: [...new Set(carriedProducts.map(p => p.category))],
    brands: [...new Set(carriedProducts.map(p => p.brand))].sort(),
    nic: [...new Set(
      carriedProducts
        .filter(p => p.category === "juice")
        .flatMap(p => p.variants.filter(v => v.sku in storeStock).map(v => v.label))
    )].sort((a, b) => parseFloat(a) - parseFloat(b)),
  };

  // 4. Filter, then sort
  const list = applyFilters(products, { code, stock, search, category, brand, nic, inStock })
    .sort(sorters[sort] ?? sorters["name-asc"]);

  const activeCount = [category, brand, nic, inStock].filter(Boolean).length;

  function handleAdd(sku, qty) {
    console.log("Add to basket:", sku, qty);
  }

  return (
    <main>
      <h1>{code}</h1>

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

          {list.length === 0 ? (
            <p className="empty">No products match your filters.</p>
          ) : (
            <div className="product-grid">
              {list.map(p => (
                <ProductCard
                  key={`${code}-${p.id}`}
                  product={p}
                  storeCode={code}
                  stock={stock}
                  onAdd={handleAdd}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Catalogue;