import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../../styles/elotroformulario.css';
export class OtroFormulario extends Component {
 render() {
    return (
      <Container>
        <Row>
          <Col>
            <Form>
              <h1>Bienvenido, Por favor rellene los campos, para ofrecer sus Servicios</h1>
              <Form.Group controlId="formNombre">
                <Form.Label><h3>Nombre</h3></Form.Label>
                <Form.Control type="text" placeholder="Ingrese su nombre" />
              </Form.Group>

              <Form.Group controlId="formApellido">
                <Form.Label><h3>Apellido</h3></Form.Label>
                <Form.Control type="text" placeholder="Ingrese su apellido" />
              </Form.Group>

              <Form.Group controlId="formRut">
                <Form.Label><h3>Rut</h3></Form.Label>
                <Form.Control type="text" placeholder="Ingrese su rut" />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label><h3>Correo electronico</h3></Form.Label>
                <Form.Control type="email" placeholder="Ingrese su correo electronico" />
              </Form.Group>

              <Form.Group controlId="formTelefono">
                <Form.Label><h3>Teléfono</h3></Form.Label>
                <Form.Control type="text" placeholder="Ingrese su telefono" />
              </Form.Group>

              <Form.Group controlId="formFechaNacimiento">
                <Form.Label><h3>Fecha de nacimiento</h3></Form.Label>
                <Form.Control type="date" />
              </Form.Group>

              <Form.Group controlId="formComuna">
                <Form.Label><h3>Comuna</h3></Form.Label>
                <Form.Control as="select">
                 <option>La Florida</option>
                 <option>La Reina</option>
                 <option>Providencia</option>
                 <option>Santiago Centro</option>
                 <option>Independencia</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formRubro">
                <Form.Label><h3>Rubro</h3></Form.Label>
                <Form.Control as="select">
                 <option>Carpinteria</option>
                 <option>Electricista</option>
                 <option>Gasfitería</option>
                 <option>Pintor</option>
                 <option>Aseo</option>
                </Form.Control>
              </Form.Group>



              <Form.Group controlId="formTerminosCondiciones">
                <h3>Terms and Conditions:</h3>
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

export default OtroFormulario;