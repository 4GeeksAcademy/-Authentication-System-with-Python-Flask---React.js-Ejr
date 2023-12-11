import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/prestadorCv.css";
import "./../pages/home.js"

const data = [
  { id: 1, title: 'Servicio de gasfitería', description: 'Reparación de cañerías', category: 'Gasfitería' },
  { id: 2, title: 'Instalación eléctrica residencial', description: 'Cableado y conexiones', category: 'Electricista' },
  { id: 3, title: 'Servicio de carpintería', description: 'Construcción y reparación de muebles', category: 'Carpintería' },
  // Añade más datos según sea necesario
];


const JobPost = ({ id, title, description, category, onContact }) => (
  <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '15px' }}>
    <h3>{title}</h3>
    <p><strong>Categoría:</strong> {category}</p>
    <p>{description}</p>
    <button onClick={() => onContact(id)} className="btn btn-success">
      Contactar
    </button>
  </div>
);

// Componente principal
const PrestadorCv = () => {
  const [posts] = useState(data); // Datos de publicaciones

  const [filteredCategory, setFilteredCategory] = useState(null); // Estado para filtrar por categoría

  const handleCategoryFilter = category => {
    setFilteredCategory(category === filteredCategory ? null : category);
  };

  const handleContact = postId => {
    // Aquí puedes implementar la lógica para contactar al prestador usando el postId
    console.log(`Contactar al prestador con ID: ${postId}`);
    // Por ejemplo, puedes abrir un formulario de contacto o realizar una acción específica
  };

  return (

    <div div className="container" style={{ justifyContent: 'center' }}>
    <div className="prestadores-cv-container">
      <button
        type="button"
        className="btn btn btn-lg"
        style={{
          background: "#3Bd7BA",
          margin: "5px",
          width: "100%",
        }}
      >
        Aseo
      </button>
      <button
        type="button"
        className="btn btn btn-lg"
        style={{
          background: "#3Bd7BA",
          margin: "5px",
          width: "100%",
        }}
      >
        Carpintería
      </button>
      <button
        type="button"
        className="btn btn btn-lg"
        style={{
          background: "#3Bd7BA",
          margin: "5px",
          width: "100%",
        }}
      >
        Electricista
      </button>
      <button
        type="button"
        className="btn btn btn-lg"
        style={{
          background: "#3Bd7BA",
          margin: "5px",
          width: "100%",
        }}
      >
        Gasfitería
      </button>
      <button
        type="button"
        className="btn btn btn-lg"
        style={{
          background: "#3Bd7BA",
          margin: "5px",
          width: "100%",
        }}
      >
        Pintor
      </button>

    </div>
    </div>
  );
};

export default PrestadorCv;
