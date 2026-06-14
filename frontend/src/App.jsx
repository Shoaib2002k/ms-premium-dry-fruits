// ===== src/App.jsx =====

import { Routes, Route } from "react-router-dom";
import Navbar    from "./components/Navbar";
import Home      from "./pages/Home";
import Products  from "./pages/Products";
import Login     from "./pages/Login";
import Register  from "./pages/Register";
import Cart      from "./pages/Cart";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/"         element={<Home />}     />
          <Route path="/products" element={<Products />} />
          <Route path="/login"    element={<Login />}    />
          <Route path="/register" element={<Register />} />
          <Route path="/cart"     element={<Cart />}     />
        </Routes>
      </main>
    </>
  );
}

export default App;