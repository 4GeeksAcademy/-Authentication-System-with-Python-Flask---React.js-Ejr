import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import '../../styles/elbuscador.css';


export const Buscador = () => {
   return (
    <div className='container'>
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
        
        <Link to="/">
          <button type="button" className="submit btn btn-success">
            REGRESAR
          </button>
        </Link>
      </Container>
    </div>
   );     
 };
   export default Buscador;