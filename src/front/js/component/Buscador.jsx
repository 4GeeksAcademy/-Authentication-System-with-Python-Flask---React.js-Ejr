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

        {/* <div className="row row-cols-1 row-cols-md-12 g-4">
          <div className="col">
            <div className="card">
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <p classNAme="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content.
                </p>
              </div>
            </div>
          </div>
        </div> */}

        <div class="card">
        
        <div className="card-body">
          <p classNAme="card-text">
            This is a longer card with supporting text below as a natural
            lead-in to additional content.
            </p>
            </div>
            </div>
        
       
      </Container>
    </div>
  );
};
export default Buscador;
