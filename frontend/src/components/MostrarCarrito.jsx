import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { TotalContext } from "../context/TotalContext";
import { CartContext } from "../context/CartContext";


const ContenedorItemCarrito = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 3rem;
  background: grey;
  border-bottom: 1px solid #ccc;
  font-size: 1rem;

  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }

  .info {
    flex: 2;
    margin-left: 16px;
  }

  .contador {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .contador button {
    background: #007bff;
    color: white;
    border: none;
    padding: 4px 10px;
    cursor: pointer;
    font-size: 1.2rem;
    border-radius: 4px;
  }

  .contador button:hover {
    background: #0056b3;
  }

  .precio, .subtotal {
    font-weight: bold;
  }
`;

export default function MostrarCarrito({ product }) {
  const [cantidad, setCantidad] = useState(1);
  const [subtotal, setSubtotal] = useState(0);
  const { actualizarSubtotal, eliminarSubtotal } = useContext(TotalContext);
  const { cart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    const nuevoSubtotal = cantidad * Number(product.price);
    setSubtotal(nuevoSubtotal);
    actualizarSubtotal(product.id, nuevoSubtotal);
  }, [cantidad, product.price]);

  const incrementarCantidad = () => setCantidad(prev => prev + 1);
  const decrementarCantidad = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1));


const eliminarItem = () => {
  removeFromCart(product.id);
  eliminarSubtotal(product.id);
};

  return (
    <ContenedorItemCarrito>
      <img src={product.image} alt={product.name} />
      <div className="info">
        <div>{product.name}</div>
        <div className="precio">${Number(product.price).toFixed(2)}</div>
      </div>
      <div className="contador">
        <button onClick={decrementarCantidad}>−</button>
        <div>{cantidad}</div>
        <button onClick={incrementarCantidad}>+</button>
      </div>
      <div className="subtotal">${subtotal.toFixed(2)}</div>
      <button style={{
        color: 'D9D9D9', 
        background: 'green', 
        margin: '0rem 0.5rem',
        padding: '0.5rem',
        border: 'none',
        borderRadius: '4px'
        }} onClick={eliminarItem}>Eliminar</button>
    </ContenedorItemCarrito>
  );
}