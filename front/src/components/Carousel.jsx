import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

function UncontrolledExample() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/products')
      .then(res => res.json())
      .then(res => {
        setData(res);
      })
      .catch(() => {
        setError('Hubo un problema al cargar los productos.');
      });
  }, []);

  if (error) return <p>{error}</p>;

  // Mientras no haya datos, mostrar mensaje o spinner
  if (data.length === 0) return <p>Cargando productos...</p>;

  return (
    <Carousel>
      {data.slice(0, 3).map((product, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={`http://localhost:8080${product.photo}`}
            alt={product.name}
            style={{ height: '300px', objectFit: 'contain' }}
          />
          <Carousel.Caption>

            <h3 style={{
              color: 'white',
              fontWeight: 'bold',
              backgroundColor: 'rgba(0,0,0,0.6)', // gris oscuro translúcido
              padding: '4px 8px',
              borderRadius: '4px'
          }}>
              {product.name}
          </h3>

          <p style={{
              color: 'white',
              fontWeight: 'bold',
              backgroundColor: 'rgba(0,0,0,0.6)',
              padding: '4px 8px',
              borderRadius: '4px'
          }}>
              {product.description}
          </p>


          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default UncontrolledExample;
