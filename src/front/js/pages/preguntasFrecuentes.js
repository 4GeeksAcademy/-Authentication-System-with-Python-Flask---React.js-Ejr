import React, { useState } from "react";
import "../../styles/preguntasFrecuentes.css";
import CardAyuda from "../component/CardAyuda";
import AcordeonPreguntas from "../component/AcordeonPreguntas";
import 'animate.css';
import { RiCodeBoxLine } from "react-icons/ri";
import { MdWork } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";

const preguntasFrecuentes = () => {
  const [isDevelop, setIsDevelop] =useState(false)
  return (
    <>
    <div className="container">
      <div>
        <div className="header-preguntas colorFondoGeneral">
          <h1 className="text-center py-3 fw-bolder fuente animate__animated animate__bounceInLeft ">
            ¿Cómo podemos ayudarte?
          </h1>
          <div className="row justify-content-center ">
            <CardAyuda text="EMPLEADOR" setIsDevelop={setIsDevelop}/>
            <CardAyuda text="PROGRAMADOR" />
          </div>
        </div>
        <div>
          <AcordeonPreguntas />
        </div>
        
      </div>
    </div>
   
        <div className="row banner-preguntas colorFondoGeneral text-center align-items-center">
          <div className="col-7 borde">
            <h1>Registrate en floppy</h1>
            <p>Encuentra lo que estás buscando</p>
            <button className="btn btn-light colorGeneral fs-5">Registrarse</button>
            
          </div>
          <div className="col-5">
            <div className="col">
              <h4 >Es hora de encontrar empleo </h4>
              <p className="mt-0">Miles de empresas te están buscando!!!</p>
            </div>
            <div className="col">
              <h4>Es hora de encontrar programadores </h4>
              <p className="mt-0">Miles de programadores están esperando ser contratados</p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center my-5 align-items-center">
            <div className="col-4 text-center rounded text-style colorFondoGeneral text-white py-3 mx-5 ">
              <h3 >El mejor servicio en Floppy</h3>
            </div>
            <div className="col-4 icons-style colorGeneral mx-5">
            <RiCodeBoxLine />
            <MdWork />
            <BsPersonWorkspace />
            <GrMoney /> 
            </div>
        </div>
  
    </>
  );
};

export default preguntasFrecuentes;
