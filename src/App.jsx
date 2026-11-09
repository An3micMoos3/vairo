import { Routes, Route } from "react-router-dom";
import AgeGate from "./components/AgeGate";
import Header from "./components/Header";
import Footer from "./components/Footer";
import OfflineBanner from "./components/OfflineBanner";
import FloatingCart from "./components/FloatingCart";
import Home from "./pages/Home";
import Stores from "./pages/Stores";
import Catalogue from "./pages/Catalogue";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderPlaced from "./pages/OrderPlaced";

function App() {
  return (
    <AgeGate>
      <OfflineBanner />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/store/:code" element={<Catalogue />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmed" element={<OrderPlaced />} />
      </Routes>
      <Footer />
      <FloatingCart />
    </AgeGate>
  );
}

export default App;