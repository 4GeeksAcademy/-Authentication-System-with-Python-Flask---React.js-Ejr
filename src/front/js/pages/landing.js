import React, { useContext, useState } from "react";
import "../../styles/landing.css";

import { Context } from "../store/appContext";

let titles = [
  "Hazlo por el y por ti",
  "Lavamos su pelo por ti",
  "Tu amigo incondicional",
  "Love and pets",
  "El amor es eterno",
];
let descriptions = [
  "Discovering beauty in every step",
  "Grooming keeps pets looking great",
  "Regular exercise ensures happy pets",
  "Love and play daily together",
];

export const Landing = () => {
  const { store, actions } = useContext(Context);
  const [background, setBackground] = useState("background");
  const [title, setTitle] = useState("title");
  const [description, setDescription] = useState("description");

  const handleButtonClick = (index) => {
    setBackground(`background${index}`);
    setTitle(`title${index}`);
    setDescription(`description${index}`);
  };

  return (
    <div className={background} id="landing">
      <div className="landing-content">
        <div className="text-container">
          <h1 className={title} id="landing-title">
            Siempre sera un cuidado mutuo, somos un todo
            {titles[parseInt(title.charAt(title.length - 1))]}
          </h1>
          <h4 className={description} id="landing-description">
            Love pray and eat
            {descriptions[parseInt(description.charAt(description.length - 1))]}
          </h4>
        </div>
        <div className="buttons-container">
          <button
            className="btn-carrusel"
            onClick={() => handleButtonClick(1)}></button>
          <button
            className="btn-carrusel"
            onClick={() => handleButtonClick(2)}></button>
          <button
            className="btn-carrusel"
            onClick={() => handleButtonClick(3)}></button>
        </div>
      </div>
    </div>
  );
};
