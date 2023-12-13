import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GeneradorPublicacion = () => {
  const [publicaciones, setPublicaciones] = useState([]);
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
    publicacion.idUser = JSON.parse(localStorage.getItem("user")).id;
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

  return (
    <div className="container mt-5">
      <div
        className="col-md-5 offset-md-3 max-width-form text-center"
        style={{
          border: "1px solid #616161",
          borderRadius: "10px",
          background: "#D1EFEA",
          margin: "auto",
          padding: "20px",
          backgroundColor: "#CCCCCC",
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
          Publicar
        </h2>

        <div className="mb-6 mt-3">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              value={publicacion.nombre}
              onChange={handlePublicacion}
              name="nombre"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Apellido"
              value={publicacion.apellido}
              onChange={handlePublicacion}
              name="apellido"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={publicacion.email}
              onChange={handlePublicacion}
              name="email"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Descripción"
              value={publicacion.descripcion}
              onChange={handlePublicacion}
              name="descripcion"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Comuna"
              value={publicacion.comuna}
              onChange={handlePublicacion}
              name="comuna"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Rubro"
              value={publicacion.rubro}
              onChange={handlePublicacion}
              name="rubro"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Fecha"
              value={publicacion.fecha}
              onChange={handlePublicacion}
              name="fecha"
            />
          </div>
        </div>
       
        <button
          type="button"
          className="btn btn-primary mt-5 me-5"
          style={{ width: "40%" }}
          onClick={() => navigate("/prestadorCv")}
          
        >
          Publicar
        </button>
      
      </div>
    </div>
  );
};

export default GeneradorPublicacion;
