import React from "react";
import "../../styles/home.css";

export const Headerdirectorio = () => {
  return (
    <div
      className="p-5 text-center header"
      style={{
        backgroundImage: `url("https://i.ibb.co/rH7nbxX/franja.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "550px",
        width: "100%",
      }}
    >
      <h4 className="antetitulo3">DIRECTORIO DE INFLUENCERS</h4>
      <br></br>
      <h1 className="mb-3 tituloabout2">
        BUSCA AL INFLUENCER QUE <br></br>MEJOR ENCAJE CON TU EMPRESA
      </h1>
      <img
        src="https://i.ibb.co/R6BqRv5/Disen-o-sin-ti-tulo-1.png"
        style={{
          height: "140px",
          width: "140px",
        }}
      />
    </div>
  );
};
