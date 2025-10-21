import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount }) => {
  return (
    <header>
      <nav>
        <Link to="/"><h1>Mi Tienda</h1></Link>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/category/electronics">Electrónica</Link></li>
          <li><Link to="/category/jewelery">Joyería</Link></li>
        </ul>
        <Link to="/cart">
          <span>🛒 Carrito ({cartCount})</span>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;