import { Link } from "react-router-dom";
import { stores } from "../data/stores";

function Stores() {
  return (
    <main>
      <h1>Choose your store</h1>
      <div className="store-grid">
        {stores.map(s => (
          <Link key={s.code} to={`/store/${s.code}`} className="store-card">
            <h2>{s.name}</h2>
            <p>{s.town}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Stores;