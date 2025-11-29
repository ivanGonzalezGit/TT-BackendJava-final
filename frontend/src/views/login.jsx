import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import Header from '../components/Header';
import Nav2 from '../components/Nav2';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { Link } from "react-router-dom";
import NavBoton from "../components/NavBoton";

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

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://686a90e8e559eba9087056bc.mockapi.io/api/admin');
      const usuarios = await res.json();

      const existeUsuario = usuarios.some(u => u.name === usuario && u.pass === password);

      if (!existeUsuario) {
        alert('Usuario o contraseña incorrectos');
        navigate('/registry');
        return;
      }

      localStorage.setItem('usuario', usuario);
      login(usuario);
      navigate('/admin');

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const estilo = {
    color: 'white',
    background: '#30966C',
    borderRadius: '3px',
    width: '12.5rem',
  };

  return (
    <MainContiner>
      <Header />
      <Content>
        <h1>Login</h1>

        <FormContainer onSubmit={handleSubmit}>
          <h2>Iniciar sesión</h2>

          <div>
            <label>Usuario:</label><br />
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Contraseña:</label><br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <NavBoton type="submit" cont='Iniciar Sesión' estilo={estilo} />
          
          <Link to={'/registry'} style={{ marginTop: '1rem' }}>
            <NavBoton cont='Registro' estilo={estilo} />
          </Link>
        </FormContainer>


      </Content>
      <Footer/>
      <Nav2 />
    </MainContiner>
  );
}
