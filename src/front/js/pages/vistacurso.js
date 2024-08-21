import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/vistacurso.css";

function vistacurso() {
  return (
      <div className='vistacurso__main-content'>
        <div className="card" style={{width: "40rem"}}>
          <div className="card-body">
            <h5 className="card-title">React.JS, Guía desde 0 (Actualizado 2024)</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">Aprende a crear sitios web de forma rápida y sencilla con React Js</h6>
            <button type="button" class="btn btn-primary me-3 btn-lg">Calificaciones</button>
            <button type="button" class="btn btn-primary btn-lg">Creado por Roberto Losada</button>
          </div>
        </div>
        <div className="card" style={{width: "40rem"}}>
          <div className="card-body">
            <h5 className="card-title">Lo que aprenderás</h5>
            <p className="card-text">Aprenderas a Construir sitios web utilizando la libreria React JS.</p>
            <p>Context API.</p>
            <p>Consumir REST API (Fetch y Axios).</p>
            <p>Pensar en componentes.</p>
            <p>Escribir codigo óptimo de React Js.</p>
            <p>Organización de las carpetas de tu proyecto</p>
          </div>
        </div>
        <div className="card" style={{width: "40rem"}}>
          <div className="card-body">
            <h5 className="card-title">Este curso Incluye:</h5>
            <p className="card-text">14,5 horas de vídeo bajo demanda.</p>
            <p>Acceso en dispositivos móviles y TV</p>
            <p>Acceso de por vida</p>
            <p>35 recursos descargables</p>
            <p>Certificado de finalización</p>
          </div>
        </div>
        <div className="card" style={{width: "40rem"}}>
          <div className="card-body">
            <h5 className="card-title">Contenido del Curso</h5>
            <p className="card-text">Que es React JS?</p>
            <p>Historia de React JS</p>
            <p>Virtual DOM</p>
            <p>Que es JSX?</p>
            <p>Que es la Transpilacion?</p>
            <p>Renderizado por primera vez</p>
            <p>Que son los componentes? Parte 1</p>
            <p>Que son los componentes? Parte 2</p>
            <p>Props</p>
            <p>States</p>
            <p>Declarando metodos en tus componentes</p>
            <p>Eventos</p>
            <p>Analizando setState</p>
            <p>Creando primer proyecto con Create React App</p>
            <p>Analizando la estructura de un proyecto con React JS</p>
            <p>Analizando useState</p>
            <p>Ciclo de vida de un componente</p>
            <p>Renderizado condicional</p>
          </div>
        </div>
      </div>
  );
}

export default vistacurso;