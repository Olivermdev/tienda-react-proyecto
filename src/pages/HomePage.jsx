import React, { useContext, useState, useMemo } from 'react';
import { ProductsContext } from '../context/ProductsContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa'; 

const PaginationButton = styled.button`
  background-color: ${props => props.disabled ? '#ccc' : '#007bff'};
  color: white;
  border: none;
  padding: 8px 16px;
  margin: 0 5px;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  gap: 5px;
  &:hover {
    background-color: ${props => props.disabled ? '#ccc' : '#0056b3'};
  }
`;

const HomePage = () => {
  const { products, loading } = useContext(ProductsContext);
  
  const [searchTerm, setSearchTerm] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <>
      <Helmet>
        <title>Catálogo | Mi Tienda</title>
        <meta name="description" content="Explora nuestro catálogo de productos." />
      </Helmet>

      <div className="d-flex flex-column align-items-center mb-4">
        <h2 className="text-center mb-3">Nuestros Productos</h2>
        
        <div className="input-group" style={{ maxWidth: '500px' }}>
          <span className="input-group-text bg-white border-end-0">
            <FaSearch className="text-muted" />
          </span>
          <input 
            type="text" 
            className="form-control border-start-0" 
            placeholder="Buscar por nombre o categoría..." 
            value={searchTerm}
            onChange={handleSearch}
            aria-label="Buscar productos"
          />
        </div>
      </div>
      
      {currentProducts.length > 0 ? (
        <div className="row">
          {currentProducts.map(product => (
            <div key={product.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-4">
          <h4>No se encontraron productos que coincidan con "{searchTerm}"</h4>
        </div>
      )}

      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-4 mb-5">
          <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
            <FaChevronLeft /> Anterior
          </PaginationButton>

          <span className="mx-3 fw-bold">
            Página {currentPage} de {totalPages}
          </span>

          <PaginationButton onClick={nextPage} disabled={currentPage === totalPages}>
            Siguiente <FaChevronRight />
          </PaginationButton>
        </div>
      )}
    </>
  );
};

export default HomePage;