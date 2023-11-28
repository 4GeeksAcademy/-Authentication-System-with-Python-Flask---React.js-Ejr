import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export class Formulario extends Component {
 render() {
    return (
      <Container>
        <Row>
          <Col>
            <Form>
              <h2>Bienvenido, Por favor rellene los campos, para realizar su busqueda</h2>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Ingrese su nombre" />
              </Form.Group>

              <Form.Group controlId="formApellido">
                <Form.Label>Apellido</Form.Label>
                <Form.Control type="text" placeholder="Ingrese su apellido" />
              </Form.Group>

              <Form.Group controlId="formRut">
                <Form.Label>Rut</Form.Label>
                <Form.Control type="text" placeholder="Ingrese su rut" />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Correo electronico</Form.Label>
                <Form.Control type="email" placeholder="Ingrese su correo electronico" />
              </Form.Group>

              <Form.Group controlId="formTelefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type="text" placeholder="Ingrese su telefono" />
              </Form.Group>

              <Form.Group controlId="formFechaNacimiento">
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control type="date" />
              </Form.Group>

              <Form.Group controlId="formComuna">
                <Form.Label>Comuna</Form.Label>
                <Form.Control as="select">
                 <option>La Florida</option>
                 <option>La Reina</option>
                 <option>Providencia</option>
                 <option>Santiago Centro</option>
                 <option>Independencia</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formRubro">
                <Form.Label>Rubro</Form.Label>
                <Form.Control as="select">
                 <option>Carpinteria</option>
                 <option>Electricista</option>
                 <option>Gasfitería</option>
                 <option>Pintor</option>
                 <option>Aseo</option>
                </Form.Control>
              </Form.Group>



              <Form.Group controlId="formTerminosCondiciones">
                <h4>Terms and Conditions:</h4>
                <input type="text">
                  
                  
                  
                  
                </input>
                
              <Form.Check type="checkbox" label="Acepto los términos y condiciones" />
              <br/>
              <Button variant="primary" type="submit">
              Aceptar
              </Button>   <Button variant="secondary" type="reset">
                Cancelar
              </Button>
              </Form.Group>
              <br/>
             
              <Button variant="primary" type="submit">
                Regresar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
 }

}

export default Formulario;



