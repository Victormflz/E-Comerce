import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import { CartProvider } from './contexts/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Success } from './pages/Success';

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <div className="min-h-screen bg-neutral-950 text-white selection:bg-neo-accent selection:text-black">
          <Navbar />
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;