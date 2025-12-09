import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
// Importamos Toastify y sus estilos para las notificaciones
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Componentes
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Páginas
import HomePage from './pages/HomePage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CartPage from './pages/CartPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AddProductPage from './pages/AddProductPage.jsx';

// Contextos (Providers)
import { CarritoProvider } from './context/CarritoContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProductsProvider } from './context/ProductsContext.jsx';

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <ProductsProvider>
          <HashRouter>
            <Navbar />
            
            {/* Agregamos clases de Bootstrap al contenedor principal */}
            <main className="container my-4" style={{ minHeight: '80vh' }}>
              <Routes>
                {/* --- Rutas Públicas --- */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/category/:categoryId" element={<CategoryPage />} />
                <Route path="/product/:productId" element={<ProductDetailPage />} />

                {/* --- Rutas Protegidas --- */}
                
                {/* Carrito */}
                <Route 
                  path="/cart" 
                  element={
                    <ProtectedRoute>
                      <CartPage />
                    </ProtectedRoute>
                  } 
                />

                {/* Agregar Producto (Admin) */}
                <Route 
                  path="/add-product" 
                  element={
                    <ProtectedRoute>
                      <AddProductPage />
                    </ProtectedRoute>
                  } 
                />

                {/* Editar Producto (Admin) */}
                <Route 
                  path="/edit-product/:id" 
                  element={
                    <ProtectedRoute>
                      <AddProductPage />
                    </ProtectedRoute>
                  } 
                />

              </Routes>
            </main>
            
            <Footer />

            {/* Contenedor de las notificaciones flotantes */}
            <ToastContainer position="bottom-right" autoClose={3000} />
            
          </HashRouter>
        </ProductsProvider>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;