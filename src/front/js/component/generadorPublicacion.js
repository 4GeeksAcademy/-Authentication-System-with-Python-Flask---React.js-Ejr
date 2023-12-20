import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GeneradorPublicacion = ({ onRubroSeleccionado }) => {
  const [publicacion, setPublicacion] = useState({
    nombre: "",
    apellido: "",
    email: "",
    descripcion: "",
    comuna: "",
    rubro: "",
    fecha: "",
    idUser: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Puedes agregar código de inicialización si es necesario
  }, []);

  const handlePublicacion = (e) => {
    const { name, value } = e.target;
    setPublicacion({ ...publicacion, [name]: value });
  };

  const publicarPublicacion = () => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    publicacion.idUser = userFromLocalStorage ? userFromLocalStorage.id : null;

    fetch("http://localhost:3001/publicacionpost/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(publicacion),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Publicación enviada al servidor:", data);
        navigate("/prestadorCv");
      })
      .catch((error) => {
        console.error("Error al enviar la publicación:", error);
      });
  };
  const handleRubroSeleccionado = (rubro) => {
    onRubroSeleccionado(rubro);
  };

  return (
    <div className="container mt-5" >
      <div
        className="col-md-5 offset-md-3 max-width-form text-center"
        style={{
          border: "1px solid #616161",
          borderRadius: "10px",
          background: "#D1EFEA",
          margin: "auto",
          padding: "20px",
          backgroundColor: "#CCCCCC", // Agregado para establecer el fondo gris
          boxShadow: "0 0 70px #000",
        }}
      >
        <h2
          style={{
            fontFamily: "fantasy",
            color: "#001F3F",
            marginTop: "5px",
            boxShadow: "initial",
          }}
        >
          Publicación
        </h2>

        <div className="mb-6 mt-3">
          <div className="mb-3">
            <input
              type="text" style={{ border: '1px solid black' }}
              className="form-control"
              placeholder="Nombre"
              value={publicacion.nombre}
              onChange={handlePublicacion}
              name="nombre"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text" style={{ border: '1px solid black' }}
              className="form-control"
              placeholder="Apellido"
              value={publicacion.apellido}
              onChange={handlePublicacion}
              name="apellido"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email" style={{ border: '1px solid black' }}// Tipo de entrada email para la validación automática del formato de correo electrónico
              className="form-control"
              placeholder="Email"
              value={publicacion.email}
              onChange={handlePublicacion}
              name="email"
              required // Campo obligatorio
            />
          </div>
          <div className="mb-3">
            <input
              type="text" style={{ border: '1px solid black' }}
              className="form-control"
              placeholder="Descripción"
              value={publicacion.descripcion}
              onChange={handlePublicacion}
              name="descripcion"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text" style={{ border: '1px solid black' }}
              className="form-control"
              placeholder="Comuna"
              value={publicacion.comuna}
              onChange={handlePublicacion}
              name="comuna"
              required
            />
          </div>
          <div className="mb-3">
          <select
              className="form-select"
              style={{ border: '1px solid black' }}
              value={publicacion.rubro}
              onChange={handlePublicacion}
              name="rubro"
              required
            >
              <option value="">Seleccionar Rubro</option>
              <option value="Aseo">Aseo</option>
              <option value="Carpintería">Carpintería</option>
              <option value="Gasfitería">Gasfitería</option>
              <option value="Pintor">Pintor</option>
              <option value="Electricista">Electricista</option>
              {/* Agregar más opciones de rubro según sea necesario */}
            </select>
          </div>
          <div className="mb-3">
            <input
              type="text" style={{ border: '1px solid black' }}
              className="form-control"
              placeholder="Fecha"
              value={publicacion.fecha}
              onChange={handlePublicacion}
              name="fecha"
              required
            />
          </div>
        </div>

        {/* FALTA AGREGAR EL LINK  DEL BUTTON*/}
             
  
  <button
    type="button"
    className="btn btn-primary mt-5 me-5"
    style={{ width: "40%" , margin: "0 auto" }}
    onClick={publicarPublicacion}
  >
    Publicar
  </button>
 
      
      </div>
    </div>
  );
};

export default GeneradorPublicacion;
