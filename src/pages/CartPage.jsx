import React, { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext.jsx'; // 1. Importamos el contexto

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(CarritoContext);

  if (!cart || cart.length === 0) {
    return <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Tu carrito está vacío.</h2>;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-page" style={{ padding: '20px' }}>
      <h2>Tu Carrito</h2>
      {cart.map(item => (
        <div key={item.id} className="cart-item" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          borderBottom: '1px solid #ccc', 
          padding: '10px 0' 
        }}>
          <img src={item.image} alt={item.title} style={{ width: '50px' }} />
          <span style={{ flex: 1, marginLeft: '10px' }}>{item.title}</span>
          <span style={{ fontWeight: 'bold' }}>${item.price}</span>
          <button 
            onClick={() => removeFromCart(item.id)}
            style={{ marginLeft: '10px', backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
          >
            Eliminar
          </button>
        </div>
      ))}
      
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <h3>Total: ${total.toFixed(2)}</h3>
        <button 
          onClick={clearCart} 
          style={{ backgroundColor: '#e67e22', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer', marginTop: '10px' }}
        >
          Vaciar Carrito
        </button>
      </div>
    </div>
  );
};

export default CartPage;