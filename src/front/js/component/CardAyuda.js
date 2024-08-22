import React from "react";
import "../../styles/cardAyuda.css";
import { AiFillShop } from "react-icons/ai";
import { BsPersonBoundingBox } from "react-icons/bs";
import 'animate.css';

const CardAyuda = ({ text,validationisDev}) => {
  
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
        
        <button onClick={()=>validationisDev(text)} className=" btn btn-outline-secondary px-4 fs-5 animate__animated animate__heartBeat fw-bolder colorGeneral">Ver las preguntas más frecuentes</button>
        
      </div>
    </div>
  );
};

export default CardAyuda;
