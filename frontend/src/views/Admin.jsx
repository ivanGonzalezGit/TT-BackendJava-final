import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Nav2 from '../components/Nav2';
import styled from 'styled-components';
import Footer from '../components/Footer';
import FormularioProducto from '../components/FormularioProducto';
import NavBoton from '../components/NavBoton';

const MainContiner = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: #F1F1F1;
  font-family: roboto, sans-serif;
`;

const Content = styled.div`
  margin: 2rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  min-width: 320px;
`;

export default function Admin() {
  const estilo = {
    color: 'white',
    background: '#62162F',
    borderRadius: '3px',
    width: '12.5rem',
    border: 'none'
  };

  const agregarProducto = async (producto) => {
    try {
      const respuesta = await fetch(`https://686a90e8e559eba9087056bc.mockapi.io/api/product/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
      });

      if (!respuesta.ok) {
        throw new Error('Error al agregar el producto.');
      }

      const data = await respuesta.json();
      console.log('Producto agregado:', data);
      alert('Producto agregado correctamente');
    } catch (error) {
      console.error(error.message);
      alert('Hubo un problema al agregar el producto.');
    }
  };

  return (
    <MainContiner>
      <Header />
      <Content>
        <h1>Administrar Productos</h1>

        <FormWrapper>
          <FormularioProducto onAgregar={agregarProducto} />

          <Link to={'/edit'}>
            <NavBoton cont="Editar Producto" estilo={estilo} />
          </Link>

          <Link to={'/delete'}>
            <NavBoton cont="Eliminar Producto" estilo={estilo} />
          </Link>
        </FormWrapper>
      </Content>
      <Footer />
      <Nav2 />
    </MainContiner>
  );
}
