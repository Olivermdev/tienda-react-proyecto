import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CartPage from './pages/CartPage.jsx';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (productToAdd) => {
    // Opcional: Evitar duplicados
    if (cart.find(item => item.id === productToAdd.id)) {
      alert("¡El producto ya está en el carrito!");
      return;
    }
    setCart(prevCart => [...prevCart, productToAdd]);
    alert(`${productToAdd.title} ha sido agregado al carrito!`);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  return (
    <BrowserRouter>
      <Navbar cartCount={cart.length} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage addToCart={addToCart} />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage addToCart={addToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;