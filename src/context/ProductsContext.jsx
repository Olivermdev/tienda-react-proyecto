import React, { createContext, useState, useEffect } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://6938785e4618a71d77d061eb.mockapi.io/products'; 

  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error cargando productos:", error);
      setLoading(false);
    }
  };

  const addProduct = async (newProduct) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (res.ok) {
        const data = await res.json();
        setProducts([...products, data]); 
        return true; 
      }
    } catch (error) {
      console.error("Error agregando:", error);
      return false;
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      if (res.ok) {
        const data = await res.json();

        setProducts(products.map(p => (p.id === id ? data : p)));
        return true;
      }
    } catch (error) {
      console.error("Error editando:", error);
      return false;
    }
  };

  const deleteProduct = async (id) => {

    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
        return true;
      }
    } catch (error) {
      console.error("Error eliminando:", error);
      return false;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};