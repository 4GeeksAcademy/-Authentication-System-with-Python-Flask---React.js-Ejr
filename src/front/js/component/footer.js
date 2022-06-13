import React, { Component } from "react";

export const Footer = () => {
  return (
    <div className="footer">
      <img
        src="https://i.ibb.co/R4yPmxW/Disen-o-sin-ti-tulo.png"
        className="img-fluid shadow-4"
        alt="..."
      />

      <br></br>

      <ul className="list-unstyled">
        <li>
          <a href="#!">Política de privacidad</a>
        </li>
        <li>
          <a href="#!">Aviso legal</a>
        </li>
        <li>
          <a href="#!">Política de cookies</a>
        </li>
      </ul>
      <p>© Influĕre 2022 Todos los derechos reservados</p>
      <br></br>
    </div>
  );
};
