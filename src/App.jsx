import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Stores from "./pages/Stores";
import Catalogue from "./pages/Catalogue";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<main><h1>Home</h1></main>} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/store/:code" element={<Catalogue />} />
        <Route path="/cart" element={<main><h1>Cart</h1></main>} />
      </Routes>
    </>
  );
}

export default App;