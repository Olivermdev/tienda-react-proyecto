import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <Link to={`/product/${product.id}`}>Ver detalle</Link>
      <button onClick={() => addToCart(product)}>Agregar al Carrito</button>
    </div>
  );
};

export default ProductCard;