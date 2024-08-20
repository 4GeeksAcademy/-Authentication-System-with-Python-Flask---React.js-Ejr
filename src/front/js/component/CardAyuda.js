import React, { useState } from "react";
import "../../styles/cardAyuda.css";
import { AiFillShop } from "react-icons/ai";
import { BsPersonBoundingBox } from "react-icons/bs";

const CardAyuda = ({ text }) => {
  return (
    <div className="col-4 bg-white colorGeneral w-40 mx-2 rounded">
      <div>
        <div className="d-flex justify-content-center m-2 align-items-center">
          {text == "EMPLEADOR" ? (
            <AiFillShop size={40} />
          ) : (
            <BsPersonBoundingBox size={40} />
          )}
          <h3 className="mx-4">{text}</h3>
        </div>
      </div>
      <hr />
      <p className="text-center">Pulsa <button>Aquí</button> para ver las preguntas más frecuentes</p>
    </div>
  );
};

export default CardAyuda;
