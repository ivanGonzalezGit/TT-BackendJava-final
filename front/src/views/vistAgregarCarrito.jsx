
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Producto({ producto }) {
 const { addCart } = useContext(CartContext);
 return (
    <div>
        <h2>{producto.nombre}</h2>
        <p>Precio: ${producto.precio}</p>
        <button onClick={() => addCart(producto)}>Agregar
al Carrito</button>
    </div>
 );
}
