import React from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const CompanyRegisterSuccess = () => {
  return (
    <div className="container my-5">
      <h1>Te has registrado con exito!</h1>
      <p>Muchas gracias por unirte a Investor!.<br />Nuestro equipo se pondra en contacto con ustedes lo mas pronto posible para darte acceso a la plataforma y que puedas
      conectar tus proyectos con miles de inversores que calzen con el perfil de cada proyecto! </p>
      <Link to="/">
        <button>Volver al inicio.</button>
      </Link>
    </div>
  );
};
