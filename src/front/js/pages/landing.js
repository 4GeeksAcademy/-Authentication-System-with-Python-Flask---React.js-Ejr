import React, { useContext, useState } from "react";
import "../../styles/landing.css";

import { Context } from "../store/appContext";

export const Landing = () => {
  const { store, actions } = useContext(Context);
  const [background, setBackground] = useState("background0");
  // const [text, setText] = useState("text0"); hacer lo mismo con el texto y poner un efecto al cambiar de imagen

  return (
    <div className={background} id="landing">
      <div className="landing-content">
        <div className="text-container">
          <h1 className="landing-title">
            Expert dog <br /> walking service
          </h1>
          <h4 className="landing-description">
            Exploring with a dog <br />
            Discovering beauty in every step.
          </h4>
        </div>
        <div className="buttons-container">
          <button
            className="btn-carrusel"
            onClick={() => setBackground("background1")}></button>
          <button
            className="btn-carrusel"
            onClick={() => setBackground("background2")}></button>
          <button
            className="btn-carrusel"
            onClick={() => setBackground("background3")}></button>
        </div>
      </div>
    </div>
  );
};
