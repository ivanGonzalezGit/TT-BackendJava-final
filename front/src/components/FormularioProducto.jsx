import React, { useState } from 'react';
import NavBoton from './NavBoton';

function FormularioProducto({ onAgregar }) {
  const [errores, setErrores] = useState({});
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: ''
  });

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
      nuevosErrores.category = 'El producto debe pertenecer a una categoría';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      onAgregar(product);
      setProduct({ name: '', price: '', description: '', image: '', category: '' });
      setErrores({});
    }
  };

  const estilo = {
    color: '#F5ABB0',
    background: '#62162F',
    border: 'none',
    width: '12.5rem'
  };

  return (
    <form style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}} onSubmit={handleSubmit}>
      <h2>Agregar Producto</h2>
      
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
        {errores.name && <p style={{ color: 'red' }}>{errores.name}</p>}
      </div>

      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01" 
        />
        {errores.price && <p style={{ color: 'red' }}>{errores.price}</p>}
      </div>

      <div>
        <label>Descripción:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />
        {errores.description && <p style={{ color: 'red' }}>{errores.description}</p>}
      </div>

        <div>
        <label>Imágen:</label>
        <textarea
          name="image"
          value={product.image}
          onChange={handleChange}
          required
        />
        {errores.image && <p style={{ color: 'red' }}>{errores.image}</p>}
      </div>

        <div>
        <label>Categoría:</label>
        <textarea
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        />
        {errores.category && <p style={{ color: 'red' }}>{errores.category}</p>}
      </div>

      <NavBoton type="submit" cont="Agregar Producto" estilo={estilo} />
    </form>
  );
}

export default FormularioProducto;
