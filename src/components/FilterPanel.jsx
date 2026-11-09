import { categoryLabels } from "../utils/catalogue";

function FilterPanel({ options, values, onChange, onClear, open, onClose, resultCount }) {
  return (
    <>
      {open && <div className="backdrop" onClick={onClose} />}

      <aside className={open ? "filters open" : "filters"}>
        <div className="filters-head">
          <h2>Filters</h2>
          <button className="link" onClick={onClose}>Close</button>
        </div>

        <label>
          Category
          <select value={values.category} onChange={e => onChange("category", e.target.value)}>
            <option value="">All categories</option>
            {options.categories.map(c => (
              <option key={c} value={c}>{categoryLabels[c] ?? c}</option>
            ))}
          </select>
        </label>

        <label>
          Brand
          <select value={values.brand} onChange={e => onChange("brand", e.target.value)}>
            <option value="">All brands</option>
            {options.brands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </label>

        {values.category === "juice" && options.nic.length > 0 && (
          <label>
            Nicotine strength
            <select value={values.nic} onChange={e => onChange("nic", e.target.value)}>
              <option value="">Any strength</option>
              {options.nic.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
        )}

        <label className="check">
          <input
            type="checkbox"
            checked={values.inStock}
            onChange={e => onChange("instock", e.target.checked ? "1" : "")}
          />
          In stock only
        </label>

        <button className="link" onClick={onClear}>Clear all filters</button>
        <button className="add apply" onClick={onClose}>Show {resultCount} results</button>
      </aside>
    </>
  );
}

export default FilterPanel;