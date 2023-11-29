import React, { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../../styles/elotroformulario.css";
export class Formulario extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Form>
              <h1>
                Bienvenido, Por favor rellene los campos, para ofrecer sus
                Servicios
              </h1>
              <Form.Group controlId="formNombre">
                <Form.Label>
                  <h3>Nombre</h3>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su nombre"
                  style={{ borderWidth: "3px", borderColor: "darkcyan" }}
                />
              </Form.Group>

              <Form.Group controlId="formApellido">
                <Form.Label>
                  <h3>Apellido</h3>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su apellido"
                  style={{ borderWidth: "3px", borderColor: "darkcyan" }}
                />
              </Form.Group>

              <Form.Group controlId="formRut">
                <Form.Label>
                  <h3>Rut</h3>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su rut"
                  style={{ borderWidth: "3px", borderColor: "darkcyan" }}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>
                  <h3>Correo electronico</h3>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese su correo electronico"
                  style={{ borderWidth: "3px", borderColor: "darkcyan" }}
                />
              </Form.Group>

              <Form.Group controlId="formTelefono">
                <Form.Label>
                  <h3>Teléfono</h3>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su telefono"
                  style={{ borderWidth: "3px", borderColor: "darkcyan" }}
                />
              </Form.Group>

              <Form.Group controlId="formFechaNacimiento">
                <Form.Label>
                  <h3>Fecha de nacimiento</h3>
                </Form.Label>
                <Form.Control
                  type="date"
                  style={{ borderWidth: "3px", borderColor: "darkcyan" }}
                />
              </Form.Group>

              <Form.Group controlId="formComuna">
                <Form.Label><h3>Comuna</h3></Form.Label>
                <Form.Control as="select" style={{ borderWidth: "3px",borderColor: 'darkcyan' }}>
                 <option>La Florida</option>
                 <option>La Reina</option>
                 <option>Providencia</option>
                 <option>Santiago Centro</option>
                 <option>Independencia</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formRubro">
                <Form.Label><h3>Rubro</h3></Form.Label>
                <Form.Control as="select" style={{ borderWidth: "3px",borderColor: 'darkcyan' }}>
                 <option>Carpinteria</option>
                 <option>Electricista</option>
                 <option>Gasfitería</option>
                 <option>Pintor</option>
                 <option>Aseo</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formTerminosCondiciones">
                <h3>
                  <strong>Terminos y Condiciones</strong>
                </h3>
                <br />
                <div
                  className="Terms"
                  type="text"
                  style={{ borderWidth: "3px", borderColor: "darkcyan" }}
                >
                  {" "}
                  <p>
                    El documento denominado Términos y Condiciones Generales de
                    Uso de una determinada página o sitio web es aquel que
                    contiene las normas que regulan la interacción de las
                    personas que acceden a ella (usuarias) con el contenido que
                    la misma página pone a disposición, con los productos y/o
                    servicios ofrecidos en ella, y con las personas responsables
                    del sitio. Los Términos y Condiciones de Uso constituyen un
                    documento que se ha vuelto cada vez más habitual y necesario
                    para cualquier persona que sea propietaria de un Sitio Web,
                    o bien que utilice algún tipo de servicio o host
                    proporcionado por un proveedor (como las plataformas de
                    blogging, microblogging y algunas redes sociales). Aunque en
                    Chile no existe una regulación extensiva en la misma
                    materia, este documento se ha elaborado teniendo en
                    consideración la incipiente legislación aplicable y las
                    recomendaciones realizadas por organismos públicos y no
                    gubernamentales. Es por lo anterior que este modelo de
                    Términos y Condiciones contiene una lista extensa de
                    menciones que se consideran importantes para el correcto
                    funcionamiento de todo sitio web, generando la confianza que
                    incentive en los usuarios la interacción con la página y con
                    los productos y servicios ofrecidos en ella. En relación a
                    los sitios Web que entregan servicios o productos para que
                    las personas usuarias puedan comprar o contratar deben
                    respetar la normativa aplicable a las páginas de internet,
                    así como entregar un acceso a la información claro y
                    conciso, velando por la seguridad de las transacciones y el
                    manejo de los datos personales, especialmente aquellos
                    relacionados con información bancaria o financiera.
                  </p>
                </div>
                <Form.Check
                  type="checkbox"
                  label="Acepto los términos y condiciones"
                />
                <br />
                <Button className="buttonright" type="submit">Aceptar</Button>{" "}
                <Button className="buttonright" variant="secondary" type="reset">
                  Cancelar
                </Button>
              </Form.Group>
              <br />

              <Button type="submit">Regresar</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Formulario;
