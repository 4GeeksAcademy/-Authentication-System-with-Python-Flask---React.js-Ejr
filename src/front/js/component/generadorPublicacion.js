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
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="nombre"
              value={publicacion.nombre}
              onChange={handlePublicacion}
              name="nombre"
            />
            <input
              type="text"
              className="form-control"
              placeholder="Apellido"
              value={publicacion.apellido}
              onChange={handlePublicacion}
              name="apellido"
            />
            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={publicacion.email}
              onChange={handlePublicacion}
              name="email"
            />
            <input
              type="text"
              className="form-control"
              placeholder="Descripcion"
              value={publicacion.descripcion}
              onChange={handlePublicacion}
              name="descripcion"
            />
            <input
              type="text"
              className="form-control"
              placeholder="comuna"
              value={publicacion.comuna}
              onChange={handlePublicacion}
              name="comuna"
            />
            <input
              type="text"
              className="form-control"
              placeholder="rubro"
              value={publicacion.rubro}
              onChange={handlePublicacion}
              name="rubro"
            />
            <input
              type="text"
              className="form-control"
              placeholder="fecha"
              value={publicacion.fecha}
              onChange={handlePublicacion}
              name="fecha"
            />
            <input
              type="text"
              className="form-control"
              placeholder="idUsuario"
              value={publicacion.idUser}
              onChange={handlePublicacion}
              name="idUser"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {publicaciones.length > 0 ? (
            <ul className="list-group">
              {tareas.map((publicacion, index) => (
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
            <p className="mt-3 text-center">No hay publicaciones</p>
          )}

          <button type="button" onClick={crearPublicacion}>
            <h4>Publicar</h4>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneradorPublicacion;
