import React from "react";
import "../../styles/preguntasFrecuentes.css";
import CardAyuda from "../component/CardAyuda";
import AcordeonPreguntas from "../component/AcordeonPreguntas";

const preguntasFrecuentes = () => {
  return (
    <>
    <div className="container">
      <div>
        <div className="header-preguntas">
          <h1 className="text-center py-3 fw-bolder fuente">
            ¿Cómo podemos ayudarte?
          </h1>
          <div className="row justify-content-center ">
            <CardAyuda text="empleador" />
            <CardAyuda text="programador" />
          </div>
        </div>
        <div>
          <AcordeonPreguntas />
        </div>
        
      </div>
    </div>
   
        <div className="row banner-preguntas text-center align-items-center">
          <div className="col-6">
            <h1>Registrate en floppy</h1>
            <p>Encuentra lo que estás buscando</p>
            <button className="btn btn-success">Registrarse</button>
          </div>
          <div className="col-6">
            <div className="col border border-white">
              <h4>Es hora de encontrar empleo </h4>
              <p>Miles de empresas te están buscando!!!</p>
            </div>
            <div className="col">
              <h4>Es hora de encontrar programadores </h4>
              <p>Miles de programadores están esperando ser contratados</p>
            </div>
          </div>
        </div>
        <div className="row">
            <div>El mejor servicio de Floopy</div>
            <div>Imagenes e iconos</div>
        </div>
  
    </>
  );
};

export default preguntasFrecuentes;
