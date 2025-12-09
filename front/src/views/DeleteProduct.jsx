import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Nav2 from '../components/Nav2';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Producto from './vistAgregarCarrito';
import Cart from './Cart';
import Gallery from '../components/Gallery';
import DeleteGallery from '../components/DeleteGallery';



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

export default function Home() {

  return (
    <MainContiner>
        <Header />
          <h2>Borrar Producto</h2>
          <DeleteGallery />
        <Footer />
        <Nav2 />
    </MainContiner>
  )
}