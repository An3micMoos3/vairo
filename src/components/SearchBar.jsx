function SearchBar({ value, onChange }) {
  return (
    <input
      className="search"
      type="search"
      placeholder="Search products or brands..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}

export default SearchBar;
