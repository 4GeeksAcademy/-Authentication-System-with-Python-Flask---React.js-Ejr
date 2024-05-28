import React, { useState, useEffect } from 'react';

export const Trolley = () => {
  // Estado para almacenar los datos del carrito
  const [trolleyItems, setTrolleyItems] = useState([]);

  // Efecto para obtener los datos del carrito desde la API
  useEffect(() => {
    // Aquí realizarías una solicitud a la API para obtener los datos del carrito
    // Por ahora, solo vamos a simular algunos datos de ejemplo
    const fakeData = [
      { id: 1, title: 'Curso de React', price: 100 },
      { id: 2, title: 'Curso de JavaScript', price: 150 },
      { id: 3, title: 'Curso de HTML', price: 80 }
    ];
    setTrolleyItems(fakeData); // Simulamos la actualización del estado con los datos obtenidos
  }, []);

  return (
    <div>
      <h2>Trolley de compras</h2>
      <ul>
        {trolleyItems.map(item => (
          <li key={item.id}>
            <span>{item.title}</span>
            <span>{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
