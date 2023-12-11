import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const Nosotros = () => {
  const containerStyle = {
    justifyContent: "center",
    display: "flex",
    textAlign: "center",
    backgroundColor: "rgb(203, 210, 210)",
    borderRadius: "16px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    border: "2px solid black",
    paddingBottom: "20px",
    boxShadow: "0 0 70px #000",
  };

  const paragraphStyle = {
    color: "black",
    fontSize: "1.1em",
    textAlign: "center",
    fontFamily: "fantasy",
    justifyContent: "center",
    marginTop: "8px",
    padding: "5px",
  };

  return (
    <div className="container mt-4" style={containerStyle}>
      <div className="row">
        <div className="col-md-10 ">
          <h1
            style={{
              fontFamily: "fantasy",
              color: "#001F3F",
              textAlign: "center",
              justifyContent: "center",
              margin: "35px", // Azul oscuro
            }}
          >
            NOSOTROS
          </h1>
          <p style={paragraphStyle}>
            Somos una plataforma dedicada a conectar a profesionales de diversos
            oficios como gasfitería, electricidad, pintura y más, con personas y
            empresas que requieren sus servicios. Nuestra misión es facilitar la
            contratación de trabajadores capacitados y confiables para cualquier
            tipo de proyecto o reparación.
          </p>
          <p style={paragraphStyle}>
            En nuestra marketplace, podrás encontrar una amplia variedad de
            profesionales verificados y calificados. Ofrecemos un entorno seguro
            y fácil de usar donde podrás publicar trabajos, recibir
            presupuestos, comparar perfiles y seleccionar al experto que mejor
            se adapte a tus necesidades.
          </p>
          <p style={paragraphStyle}>
            ¡Confía en nosotros para encontrar al profesional adecuado y
            realizar tus proyectos con éxito!
            <br />
            <br />
          </p>
        </div>
      </div>
    </div>
  );
};
