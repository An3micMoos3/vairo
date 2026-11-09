import { Link } from "react-router-dom";
import { stores } from "../data/stores";
import { banners } from "../data/banners";

function Home() {
  return (
    <main>
      <section className="hero">
        <h1>Viro Vapes</h1>
        <p>Pick your nearest store, see what's on the shelf, and order for delivery or collection.</p>
        <Link to="/stores" className="add hero-btn">Choose your store</Link>
      </section>

      <section>
        <h2>Specials</h2>
        <div className="banner-grid">
          {banners.map(b => (
            <Link key={b.id} to={b.to} className="banner" style={{ background: b.color }}>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2>Our stores</h2>
        <div className="store-grid">
          {stores.map(s => (
            <Link key={s.code} to={`/store/${s.code}`} className="store-card">
              <h3>{s.name}</h3>
              <p>{s.town}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="about">
        <h2>About us</h2>
        <p>
          Viro Vapes is a local business with five stores. Every store has its own
          range and its own stock, so what you see online is what's on that store's shelf.
          Order online for courier delivery, or collect in store.
        </p>
      </section>
    </main>
  );
}

export default Home;