import React, { useState } from 'react';
import Header from '../components/Header';
import Nav2 from '../components/Nav2';
import styled from 'styled-components';
import Footer from '../components/Footer';

export default function NotFound()
{
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

  return (
    <MainContiner>
        <Header />
        <h1>Página no encontrada</h1>        
        <Footer />
        <Nav2 />
    </MainContiner>
  )
}