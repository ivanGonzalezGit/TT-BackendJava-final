import React from 'react';
import Header from '../components/Header';
import Nav2 from '../components/Nav2';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import  UncontrolledExample from '../components/Carousel';


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
          <UncontrolledExample />
          <Gallery />
        <Footer />
        <Nav2 />
    </MainContiner>
  )
}