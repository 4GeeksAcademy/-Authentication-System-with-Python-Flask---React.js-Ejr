import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/prestadorCv.css";
import "./../pages/home.js";

// // const data = [
//   {
//     id: 1,
//     titulo: "Servicio de gasfitería",
//     nombre: "Juan",
//     apellido: "Diaz",
//     descripcion: "Reparación de cañerías",
//     comuna: "La Reina",
//     categoria: "Gasfitería",
//     fecha: "12-12-2023",
//   },
//   {
//     id: 2,
//     titulo: "Instalación eléctrica residencial",
//     nombre: "Juan",
//     apellido: "Diaz",
//     descripcion: "Reparación de cañerías",
//     comuna: "La Reina",
//     categoria: "Gasfitería",
//     fecha: "12-12-2023",
//   },
//   {
//     id: 3,
//     titulo: "Servicio de carpintería",
//     nombre: "Juan",
//     apellido: "Diaz",
//     descripcion: "Reparación de cañerías",
//     comuna: "La Reina",
//     categoria: "Gasfitería",
//     fecha: "12-12-2023",
//   },
//   // Añade más datos según sea necesario
// ];

const JobPost = ({
  id,
  titulo,
  nombre,
  apellido,
  descripcion,
  comuna,
  rubro,
  fecha,
  onContact,
}) => (
  <div
    style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "15px" }}
  >
    <h3>{titulo}</h3>
    <p>
      <strong>Nombre:</strong> {nombre} {apellido}
    </p>
    <p>{descripcion}</p>
    <p>
      <strong>Comuna:</strong> {comuna}
    </p>
    <p>
      <strong>Categoría:</strong> {rubro}
    </p>
    <p>
      <strong>Fecha:</strong> {fecha}
    </p>
    <button onClick={() => onContact(id)} className="btn btn-success">
      Contactar
    </button>
  </div>
);

// Componente principal
const PrestadorCv = () => {
  const [data, setData] = useState(data); // Datos de publicaciones

  const [filteredCategoria, setFilteredCategoria] = useState(null); // Estado para filtrar por categoría
  useEffect(() => {
    fetch("http://localhost:3001/publicaciones")
      .then((response) => response.json())
      .then((data) => {
        setData(data.publicaciones);
      });
  }, []);
  const handleCategoriaFilter = (categoria) => {
    setFilteredCategoria(categoria === filteredCategoria ? null : categoria);
  };

  const handleContact = (postId) => {
    // Aquí puedes implementar la lógica para contactar al prestador usando el postId
    console.log(`Contactar al prestador con ID: ${postId}`);
    // Por ejemplo, puedes abrir un formulario de contacto o realizar una acción específica
  };

  return (
    <div div className="container" style={{ justifyContent: "center" }}>
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
      <div>
        {data?.map((element) => (
          <JobPost {...element} />
        ))}
      </div>
    </div>
  );
};

export default PrestadorCv;
