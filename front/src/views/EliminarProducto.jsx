import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Nav1 from '../components/Nav1';
import Nav2 from '../components/Nav2';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { redirect, useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import MySpinner from '../components/MySpinner';
import { CartContext } from '../context/CartContext';

const MySwal = withReactContent(Swal);

const MainContiner = styled.div`
  :root {
    font-size: 16px;
  }

  * {
    margin: 0;
    padding: 0;
    font-family: roboto, sans-serif;
  }
`;

export default function EliminarProducto() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { addCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://686a90e8e559eba9087056bc.mockapi.io/api/product/${id}`)
      .then(res => res.json())
      .then(res => {
        setProduct(res);
        setLoading(false);
      })
      .catch(() => {
        setError('Hubo un problema al cargar los productos.');
        setLoading(false);
      });
  }, [id]);

const eliminarProducto = async (id) => {
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
      const respuesta = await fetch(`https://686a90e8e559eba9087056bc.mockapi.io/api/product/${id}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) throw new Error('Error al eliminar el producto.');

      await MySwal.fire('Eliminado', 'El producto fue eliminado.', 'success');
      navigate('/');
    } catch (error) {
      console.error(error.message);
      MySwal.fire('Error', 'Hubo un problema al eliminar el producto.', 'error');
    }
  }
};

  if (loading) {
    return (
        <MainContiner>
          <Header />
          <Nav1 />
          <MySpinner />
          <Footer />
          <Nav2 />
        </MainContiner>
    )
  }

  if (error) return <p>{error}</p>;

  return (
    <MainContiner>
      <Header />
      <section style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px", flexWrap: "wrap" }}>
        <div key={product.id} style={{
          border: "1px solid #ccc",
          padding: "20px",
          width: "500px",
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          textAlign: "left",
          borderRadius: "8px"
        }}>
          <div>
            <img src={product.image} alt={product.name} style={{ width: "200px", height: "200px", borderRadius: "4px", objectFit: "cover" }} />
          </div>
          <div style={{ flex: 1 }}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price} USD</p>

            <button
              onClick={eliminarProducto(product.id)}
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
      </section>
      <Footer />
      <Nav2 />
    </MainContiner>
  );
}
