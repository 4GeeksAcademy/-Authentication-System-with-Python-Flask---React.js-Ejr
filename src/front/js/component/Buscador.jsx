import React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../../styles/elbuscador.css";

export const Buscador = () => {
  return (
    <div className="container">
      <Container className="buttons-container">
        <h1> SELECCIONA TU BUSQUEDA </h1>
        <br />
        <Row className="justify-content-center">
          <Col md="auto">
            <Button variant="dark">
              <h2>Carpintería</h2>
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col md="auto">
            <Button variant="dark">
              <h2>Electricista</h2>
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col md="auto">
            <Button variant="dark">
              <h2>Gasfistería</h2>
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col md="auto">
            <Button variant="dark">
              <h2>Pintor</h2>
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col md="auto">
            <Button variant="dark">
              <h2>Aseo</h2>
            </Button>
          </Col>
        </Row>
        <br />
        <br />

        <Link to="/">
          <button type="button" className="submit btn btn-success">
            REGRESAR
          </button>
        </Link>

        <div
          style={{ backgroundColor: "aliceblue", padding: "30px" }}
          class="card"
        >
          {" "}
          {/*EN ESTA LINEA COLOR DE BACKGROUND*/}
          <div className="card-body" style={{ padding: "10px 30px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "120px",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <p style={{ width: "40%", margin: "0" }}>
                CONSIGUE NUEVAS OPORTUNIDADE
              </p>

              <div
                style={{
                  width: "30%",
                  height: "70%",
                  padding: "10px",
                  background: "#88888E33",
                  borderRadius: "6px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "96px",
                    background: "#88888E33",
                  }}
                >
                  {" "}
                  IMAGEN
                </div>
              </div>
            </div>

            <div
              className="button"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Link to="/Formulario">
                <button type="button" className="submitbutton btn btn">
                  Conviertete en Prestador
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Buscador;
