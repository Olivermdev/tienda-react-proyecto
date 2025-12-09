import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify'; // Importamos toast

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (productToAdd) => {
    if (cart.find(item => item.id === productToAdd.id)) {
      // Notificación de Advertencia
      toast.warning("¡Este producto ya está en el carrito!"); 
      return;
    }
    setCart(prevCart => [...prevCart, productToAdd]);
    // Notificación de Éxito
    toast.success(`¡${productToAdd.name} agregado al carrito!`); 
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    toast.info("Producto eliminado del carrito");
  };

  const clearCart = () => {
    setCart([]);
    toast.error("Has vaciado el carrito");
  };

  return (
    <CarritoContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CarritoContext.Provider>
  );
};