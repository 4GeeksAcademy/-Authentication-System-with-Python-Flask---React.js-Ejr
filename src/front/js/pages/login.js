import React from "react";
import Logo from "../../img/logo.png";
import "../../styles/login.css";

const Login = () => {
  return (
    <div className="container w-25 mt-5 ">
      <div className="row">
        <img src={Logo} />
      </div>
      <div className="container shadow-lg p-3 mb-5 bg-white rounded  mt-5">
        <div className="row ">
          <div className="col mt-4">
            <input
              className="input w-100"
              type="text"
              placeholder="Usuario o email"
            />
            <input
              className="input mt-3 w-100"
              type="text"
              placeholder="Contraseña"
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col mt-3">
            <button type="button" className="btn btn-success w-100">
              Entrar
            </button>
            <p className="text-center">¿Olvidaste tu contraseña?</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className="text-center mb-2">
              Si eres empresa y quieres contratar nuestros servicios
            </p>
            <button type="button" className="btn btn-success w-100 mb-4">
              Contactar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
