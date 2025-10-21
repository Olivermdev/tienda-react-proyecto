import React from 'react';

const CartPage = ({ cart, removeFromCart }) => {
  if (!cart || cart.length === 0) {
    return <h2>Tu carrito está vacío.</h2>;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-page">
      <h2>Tu Carrito</h2>
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <span>{item.title}</span>
          <span>${item.price}</span>
          <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default CartPage;