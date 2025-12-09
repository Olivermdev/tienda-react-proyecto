import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext.jsx';

const AddProductPage = () => {
  const { addProduct, updateProduct, products } = useContext(ProductsContext);
  const navigate = useNavigate();
  const { id } = useParams(); 

  // Estado inicial para limpiar fácil el formulario
  const initialFormState = {
    name: '',
    price: '',
    description: '',
    image: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (id) {
      const productToEdit = products.find(p => p.id === id);
      if (productToEdit) {
        setFormData(productToEdit);
      }
    }
  }, [id, products]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!formData.price) newErrors.price = "El precio es obligatorio.";
    else if (Number(formData.price) <= 0) newErrors.price = "El precio debe ser mayor a 0."; // Validación Precio > 0
    if (!formData.description.trim()) newErrors.description = "La descripción es obligatoria.";
    else if (formData.description.length < 10) newErrors.description = "La descripción debe tener al menos 10 caracteres."; // Validación caracteres

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage({ type: '', text: '' }); 

    if (!validate()) return;

    let success = false;
    
    if (id) {
      success = await updateProduct(id, formData);
      if (success) setStatusMessage({ type: 'success', text: '¡Producto editado correctamente!' });
    } else {
      success = await addProduct(formData); 
      if (success) {
        setStatusMessage({ type: 'success', text: '¡Producto agregado con éxito!' });
        setFormData(initialFormState); 
      }
    }

    if (!success) {
      setStatusMessage({ type: 'error', text: 'Hubo un error al guardar el producto.' });
    } else {
        if (id) setTimeout(() => navigate('/'), 2000);
    }
  };

  return (
    <div className="add-product-container" style={{ maxWidth: '500px', margin: '30px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center' }}>{id ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>

      {statusMessage.text && (
        <div style={{
          padding: '10px',
          marginBottom: '15px',
          borderRadius: '5px',
          backgroundColor: statusMessage.type === 'success' ? '#d4edda' : '#f8d7da',
          color: statusMessage.type === 'success' ? '#155724' : '#721c24',
          textAlign: 'center'
        }}>
          {statusMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Nombre:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '8px', border: errors.name ? '1px solid red' : '1px solid #ccc' }}
          />
          {errors.name && <small style={{ color: 'red' }}>{errors.name}</small>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Precio:</label>
          <input 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '8px', border: errors.price ? '1px solid red' : '1px solid #ccc' }}
          />
          {errors.price && <small style={{ color: 'red' }}>{errors.price}</small>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Imagen (URL):</label>
          <input 
            type="text" 
            name="image" 
            value={formData.image} 
            onChange={handleChange} 
            placeholder="https://..."
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Descripción:</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '8px', border: errors.description ? '1px solid red' : '1px solid #ccc', minHeight: '80px' }}
          />
          {errors.description && <small style={{ color: 'red' }}>{errors.description}</small>}
        </div>

        <button 
          type="submit" 
          style={{ width: '100%', padding: '10px', backgroundColor: id ? '#f39c12' : '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
        >
          {id ? 'Guardar Cambios' : 'Agregar Producto'}
        </button>
        
        <button 
          type="button" 
          onClick={() => navigate('/')}
          style={{ width: '100%', marginTop: '10px', padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Volver al Inicio
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;