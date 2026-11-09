function SortSelect({ value, onChange }) {
  return (
    <select className="sort" value={value} onChange={e => onChange(e.target.value)}>
      <option value="name-asc">Name A-Z</option>
      <option value="name-desc">Name Z-A</option>
      <option value="price-asc">Price: low to high</option>
      <option value="price-desc">Price: high to low</option>
    </select>
  );
}

export default SortSelect;
