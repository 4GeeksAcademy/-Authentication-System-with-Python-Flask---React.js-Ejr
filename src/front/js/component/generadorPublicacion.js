import React, { useState, useEffect } from "react";

const generadorPublicacion = () => {
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
    fetch("http://localhost:3001/user/1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .then((data) => {
        console.log(data);
        setPublicaciones(data);
      })
      .catch((error) => {
        fetch("http://localhost:3001/user/publicacion/1", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([]),
        })
          .then((resp) => {
            if (!resp.ok) {
              throw new Error("Failed to create array");
            }
            return resp.json();
          })
          .then((data) => {
            console.log("Array created successfully", data);
          })
          .catch((err) => console.error("Error:", err));
      });
  }, []);
  const handlePublicacion = (e) => {
    e.preventDefault();
  const { name, value } = e.target;
  setPublicacion({ ...publicacion, [name]: value });
  };
  const crearPublicacion = () => {
    fetch("http://localhost:3001/user/publicacion/", {
  const agregarPublicacion = (e) => {
    if (e.key === "Enter" && e.target.value) {
      const nuevasPublicaciones = [
        ...publicaciones,
        { label: e.target.value, done: false },
      ];
      setPublicaciones(nuevasPublicaciones);
      actualizarPublicacionesEnServidor(nuevasPublicaciones);
      e.target.value = "";
    }
  };

  const actualizarPublicacionesEnServidor = (todos) => {
    fetch("http://localhost:3001/publicacion/", {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch((error) => {
        //manejo de errores
        console.log(error);
      });
  };

  const eliminarPublicacion = (index) => {
    const nuevasPublicaciones = [...publicaciones];
    nuevasPublicaciones.splice(index, 1);
    setPublicaciones(nuevasPublicaciones);
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

export default generadorPublicacion;
