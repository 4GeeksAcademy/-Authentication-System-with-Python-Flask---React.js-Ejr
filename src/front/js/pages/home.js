import React, { useContext } from "react";
import { Context } from "../store/appContext";
import easyJobUrl from "../../img/Easy-Job.jpg";
import "../../styles/home.css";
import Carrousel from "../component/carrousel.js";
import { Link } from "react-router-dom";
import ProfesionCard from "../component/ProfesionCard.js";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const handleButtonClick1 = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Botón 1 clickeado");
    // Add logic for the first button click
  };

  const handleButtonClick2 = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Botón 2 clickeado");
    // Add logic for the second button click
  };

  const profesiones = [
    {
      nombre: "Gasfiter",
      calificacion: 4.5,
      comentarios: ["Excelente trabajo!", "Lo recomiendo."],
      imagen:
        "https://img.freepik.com/vector-premium/icono-marco-fotos-foto-vacia-blanco-vector-sobre-fondo-transparente-aislado-eps-10_399089-1290.jpg?w=740",
    },
    {
      nombre: "Electricista",
      calificacion: 4.8,
      comentarios: ["excelente persona.", "Siempre cumple."],
      // Replace with the correct URL
      imagen: "https://example.com/electricista-image.jpg",
    },
    {
      nombre: "Pintor",
      calificacion: 4.8,
      comentarios: ["excelente persona.", "Siempre cumple."],
      // Replace with the correct URL
      imagen: "https://example.com/pintor-image.jpg",
    },
  ];

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="custom-container">
              {/* Existing content in custom-container */}
              <h1
                style={{
                  fontFamily: "fantasy",
                  fontSize: "30px",
                  color: "#001F3F",
                  marginTop: "5%",
                  paddingBottom: "2%",
                  textAlign: "center",
                  transition:
                    "background-color 0.1s ease transform 0.3s ease-in-out",
                }}
              >
                <strong>
                  TU PLATAFORMA TODO EN UNO PARA SERVICIOS DEL HOGAR!
                </strong>
              </h1>
              <p
                style={{
                  color: "#616161",
                  fontStyle: "italic",
                  fontFamily: "fantasy",
                  fontSize: "18px",
                }}
                className="mx-5 text-center"
              >
                Busca de forma sencilla y conecta con Prestadores para encontrar
                una solución a tu medida para tu casa o empresa. Siempre tendrás
                un buen contacto en EasyJob.
              </p>
              <div className="container-fluid">
                <Link
                  to="/Registro"
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "25vh", textDecoration: "none" }}
                >
                  {/* Button styling and logic */}
                  <button
                    style={{
                      display: "flex",
                      color: "#333333",
                      fontWeight: "bold",
                      borderColor: "#fff5ba",
                      background: "#dd9e26",
                      borderRadius: "30px",
                      justifyContent: "center",
                      padding: "15px",
                      width: "250px",
                      textAlign: "center",
                      transition:
                        "background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, width 0.3s ease",
                    }}
                    className="mb-5"
                    onClick={handleButtonClick1}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#dd9e26";
                      e.target.style.color = "#333333";
                      e.target.style.transform = "scale(1.1)";
                      e.target.style.width = "275px";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "#dd9e26";
                      e.target.style.color = "#333333";
                      e.target.style.transform = "scale(1)";
                      e.target.style.width = "250px";
                    }}
                  >
                    <h5 style={{ margin: "auto", fontWeight: "bold" }}>
                      Regístrate aquí
                    </h5>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-right mt-3">
            {/* Image styling */}
            <img
              className="img-fluid"
              style={{
                marginTop: "15px",
                borderRadius: "70px",
                boxShadow: "0 0 70px #000",
                maxWidth: "300px",
                width: "100%",
                textAlign: "center",
                transition:
                  "background-color 0.1s ease transform 0.3s ease-in-out",
                marginRight: "20px",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              src={easyJobUrl}
              alt="Easy Job"
            />
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
            marginTop: "25%",
            paddingBottom: "2%", // Espacio entre el texto y el borde inferior
            textAlign: "center",
            transition: "background-color 0.1s ease transform 0.3s ease-in-out",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.4)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <strong>SOBRE NOSOTROS</strong>
        </h2>

        <div className="container  mt-lg-5">
          <div className="row">
            <div className="col-md-6">
              <div
                className="card mb-4"
                style={{
                  borderRadius: "50px",
                  transition: "transform 0.3s ease-in-out",
                }}
                
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src="https://thumbs.dreamstime.com/b/electricista-30694651.jpg"
                  className="card-img-top"
                  alt="imagen"
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
              <div
                className="card mb-4"
                style={{
                  borderRadius: "50px",
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src="https://thumbs.dreamstime.com/b/electricista-89764045.jpg"
                  className="card-img-top"
                  alt="imagen"
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
            <div className="col-md-6">
              <div
                className="card mb-4"
                style={{
                  borderRadius: "50px",
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src="https://i.pinimg.com/564x/d0/dc/36/d0dc36c015e58259b644b71244a8a0b3.jpg"
                  className="card-img-top"
                  alt="imagen"
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
                    "Easy Jobs es tu aliado para encontrar la solución perfecta
                    que se adapte a tus necesidades. Desde limpieza y
                    mantenimiento hasta reparaciones y renovaciones, nuestros
                    prestadores están listos para ayudarte. Descubre la manera
                    más fácil de encontrar y conectar con profesionales del
                    hogar."
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
