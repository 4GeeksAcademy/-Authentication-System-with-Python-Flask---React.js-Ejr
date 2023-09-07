import React from "react";
import "../../styles/Registros.css";

const IniciarSesion = () => {
  return (
    <div
      className=" RegistroUsuarioDiv container d-flex justify-content-center align-items-center"
      style={{
        height: "24rem",
      }}
    >
      <form>
        <h2 className="tituloRegistro mb-4">Iniciar Sesión</h2>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Correo
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Ingrese su correo"
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
            placeholder="Ingrese su contraseña"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default IniciarSesion;
