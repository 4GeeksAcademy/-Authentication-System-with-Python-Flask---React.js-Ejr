import React from "react";
import "../../styles/home.css";
import { CardsInflu } from "./cardsInfluencers";

export const Carruselinfluencers = () => {
  return (
    <div class="container">
      <h2 className="text-center pb-2 border-bottom">
        {" "}
        <a
          className="hover"
          href="https://3000-jaygosling-influere-ai7nxhchf88.ws-eu47.gitpod.io/Directorio"
        >
          <b>Directorio de Influencers</b>
        </a>
      </h2>
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
      </div>
    </div>
  );
};
