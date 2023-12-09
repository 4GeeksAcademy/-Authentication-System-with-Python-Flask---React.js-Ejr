import React, { useContext } from "react";
import { Context } from "../store/appContext";
import easyJobUrl from "../../img/Easy-Job.jpg";
import "../../styles/home.css";
import { Carrousel } from "../component/carrousel.js";
import { Link } from "react-router-dom";

import { ProfesionCard } from "../component/ProfesionCard.js";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const handleButtonClick1 = () => {
    // Lógica para el primer botón
    console.log("Botón 1 clickeado");
  };

  const handleButtonClick2 = () => {
    // Lógica para el segundo botón
    console.log("Botón 2 clickeado");
  };
  const profesiones = [
    {
      nombre: "Gasfiter",
      calificacion: 4.5,
      comentarios: ["Excelente trabajo!", "Lo recomiendo."],
    },
    {
      nombre: "Electricista",
      calificacion: 4.8,
      comentarios: ["excelente persona.", "Siempre cumple."],
    },
    {
      nombre: "Electricista",
      calificacion: 4.8,
      comentarios: ["excelente persona.", "Siempre cumple."],
    },
  ];

  return (
    <>
      <div className="container">
        <div className="text-container d-flex flex-column">
        <h1 style={{ fontFamily:"fantasy", 
      color: '#001F3F',  // Azul oscuro
    // Borde inferior // Hace que el borde inferior se ajuste al contenido
  paddingBottom: '5px',  // Espacio entre el texto y el borde inferior
}}>
  <strong>EASY JOBS</strong>
</h1>
          <p  style={{color: "#616161" }}className="mb-5">
            Busca de forma sencilla y conecta con Prestadores para encontrar una
            solución a tu medida, siempre tendrás un buen contacto en EasyJob.
          </p>

          <div className="button-container my-5">
            <Link to="/RegistroCliente">
              <button onClick={handleButtonClick1}>
                Registrate acá como cliente
              </button>
            </Link>
            <Link to="/RegistroPrestador">
              <button className="blue" onClick={handleButtonClick2}>
                Conviérte en Prestador
              </button>
            </Link>
          </div>
        </div>
        <div className="image-container">
          <img src={easyJobUrl} />
        </div>
      </div>
      <div className="container">
        <Carrousel />
      </div>

      <div className="container2">
        <h1>Nosotros</h1>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <img
                src="https://thumbs.dreamstime.com/b/electricista-30694651.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  {" "}
                  Somos una plataforma dedicada a conectar a profesionales de
                  diversos oficios como gasfitería, electricidad, pintura y más,
                  con personas y empresas que requieren sus servicios. Nuestra
                  misión es facilitar la contratación de trabajadores
                  capacitados y confiables para cualquier tipo de proyecto o
                  reparación..
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-4">
              <img
                src="https://thumbs.dreamstime.com/b/electricista-89764045.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <p className="card-text">
                  {" "}
                  nuestra marketplace, podrás encontrar una amplia variedad de
                  profesionales verificados y calificados. Ofrecemos un entorno
                  seguro y fácil de usar donde podrás publicar trabajos, recibir
                  presupuestos, comparar perfiles y seleccionar al experto que
                  mejor se adapte a tus necesidades..
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* anexa las tarjetas de profesiones */}
        <div className="row">
          {profesiones.map((profesion, index) => (
            <div className="col-md-4" key={index}>
              <ProfesionCard
                nombre={profesion.nombre}
                calificacion={profesion.calificacion}
                comentarios={profesion.comentarios}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
