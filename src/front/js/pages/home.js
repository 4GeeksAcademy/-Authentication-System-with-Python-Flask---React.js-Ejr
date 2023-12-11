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
      imagen:
        "https://img.freepik.com/vector-premium/icono-marco-fotos-foto-vacia-blanco-vector-sobre-fondo-transparente-aislado-eps-10_399089-1290.jpg?w=740", // Reemplaza con la URL correcta
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
        <div
          className="custom-container"
          style={{ marginLeft: "50px", width: "160%" }}
        >
          <h1
            style={{
              marginTop: "13%",
              fontFamily: "fantasy",
              color: "#001F3F", // Azul oscuro
              textAlign: "center", // Para centrar el texto
              borderBottom: "2px solid #001F3F", // Borde inferior de 2 píxeles sólidos en azul oscuro
              paddingBottom: "5px",
              fontSize: "24px", // Ajusta el tamaño de la fuente según tus preferencias
            }}
          >
            <strong>
              BIENVENIDO A EASY JOBS, TU PLATAFORMA TODO EN UNO PARA SERVICIOS
              DEL HOGAR!
            </strong>
          </h1>
          <p
            style={{
              color: "#616161", // Gris oscuro
              fontStyle: "italic", // Texto en cursiva
              fontFamily: "fantasy", // Letra fantasy
            }}
            className="mx-5 text-center"
          >
            Descubre la manera más fácil de encontrar y conectar con
            profesionales en servicios del hogar. En Easy Jobs, simplificamos la
            búsqueda y conexión con prestadores para ofrecerte soluciones
            personalizadas tanto para tu hogar como para tu empresa. Siempre
            tendrás a tu disposición contactos confiables y eficientes en Easy
            Jobs.
          </p>

          <p
            style={{
              color: "#616161", // Gris oscuro
              fontStyle: "italic", // Texto en cursiva
              fontFamily: "fantasy", // Letra fantasy
            }}
            className="mx-5 text-center"
          >
            <strong>
              ¿Buscas servicios del hogar? ¿Necesitas ayuda con tareas
              específicas?{" "}
            </strong>
            ¡No busques más! Easy Jobs es tu aliado para encontrar la solución
            perfecta que se adapte a tus necesidades. Desde limpieza y
            mantenimiento hasta reparaciones y renovaciones, nuestros
            prestadores están listos para ayudarte.{" "}
          </p>
          <p
            style={{
              color: "#616161", // Gris oscuro
              fontStyle: "italic", // Texto en cursiva
              fontFamily: "fantasy", // Letra fantasy
            }}
            className="mx-5 text-center"
          >
            <strong>¿Ofreces servicios del hogar? </strong>Únete a nuestra
            comunidad de prestadores de servicios en Easy Jobs y conecta con
            clientes que buscan exactamente lo que ofreces. Construye tu
            reputación y haz crecer tu negocio de forma sencilla y efectiva. En
            Easy Jobs, nos comprometemos a hacer que la búsqueda y conexión de
            servicios del hogar sean tan fáciles como deberían ser. ¡Encuentra,
            conecta y disfruta de la tranquilidad de saber que siempre tendrás
            un buen contacto en Easy Jobs!
          </p>

          <div
            className="container-fluid"
            style={{
              backgroundImage: "img src={easyJobUrl}",
            }}
          >
            <Link
              to="/Registro"
              className="d-flex justify-content-center align-items-center"
              style={{ height: "25vh", textDecoration: "none" }} // Quital el subrayado
            >
              <button
                style={{
                  display: "flex",
                  color: "#000000",
                  fontWeight: "bold",
                  borderColor: "#fff5ba",
                  background: "#dd9e26",
                  borderRadius: "30px",
                  justifyItems: "center",
                  padding: "15px",
                  width: "250px", // Ajusta el ancho según tus necesidades
                  textAlign: "center", // Centrar el texto dentro del botón
                  transition: "background-color 0.3s ease, color 0.3s ease",
                }}
                className="mb-5"
                onClick={handleButtonClick1}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#ffc966"; // Cambio de color al pasar el ratón a un tono máss claro
                  e.target.style.color = "#333333"; // Cambio de color de texto al pasar el ratón a un tono más oscuro
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#dd9e26"; // Vuelve al color original al salir el ratón
                  e.target.style.color = "#000000"; // Vuelve al color original de las letras al salir el ratón
                }}
              >
                <h5 style={{ margin: "auto", fontWeight: "bold" }}>
                  Regístrate aquí
                </h5>
              </button>
            </Link>
          </div>
        </div>
        <div className="container mt-0 p-0">
          <div className="row">
            <div
              className="col-lg-12 text-center"
              style={{ marginLeft: "55px" }}
            >
              <img
                className="img-fluid"
                style={{
                  borderRadius: "70px",
                  boxShadow: "0 0 70px #000",
                  maxWidth: "400px",
                  width: "100%",
                }}
                src={easyJobUrl}
                alt="Easy Job"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <Carrousel />
      </div>

      <div className="container2">
        <h2
          style={{
            fontFamily: "fantasy",
            color: "#001F3F", // Azul oscuro
            borderBottom: "2px solid #001F3F", // Línea de subrayado
            marginTop: "18%",
            paddingBottom: "2%", // Espacio entre el texto y el borde inferior
            textAlign: "center",
          }}
        >
          <strong>NOSOTROS</strong>{" "}
        </h2>

        <div className="container mt-4">
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-4" style={{ borderRadius: "50px" }}>
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
                    "Somos una plataforma dedicada a conectar a profesionales de
                    diversos oficios como gasfitería, electricidad, pintura y
                    más, con personas y empresas que requieren sus servicios.
                    Nuestra misión es facilitar la contratación de trabajadores
                    capacitados y confiables para cualquier tipo de proyecto o
                    reparación."
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
                    "En nuestra marketplace, podrás encontrar una amplia
                    variedad de profesionales verificados y calificados.
                    Ofrecemos un entorno seguro y fácil de usar donde podrás
                    publicar trabajos, recibir presupuestos, comparar perfiles y
                    seleccionar al experto que mejor se adapte a tus
                    necesidades."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* anexa las tarjetas de profesiones */}
      </div>
    </>
  );
};
