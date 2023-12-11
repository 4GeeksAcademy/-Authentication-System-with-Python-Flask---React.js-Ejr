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
<<<<<<< HEAD
    <div>
      <div className="prestadores-cv-container">
        <button type="button" className="btn btn-primary btn-lg" onClick={() => handleCategoryFilter('Aseo')}>
          Aseo
        </button>
        <button type="button" className="btn btn-primary btn-lg" onClick={() => handleCategoryFilter('Carpintería')}>
          Carpintería
        </button>
        <button type="button" className="btn btn-primary btn-lg" onClick={() => handleCategoryFilter('Electricista')}>
          Electricista
        </button>
        <button type="button" className="btn btn-primary btn-lg" onClick={() => handleCategoryFilter('Gasfitería')}>
          Gasfitería
        </button>
        <button type="button" className="btn btn-primary btn-lg" onClick={() => handleCategoryFilter('Maestro Pintor')}>
          Maestro Pintor
        </button>
      </div>
      <div className="job-posts">
        {posts.map(post => (
          // Verificar si la publicación coincide con la categoría filtrada o mostrar todas si no hay filtro
          (!filteredCategory || post.category === filteredCategory) && (
            <JobPost
              key={post.id}
              id={post.id}
              title={post.title}
              description={post.description}
              category={post.category}
              onContact={handleContact} // Pasar la función handleContact al componente JobPost
            />
          )
        ))}
      </div>
      <div>
        <Link to="/">
          <button className=' btn btn-primary btn-lg'>
            Regresar
          </button>
        </Link>
      </div>
=======
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
>>>>>>> 5f23b9b2ed7f2fee9eba193e6002452b336c575f
    </div>
    </div>
  );
};

export default PrestadorCv;
