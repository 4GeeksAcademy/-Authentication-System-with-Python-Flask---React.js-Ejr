import React from "react";
import "../../styles/home.css";
import { CardsInflu } from "./cardsInfluencers";

export const Carruselinfluencers = () => {
  return (
    <div class="container">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h4 className="antetitulo4">¿READY PARA DAR EL SALTO?</h4>
      <h1
        className="text-center pb-2 tituloabout"
        href="https://3000-jaygosling-influere-ai7nxhchf88.ws-eu47.gitpod.io/Directorio"
      >
        DIRECTORIO DE INFLUENCERS
      </h1>

      <div className="container">
        <div className="row my-5">
          <div className="col-3">
            <CardsInflu />
          </div>
          <div className="col-3">
            <CardsInflu />
          </div>
          <div className="col-3">
            <CardsInflu />
          </div>
          <div className="col-3">
            <CardsInflu />
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  );
};
