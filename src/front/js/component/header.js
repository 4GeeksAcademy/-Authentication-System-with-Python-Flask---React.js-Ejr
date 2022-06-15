import React from "react";
import "../../styles/home.css";

export const Header = () => {
  return (
    <div
      className="p-5 text-center header"
      style={{
        backgroundImage: `url("https://i.ibb.co/7Gn7ZNs/Disen-o-sin-ti-tulo-1.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "500px",
        width: "100%",
      }}
    >
      <h1 className="mb-3 titulo1">Influĕre</h1>
      <h4 className="subtitulo">
        La web donde empresas e influencers se unen para generar contenido de
        calidad.
      </h4>
      <br></br>
      <a className="btn btn-primary" href="" role="button">
        ¡Regístrate!
      </a>
    </div>
  );
};
