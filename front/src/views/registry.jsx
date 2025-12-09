import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import Header from '../components/Header';
import Nav2 from '../components/Nav2';
import styled from 'styled-components';
import Footer from '../components/Footer';
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

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  min-width: 320px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.25rem;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export default function Registry() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ 
    name: '', 
    pass: '', 
  }); 

  const handleChange = (e) => { 
    const { name, value } = e.target; 
    setUser({ ...user, [name]: value }); 
  }; 

  const handleSubmit = async (e) => { 
    e.preventDefault(); 

    try {
      const res = await fetch('https://686a90e8e559eba9087056bc.mockapi.io/api/admin');
      const usuarios = await res.json();

      const existeUsuario = usuarios.some(u => u.name === user.name);

      if (existeUsuario) {
        alert('El nombre de usuario ya está registrado. Elegí otro.');
        return; 
      }

      const response = await fetch('https://686a90e8e559eba9087056bc.mockapi.io/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });

      if (!response.ok) throw new Error('Error al registrar usuario');

      const data = await response.json();
      console.log('Usuario registrado:', data);

      setUser({ name: '', pass: '' });
      alert('Usuario registrado exitosamente');
      navigate('/login');
      
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al registrar el usuario');
    }
  };

  const estilo = {
    color: 'white',
    background: '#30966C',
    borderRadius: '3px',
    width: '12.5rem',
    border: 'none'
  };

  return (
    <MainContiner>
      <Header />

      <Content>
        <h1>Registro</h1>

        <FormWrapper onSubmit={handleSubmit}>
          <h2>Registro de Administrador</h2> 

          <InputGroup> 
            <Label>Usuario:</Label> 
            <Input 
              type="text" 
              name="name"
              value={user.name} 
              onChange={handleChange} 
              required 
            /> 
          </InputGroup> 

          <InputGroup> 
            <Label>Contraseña:</Label> 
            <Input 
              type="password" 
              name="pass" 
              value={user.pass} 
              onChange={handleChange} 
              required 
            /> 
          </InputGroup> 

          <NavBoton type="submit" cont="Registrar Usuario" estilo={estilo} />
        </FormWrapper>
      </Content>

      <Footer />
      <Nav2 />
    </MainContiner>
  );
}
