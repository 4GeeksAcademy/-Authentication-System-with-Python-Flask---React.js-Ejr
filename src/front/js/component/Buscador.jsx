import React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import "../../styles/elbuscador.css";

export const Buscador = () => {
  return (
    <div className="container">
      <div className="buttons-container">
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
          <button type="button" className="submitbutton1 btn btn-">
            REGRESAR
          </button>
        </Link>

        <div
          className="card"
          style={{
            maxWidth: "1000px",
            margin: "30px auto 0",
            borderColor: "black",
            borderWidth: "2px",
            borderStyle: "solid",
          }}
        >
          {" "}

          {/*EN ESTA LINEA COLOR DE BACKGROUNd*/}

          {/*EN ESTA LINEA COLOR DE BACKGROUND*/}

          <div
            className="card-body"
            style={{
              borderColor: "grey",
              borderWidth: "2px",
              borderStyle: "solid",
              margin: "8px",
            }}
          >
            <div className="card-body2">
              <p style={{ width: "70%", margin: "10px" }}>
                CONSIGUE NUEVAS OPORTUNIDADES
              </p>
            </div>

            <div
              className="button"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Link to="/Registro">
                <button
                  type="button"
                  className="submitbutton2 btn btn success"
                  style={{ borderRadius: "35px", margin: "15px" }}
                >
                  Conviertete en Prestador
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Buscador;
