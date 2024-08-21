import React, { useState } from "react";
import "../../styles/cardAyuda.css";
import { AiFillShop } from "react-icons/ai";
import { BsPersonBoundingBox } from "react-icons/bs";
import { IoMdEye } from "react-icons/io";

const CardAyuda = ({ text, setIsDevelop }) => {
  const [isShown, setIsShown] = useState(false);

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
      <div
      
        className="d-flex justify-content-center m-2 align-items-center"
      >
        {isShown && <button className="icon-eye"><IoMdEye size={40} /></button>}

        <p className="px-4 fs-5">Ver las preguntas más frecuentes</p>
        
      </div>
    </div>
  );
};

export default CardAyuda;
