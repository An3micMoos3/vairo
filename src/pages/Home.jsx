import { Link } from "react-router-dom";
import { stores } from "../data/stores";
import { banners } from "../data/banners";


function Home() {
  return (
    <main>
      <section className="hero">
        <h1>Vairo Vapes</h1>
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
            </Link>import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { stores } from "../data/stores";
import { discounts } from "../data/discounts";
import { isLive, badgeText, endsLabel } from "../utils/pricing";
import { categoryLabels } from "../utils/catalogue";
import SearchBar from "../components/SearchBar";

const COLORS = ["#2c3e50", "#4a235a", "#145a32", "#7b241c"];

function Home() {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");

  const deals = discounts.filter(d => isLive(d) && d.stores.length === 0);

  function submit(e) {
    e.preventDefault();
    const q = term.trim();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <main>
      <section className="hero">
        <h1>Viro Vapes</h1>
        <p>Search every store at once, see what's on the shelf, and order for delivery or collection.</p>

        <form className="hero-search" onSubmit={submit}>
          <SearchBar value={term} onChange={setTerm} />
          <button type="submit" className="add">Search</button>
        </form>

        <div className="pills">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <Link key={key} to={`/search?category=${key}`} className="pill">{label}</Link>
          ))}
          <Link to="/stores" className="pill">Pick a store</Link>
        </div>
      </section>

      {deals.length > 0 && (
        <section>
          <h2>Specials</h2>
          <div className="banner-grid">
            {deals.map((d, i) => (
              <Link key={d.id} to="/specials" className="banner" style={{ background: COLORS[i % COLORS.length] }}>
                <h3>{d.name}</h3>
                <p>{badgeText(d)} · ends {endsLabel(d)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

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