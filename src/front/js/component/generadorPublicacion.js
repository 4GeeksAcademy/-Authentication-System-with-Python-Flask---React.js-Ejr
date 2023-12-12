import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    // Agregar código de inicialización si es necesario
  }, []);

  const handlePublicacion = (e) => {
    const { name, value } = e.target;
    setPublicacion({ ...publicacion, [name]: value });
  };

  const agregarPublicacion = () => {
    if (publicacion.nombre && publicacion.apellido && publicacion.email) {
      const nuevasPublicaciones = [...publicaciones, { ...publicacion }];
      setPublicaciones(nuevasPublicaciones);
      actualizarPublicacionesEnServidor(nuevasPublicaciones);
      // Puedes reiniciar el estado de publicacion aquí si es necesario
      setPublicacion({
        nombre: "",
        apellido: "",
        email: "",
        descripcion: "",
        comuna: "",
        rubro: "",
        fecha: "",
        idUser: "",
      });
    }
  };

  const actualizarPublicacionesEnServidor = (todos) => {
    fetch("http://localhost:3001/user/publicacion/", {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Publicaciones actualizadas en el servidor:", data);
      })
      .catch((error) => {
        console.error("Error al actualizar publicaciones:", error);
      });
  };

  const eliminarPublicacion = (index) => {
    const nuevasPublicaciones = [...publicaciones];
    nuevasPublicaciones.splice(index, 1);
    setPublicaciones(nuevasPublicaciones);
    actualizarPublicacionesEnServidor(nuevasPublicaciones);
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col text-center">
          <h1 className="mb-4">Publicar </h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
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
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="ID Usuario"
              value={publicacion.idUser}
              onChange={handlePublicacion}
              name="idUser"
            />
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          {publicaciones.length > 0 ? (
            <ul className="list-group">
              {publicaciones.map((publicacion, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {publicacion.label}
                  <span
                    className="badge bg-danger rounded-pill cursor-pointer"
                    onClick={() => eliminarTarea(index)}
                  >
                    X
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="alert alert-info">No hay publicaciones</div>
          )}
        </div>
      </div>
      <div className="col mt-3">
        <div className="col">
          <button type="button" className="btn btn-success">
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
  
  
};

export default GeneradorPublicacion;
