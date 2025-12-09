import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx'; 
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username.trim()) {
      login({ name: username }); 
      navigate('/'); 
    } else {
      alert("Por favor ingresa un usuario");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h2>Iniciar Sesión</h2>
        <div style={{ marginBottom: '10px' }}>
          <label>Usuario: </label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default LoginPage;