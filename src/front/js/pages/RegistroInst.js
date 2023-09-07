import React from "react";
import "../../styles/Registros.css";

const RegistroInst = () => {
  return (
    <div
      className=" RegistroUsuarioDiv container d-flex justify-content-center align-items-center"
      style={{
        height: "30rem",
      }}
    >
      <form>
        <h2 className="tituloRegistro mb-4">Registrar Institución</h2>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Nombre
          </label>
          <input
            type="name"
            class="form-control"
            id="exampleInputEmail1"
            placeholder="Nombre de la Institución"
          />
        </div>

        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Correo Institucional
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Ingrese correo Institucional"
          />
        </div>

        <div class="mb-4">
          <label for="exampleInputPassword1" class="form-label">
            Contraseña
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Ingrese una contraseña"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegistroInst;
