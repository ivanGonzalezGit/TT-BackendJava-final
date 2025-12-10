import React, { useState, useEffect } from 'react';
import NavBoton from './NavBoton';

function FormularioProducto({ onAgregar }) {
  const [errores, setErrores] = useState({});
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    photo: '',
    thumbnail: '',
    price: '',
    category: '',
    subcategory: '',
    stock: ''
  });

  // Actualiza photo y thumbnail automáticamente a partir del nombre
  useEffect(() => {
    if (productData.name.trim()) {
      const normalized = productData.name.trim().toLowerCase().replace(/\s+/g, '_');
      setProductData(prev => ({
        ...prev,
        photo: `/photos/${normalized}.jpg`,
        thumbnail: `/thumbnails/${normalized}.jpg`
      }));
    }
  }, [productData.name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!productData.name.trim()) nuevosErrores.name = 'El nombre es obligatorio.';
    if (!productData.description.trim() || productData.description.length < 10)
      nuevosErrores.description = 'La descripción debe tener al menos 10 caracteres.';
    if (!productData.photo.trim()) nuevosErrores.photo = 'Debe ingresar la URL de la foto.';
    if (!productData.thumbnail.trim()) nuevosErrores.thumbnail = 'Debe ingresar la URL del thumbnail.';
    if (!productData.price || Number(productData.price) <= 0) nuevosErrores.price = 'El precio debe ser mayor a 0.';
    if (!productData.category.trim()) nuevosErrores.category = 'Debe ingresar una categoría.';
    if (!productData.subcategory.trim()) nuevosErrores.subcategory = 'Debe ingresar una subcategoría.';
    if (!productData.stock || Number(productData.stock) < 0) nuevosErrores.stock = 'El stock debe ser 0 o mayor.';

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const newProduct = {
      name: productData.name,
      description: productData.description,
      photo: productData.photo,
      thumbnail: productData.thumbnail,
      price: Number(productData.price),
      category: productData.category,
      subcategory: productData.subcategory,
      stock: Number(productData.stock)
    };

    onAgregar(newProduct);

    setProductData({
      name: '',
      description: '',
      photo: '',
      thumbnail: '',
      price: '',
      category: '',
      subcategory: '',
      stock: ''
    });
    setErrores({});
  };

  const estilo = {
    color: '#F5ABB0',
    background: '#62162F',
    border: 'none',
    width: '12.5rem'
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} onSubmit={handleSubmit}>
      <h2>Agregar Producto</h2>

      <div>
        <label>Nombre:</label>
        <input type="text" name="name" value={productData.name} onChange={handleChange} required />
        {errores.name && <p style={{ color: 'red' }}>{errores.name}</p>}
      </div>

      <div>
        <label>Descripción:</label>
        <textarea name="description" value={productData.description} onChange={handleChange} required />
        {errores.description && <p style={{ color: 'red' }}>{errores.description}</p>}
      </div>

      <div>
        <label>Foto (URL):</label>
        <input type="text" name="photo" value={productData.photo} readOnly />
        {errores.photo && <p style={{ color: 'red' }}>{errores.photo}</p>}
      </div>

      <div>
        <label>Thumbnail (URL):</label>
        <input type="text" name="thumbnail" value={productData.thumbnail} readOnly />
        {errores.thumbnail && <p style={{ color: 'red' }}>{errores.thumbnail}</p>}
      </div>

      <div>
        <label>Precio:</label>
        <input type="number" name="price" value={productData.price} onChange={handleChange} required min="0" step="0.01" />
        {errores.price && <p style={{ color: 'red' }}>{errores.price}</p>}
      </div>

      <div>
        <label>Categoría:</label>
        <input type="text" name="category" value={productData.category} onChange={handleChange} required />
        {errores.category && <p style={{ color: 'red' }}>{errores.category}</p>}
      </div>

      <div>
        <label>Subcategoría:</label>
        <input type="text" name="subcategory" value={productData.subcategory} onChange={handleChange} required />
        {errores.subcategory && <p style={{ color: 'red' }}>{errores.subcategory}</p>}
      </div>

      <div>
        <label>Stock:</label>
        <input type="number" name="stock" value={productData.stock} onChange={handleChange} required min="0" />
        {errores.stock && <p style={{ color: 'red' }}>{errores.stock}</p>}
      </div>

      <NavBoton type="submit" cont="Agregar Producto" estilo={estilo} />
    </form>
  );
}

export default FormularioProducto;
