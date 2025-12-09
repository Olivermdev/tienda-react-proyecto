import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'; // Iconos
import { CarritoContext } from '../context/CarritoContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { cart } = useContext(CarritoContext);
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">Mi Tienda</Link>
      
      <div className="ms-auto d-flex align-items-center gap-3">
        <Link to="/" className="text-white text-decoration-none">Inicio</Link>
        <Link to="/add-product" className="text-white text-decoration-none">Admin</Link>

        {/* Icono del Carrito con contador */}
        <Link to="/cart" className="btn btn-primary position-relative">
          <FaShoppingCart />
          {cart.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cart.length}
            </span>
          )}
        </Link>

        {isAuthenticated ? (
          <div className="d-flex align-items-center gap-2 text-white">
            <FaUser /> <span>{user?.name}</span>
            <button onClick={logout} className="btn btn-sm btn-danger d-flex align-items-center gap-1">
              <FaSignOutAlt /> Salir
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-sm btn-success d-flex align-items-center gap-1">
            <FaSignInAlt /> Ingresar
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;