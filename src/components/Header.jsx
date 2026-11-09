import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">Viro Vapes</Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/stores">Stores</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  );
}

export default Header;