import React, { createContext, useState, useEffect } from 'react';

export const TotalContext = createContext();

export function TotalProvider({ children }) {
  const [subtotales, setSubtotales] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const nuevoTotal = Object.values(subtotales).reduce((acc, val) => acc + val, 0);
    setTotal(nuevoTotal);
  }, [subtotales]);

  const actualizarSubtotal = (id, subtotal) => {
    setSubtotales(prev => ({ ...prev, [id]: subtotal }));
  };

  const resetearTotal = () => {
    setSubtotales({});
  };

  const eliminarSubtotal = (id) => {
  setSubtotales(prev => {
    const nuevo = { ...prev };
    delete nuevo[id];
    return nuevo;
  });
};

  return (
    <TotalContext.Provider value={{ total, actualizarSubtotal, resetearTotal, eliminarSubtotal }}>
      {children}
    </TotalContext.Provider>
  );
}
