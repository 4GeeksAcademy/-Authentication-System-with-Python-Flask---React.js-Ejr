import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import '../../styles/elbuscador.css';

export const Buscador = () => {
   return (
      <Container className="buttons-container">
        <h1> SELECCIONA TU BUSQUEDA </h1>
        <br/>
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
        <br/>
        <br/>
        
        <button type="submit" className="submit btn btn-success">VOLVER ATRAS</button>
      </Container>
   );     
 };
   export default Buscador;