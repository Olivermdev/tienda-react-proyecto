import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext.jsx';
import { Helmet } from 'react-helmet'; 
import { FaCartPlus } from 'react-icons/fa'; 

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addToCart } = useContext(CarritoContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [productId]);

  if (loading) return (
    <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );

  if (!product) return <h2 className="text-center mt-5">Producto no encontrado</h2>;

  return (
    <div className="container mt-5">

      <Helmet>
        <title>{product.title} | Mi Tienda</title>
        <meta name="description" content={`Compra ${product.title} por solo $${product.price}`} />
      </Helmet>

      <div className="row align-items-center">

        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img 
            src={product.image} 
            alt={product.title} 
            className="img-fluid rounded shadow-sm" 
            style={{ maxHeight: '400px', objectFit: 'contain' }} 
          />
        </div>


        <div className="col-md-6">
          <h2 className="display-6 fw-bold">{product.title}</h2>
          <p className="text-muted text-uppercase small">{product.category}</p>
          <p className="lead">{product.description}</p>
          
          <h3 className="text-primary my-4 display-5 fw-bold">${product.price}</h3>
          
          <button 
            onClick={() => addToCart(product)}
            className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center gap-2"
          >
            <FaCartPlus /> Agregar al Carrito
          </button>
          
          <div className="mt-3">
             <small className="text-muted">Envío gratis en compras mayores a $50</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;