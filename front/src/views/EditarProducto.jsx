import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Nav2 from '../components/Nav2';
import NavBoton from '../components/NavBoton';
import styled from 'styled-components';

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
    product_id: null,
    name: '',
    description: '',
    photo: '',
    thumbnail: '',
    price: '',
    category: '',
    subcategory: '',
    stock: ''
  });

  const [errores, setErrores] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ----- CARGAR PRODUCTO -----
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/products/${id}`)
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

  // ----- MANEJAR CAMBIOS -----
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!product.name.trim()) nuevosErrores.name = 'El nombre es obligatorio.';
    if (!product.price || product.price <= 0) nuevosErrores.price = 'El precio debe ser mayor a 0.';
    if (!product.description.trim() || product.description.length < 10)
      nuevosErrores.description = 'La descripción debe tener al menos 10 caracteres.';
    if (!product.photo.trim()) nuevosErrores.photo = 'Debe ingresar una URL de foto.';
    if (!product.category.trim()) nuevosErrores.category = 'Debe ingresar una categoría.';
    if (!product.subcategory.trim()) nuevosErrores.subcategory = 'Debe ingresar una subcategoría.';
    if (!product.stock || product.stock < 0) nuevosErrores.stock = 'El stock no puede ser negativo.';

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // ----- GUARDAR -----
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      if (id) {
        // EDITAR
        await fetch(`http://localhost:8080/products/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        });
      } else {
        // CREAR
        await fetch('http://localhost:8080/products', {
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
          <Input type="text" name="name" value={product.name} onChange={handleChange} />
          {errores.name && <ErrorText>{errores.name}</ErrorText>}
        </InputGroup>

        <InputGroup>
          <Label>Precio:</Label>
          <Input type="number" name="price" value={product.price} onChange={handleChange} />
          {errores.price && <ErrorText>{errores.price}</ErrorText>}
        </InputGroup>

        <InputGroup>
          <Label>Descripción:</Label>
          <Textarea name="description" value={product.description} onChange={handleChange} />
          {errores.description && <ErrorText>{errores.description}</ErrorText>}
        </InputGroup>

        <InputGroup>
          <Label>Foto (URL):</Label>
          <Input type="text" name="photo" value={product.photo} onChange={handleChange} />
          {errores.photo && <ErrorText>{errores.photo}</ErrorText>}
        </InputGroup>

        <InputGroup>
          <Label>Thumbnail (URL):</Label>
          <Input type="text" name="thumbnail" value={product.thumbnail} onChange={handleChange} />
        </InputGroup>

        <InputGroup>
          <Label>Categoría:</Label>
          <Input type="text" name="category" value={product.category} onChange={handleChange} />
          {errores.category && <ErrorText>{errores.category}</ErrorText>}
        </InputGroup>

        <InputGroup>
          <Label>Subcategoría:</Label>
          <Input type="text" name="subcategory" value={product.subcategory} onChange={handleChange} />
          {errores.subcategory && <ErrorText>{errores.subcategory}</ErrorText>}
        </InputGroup>

        <InputGroup>
          <Label>Stock:</Label>
          <Input type="number" name="stock" value={product.stock} onChange={handleChange} />
          {errores.stock && <ErrorText>{errores.stock}</ErrorText>}
        </InputGroup>

        <NavBoton type="submit" cont={id ? 'Guardar Cambios' : 'Agregar Producto'} estilo={estilo} />
      </FormWrapper>

      <Footer />
      <Nav2 />
    </MainContiner>
  );
}
