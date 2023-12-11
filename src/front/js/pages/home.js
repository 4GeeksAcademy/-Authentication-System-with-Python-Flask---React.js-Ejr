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
      imagen: "https://img.freepik.com/vector-premium/icono-marco-fotos-foto-vacia-blanco-vector-sobre-fondo-transparente-aislado-eps-10_399089-1290.jpg?w=740", // Reemplaza con la URL correcta
    },
    {
      nombre: "Electricista",
      calificacion: 4.8,
      comentarios: ["excelente persona.", "Siempre cumple."],
      //imagen: "https://img.freepik.com/vector-premium/icono-marco-fotos-foto-vacia-blanco-vector-sobre-fondo-transparente-aislado-eps-10_399089-1290.jpg?w=740", // Reemplaza con la URL correcta
    },
    {
      nombre: "Electricista",
      calificacion: 4.8,
      comentarios: ["excelente persona.", "Siempre cumple."],
      //imagen: "https://img.freepik.com/vector-premium/icono-marco-fotos-foto-vacia-blanco-vector-sobre-fondo-transparente-aislado-eps-10_399089-1290.jpg?w=740", // Reemplaza con la URL correcta
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
            solución a tu medida para tu casa o empresa. Siempre tendrás un buen
            contacto en EasyJob.
          </p>

          <div
            className="button-container my-5"
            style={{
              backgroundImage: "img src={easyJobUrl}",
            }}
          >
            <Link to="/OtroFormulario">
              <button
                style={{
                  color: "#000000",
                  fontWeight: "bold",
                  borderColor: "#fff5ba",
                  background: "#dd9e26",
                  borderRadius: "30px",
                  margin: "5px",
                  padding: "13px",
                  transition: "background-color 0.3s ease, color 0.3s ease", // Transición suave para color de fondo y texto
                }}
                className="mb-5"
                onClick={handleButtonClick1}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#ffc966"; // Cambio de color al pasar el ratón a un tono más claro
                  e.target.style.color = "#333333"; // Cambio de color de texto al pasar el ratón a un tono más oscuro
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#dd9e26"; // Vuelve al color original al salir el ratón
                  e.target.style.color = "#000000"; // Vuelve al color original de las letras al salir el ratón
                }}
              >
                Regístrate aquí como cliente
              </button>
            </Link>

            <Link to="/Formulario">
              <button
                style={{
                  color: "#ffffff",
                  fontWeight: "bold",
                  borderColor: "#006b47",
                  background: "#006b47",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                  borderRadius: "30px",
                  margin: "5px",
                  padding: "13px",
                }}
                className="blue"
                onClick={handleButtonClick2}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#3bd7ba"; // Cambio de color al pasar el ratón
                  e.target.style.color = "#000000"; // Letras negras al pasar el ratón
                  e.target.style.borderColor = "transparent"; // Quita el borde al pasar el ratón
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#006b47"; // Vuelve al color original al salir el ratón
                  e.target.style.color = "#ffffff"; // Vuelve al color original de las letras al salir el ratón
                  e.target.style.borderColor = "#006b47"; // Vuelve al color original del borde al salir el ratón
                }}
              >
                Conviértete en Prestador
              </button>
            </Link>
          </div>
        </div>
        <div className="image-container">
          <img style={{ margin: "0 auto" }} src={easyJobUrl} />
        </div>
      </div>
      <div className="container">
        <Carrousel />
      </div>

      <div className="container2" >
        <h1
          style={{
            fontFamily: "fantasy",
            color: "#001F3F", // Azul oscuro
            // Borde inferior // Hace que el borde inferior se ajuste al contenido
            marginTop: "20%",
            marginBottom: "5%",
            // Espacio entre el texto y el borde inferior
          }}
        >
          <strong>Nosotros</strong>{" "}
        </h1>
        <div className="row">
         
          <div className="col-md-6">
            <div className="card mb-4 " style={{ borderRadius: "50px", marginRight:"50"}}>
            <img
                src="https://thumbs.dreamstime.com/b/electricista-30694651.jpg"
                className="card-img-top"
                alt="..."
              />

              <div className="card-body">
                <p
                  className="card-text mt-5px"
                  style={{
                    textAlign: "justify",
                    fontStyle: "italic",
                    color: "rgba(0, 0, 0, 0.8)",
                  }}
                >
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
            <div className="card mb-4" style={{ borderRadius: "50px" }}>
              <img
                src="https://thumbs.dreamstime.com/b/electricista-89764045.jpg"
                className="card-img-top"
                alt="..."
              />

              <div className="card-body">
                <p
                  className="card-text mt-5px"
                  style={{
                    textAlign: "justify",
                    fontStyle: "italic",
                    color: "rgba(0, 0, 0, 0.8)",
                  }}
                >
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
                style={{ margin: "0", padding: "0" }}
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
