import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import './elbuscador.css';

export const Buscador = () => {
   return (
      <Container className="buttons-container">
        <h3> Selecciona tu busqueda</h3>
        <br/>
        <Row className="justify-content-center">
          <Col md="auto">
            <Button variant="dark">
              Carpintería
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col md="auto">
            <Button variant="dark">
              Electricista
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col md="auto">
            <Button variant="success">
           Gasfistería
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col md="auto">
            <Button variant="success">
             Pintor
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col md="auto">
            <Button variant="success">
             Aseo
            </Button>
          </Col>
        </Row>
        <br/>
        <br/>
        <button type="submit" className="submit btn btn-secundary">Regresar</button>
      </Container>
   );     
 };
   export default Buscador;