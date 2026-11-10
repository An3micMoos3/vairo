import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { imgUrl } from "../utils/imgUrl";

function Header() {
  const { count } = useCart();

  return (
    <header className="header">
      <nav className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/stores">Stores</Link>
        <Link to="/specials">Specials</Link>
      </nav>

      <Link to="/" className="logo">
        <img src={imgUrl("img/logo.png")} alt="Viro Vapes" />
      </Link>

      <nav className="nav-right">
        <Link to="/cart">Cart{count > 0 && ` (${count})`}</Link>
      </nav>
    </header>
  );
}

export default Header;