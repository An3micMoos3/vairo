import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { stock } from "../data/stock";

function Catalogue() {
  const { code } = useParams();
  const storeStock = stock[code] ?? {};

  const catalogue = products.filter(p =>
    p.variants.some(v => v.sku in storeStock)
  );

  return (
    <main>
      <h1>{code}</h1>
      <p>{catalogue.length} products</p>
      <ul>
        {catalogue.map(p => <li key={p.id}>{p.name}</li>)}
      </ul>
    </main>
  );
}

export default Catalogue;