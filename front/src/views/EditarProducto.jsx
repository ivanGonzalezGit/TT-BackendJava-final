import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Nav2 from '../components/Nav2';
import NavBoton from '../components/NavBoton';
import styled from 'styled-components';


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

const Textarea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;

export default function FormularioProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: ''
  });
  const [errores, setErrores] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`https://686a90e8e559eba9087056bc.mockapi.io/api/product/${id}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(() => {
          setError('Error al cargar el producto');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!product.name.trim()) {
      nuevosErrores.name = 'El nombre es obligatorio.';
    }

    if (!product.price || product.price <= 0) {
      nuevosErrores.price = 'El precio debe ser mayor a 0.';
    }

    if (!product.description.trim() || product.description.length < 10) {
      nuevosErrores.description = 'La descripción debe tener al menos 10 caracteres.';
    }

    if (!product.image.trim()) {
      nuevosErrores.image = 'Debe ingresar una URL de una foto.';
    }

    if (!product.category.trim()) {
      nuevosErrores.category = 'El producto debe pertenecer a una categoría.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      if (id) {
        await fetch(`https://686a90e8e559eba9087056bc.mockapi.io/api/product/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        });
      } else {
        await fetch('https://686a90e8e559eba9087056bc.mockapi.io/api/product', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        });
      }

      navigate('/admin');
    } catch (err) {
      console.error('Error al guardar:', err);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  const estilo = {
    color: 'white',
    background: '#62162F',
    borderRadius: '3px',
    width: '12.5rem',
    border: 'none'
  };

  return (
    <MainContiner>
    <Header />
      <FormWrapper onSubmit={handleSubmit}>
        <h2>{id ? 'Editar Producto' : 'Agregar Producto'}</h2>

        <InputGroup>
          <Label>Nombre:</Label>
          <Input type="text" name="name" value={product.name} onChange={handleChange} required />
          {errores.name && <ErrorText>{errores.name}</ErrorText>}
        </InputGroup>

        <InputGroup>
          <Label>Precio:</Label>
          <Input type="number" name="price" value={product.price} onChange={handleChange} required min="0" step="0.01" />
          {errores.price && <ErrorText>{errores.price}</ErrorText>}
        </InputGroup>

        <InputGroup>
          <Label>Descripción:</Label>
          <Textarea name="description" value={product.description} onChange={handleChange} required />
          {errores.description && <ErrorText>{errores.description}</ErrorText>}
        </InputGroup>

        <InputGroup>
          <Label>Imagen (URL):</Label>
          <Input type="text" name="image" value={product.image} onChange={handleChange} required />
          {errores.image && <ErrorText>{errores.image}</ErrorText>}
        </InputGroup>

        <InputGroup>
          <Label>Categoría:</Label>
          <Input type="text" name="category" value={product.category} onChange={handleChange} required />
          {errores.category && <ErrorText>{errores.category}</ErrorText>}
        </InputGroup>

        <NavBoton type="submit" cont={id ? 'Guardar Cambios' : 'Agregar Producto'} estilo={estilo} />
      </FormWrapper>
    <Footer />
    <Nav2 />
    </MainContiner>  
  );
}
