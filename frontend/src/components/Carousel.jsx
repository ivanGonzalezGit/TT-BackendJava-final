import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

function UncontrolledExample() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://686a90e8e559eba9087056bc.mockapi.io/api/product')
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
            src={product.image}
            alt={product.name}
            style={{ height: '400px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default UncontrolledExample;
