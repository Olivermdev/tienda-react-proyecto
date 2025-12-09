import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaCartPlus, FaInfoCircle } from 'react-icons/fa';
import { CarritoContext } from '../context/CarritoContext.jsx';

const StyledButton = styled.button`
  background-color: #6c5ce7;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  width: 100%;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover { background-color: #4834d4; }
`;

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CarritoContext);

  return (
    <div className="card h-100 shadow-sm">
      <img 
        src={product.image} 
        className="card-img-top p-3" 
        alt={`Imagen de ${product.name}`} 
        style={{ height: '200px', objectFit: 'contain' }} 
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text fw-bold text-success">${product.price}</p>
        
        <Link 
          to={`/product/${product.id}`} 
          className="btn btn-outline-primary mt-auto d-flex align-items-center justify-content-center gap-2"
          aria-label={`Ver detalles de ${product.name}`} // ARIA Label
        >
           <FaInfoCircle /> Ver Detalle
        </Link>

        <StyledButton 
          onClick={() => addToCart(product)}
          aria-label={`Agregar ${product.name} al carrito`} // ARIA Label
        >
          <FaCartPlus /> Agregar al Carrito
        </StyledButton>
      </div>
    </div>
  );
};

export default ProductCard;