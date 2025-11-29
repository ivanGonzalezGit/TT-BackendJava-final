import React, { useState, useContext, useEffect } from 'react';
import Header from '../components/Header';
import Nav1 from '../components/Nav1';
import Nav2 from '../components/Nav2';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { CartContext } from '../context/CartContext';
import { TotalContext } from '../context/TotalContext';
import MostrarCarrito from '../components/MostrarCarrito';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);

const MainContiner = styled.div`
  :root
  {
    fonti-size: 16px;
  }

  *{
  margin: 0;
  padding: 0;
  font-family: roboto, sans-serif;
  }
`;

const Total = styled.div`
  display: flex;
  flex-direction: row;
`;


export default function Cart() {
  const { cart, emptyCart } = useContext(CartContext);
  const { total, resetearTotal } = useContext(TotalContext);

  function vaciarCarrito()
  {
    emptyCart();
    resetearTotal();
  }

  function realizarCompra()
  {
    emptyCart();
    resetearTotal();
    MySwal.fire({
      title: <p>¡La compra se realizó correctamente!</p>,
      text: '¡Gracias por su compra!',
      icon: 'success',
      confirmButtonText: 'Aceptar'
      }).then(() => {
      navigate('/');
    });
  }

  return (
    <MainContiner>
      <Header />
      <div>
        <h1>Carrito de Compras</h1>

        {cart.length > 0 ? (
          cart.map((product, index) => (
            <MostrarCarrito key={index} product={product} />
          ))
        ) : (
          <p>El carrito está vacío.</p>
        )}

        {cart.length > 0 && 
          <div>
            <button onClick={vaciarCarrito}>Vaciar Carrito</button>          
            <button onClick={realizarCompra}>Realizar Compra</button>
          </div>
        }

        <Total>
          <div style={{ width: '80%', padding: '0.5rem' }}><h3>Total</h3></div>
          <div style={{ width: '20%', padding: '0.5rem' }}>${total.toFixed(2)}</div>
        </Total>
      </div>
      <Footer />
      <Nav2 />
    </MainContiner>
  );
}