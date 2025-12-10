import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Nav2 from '../components/Nav2';
import Footer from '../components/Footer';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import MySpinner from '../components/MySpinner';

const MySwal = withReactContent(Swal);

const MainContiner = styled.div`
  :root {
    font-size: 16px;
  }
  *{
    margin: 0;
    padding: 0;
    font-family: roboto, sans-serif;
  }
`;

export default function EliminarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Hubo un problema al cargar el producto.');
        setLoading(false);
      });
  }, [id]);

  const eliminarProducto = async () => {
    const result = await MySwal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el producto permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        const respuesta = await fetch(`http://localhost:8080/products/${id}`, {
          method: 'DELETE',
        });

        if (!respuesta.ok) throw new Error('Error al eliminar el producto.');

        await MySwal.fire('Eliminado', 'El producto fue eliminado.', 'success');
        navigate('/delete');
      } catch (error) {
        console.error(error.message);
        MySwal.fire('Error', 'Hubo un problema al eliminar el producto.', 'error');
      }
    }
  };

  if (loading) return <MySpinner />;
  if (error) return <p>{error}</p>;

  return (
    <MainContiner>
      <Header />
      <h2>Borrar Producto</h2>
      <div style={{
        border: "1px solid #ccc",
        padding: "20px",
        width: "500px",
        display: "flex",
        gap: "20px",
        borderRadius: "8px",
        margin: "20px auto"
      }}>
        <img src={`http://localhost:8080${product.photo}`} alt={product.name} style={{ width: "200px", height: "200px", borderRadius: "4px", objectFit: "cover" }} />
        <div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price} USD</p>
          <button
            onClick={eliminarProducto}
            style={{
              padding: "10px 15px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Eliminar Producto
          </button>
        </div>
      </div>
      <Footer />
      <Nav2 />
    </MainContiner>
  );
}
