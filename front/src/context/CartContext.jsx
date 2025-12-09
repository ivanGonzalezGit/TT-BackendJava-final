import React, { createContext, useState } from 'react';

// Crear el contexto
export const CartContext = createContext();

// Proveedor del contexto
export function CartProvider({ children }) {
 const [cart, setCart] = useState([]);

const addCart = (product) => {
  setCart(prev => {
    if (!prev.find(p => p.product_id === product.product_id)) {
      return [...prev, product];
    }
    return prev;
  });
};

 const emptyCart = () => {
 setCart([]);
 };

 const removeFromCart = (id) => {
  setCart(prev => prev.filter(producto => producto.product_id !== id));
};

 return (
 <CartContext.Provider value={{ cart, addCart, emptyCart, removeFromCart }}>
    {children}
 </CartContext.Provider>
 );
}
