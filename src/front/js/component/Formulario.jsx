import React, { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../../styles/elotroformulario.css";
import { Link } from "react-router-dom";
export class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      rut: "",
      telefono: "",
      comuna: "", 
      fecha_de_nacimiento: "",
      rubro: "",
      aceptoTerminos: false,
    };
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    this.setState({
      [name]: type === "checkbox" ? checked : value,
      errores: {
        ...prevState.errores,
        [name]: error,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const {
      nombre,
      apellido,
      email,
      password,
      rut,
      telefono,
      comuna,
      fecha_de_nacimiento,
      rubro,
      aceptoTerminos,
    } = this.state;
  
    if (!aceptoTerminos) {
      console.error("Debes aceptar los términos y condiciones.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          apellido,
          email,
          password,
          rut,
          telefono,
          comuna,
          fecha_de_nacimiento,
          tipoUsuario,
          rubro,
        }),
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        const errorData = await response.json();
        console.error("Error al enviar los datos al servidor:", errorData);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }}

  validateEmail = (email) => {
    return true;
  };
  
  
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Form onSubmit={e=>{ handleSubmit(e)}}>
              <h1>
                Bienvenido! Por favor rellene los campos para ofrecer sus
                servicios
              </h1>
              <Form.Group controlId="formNombre">
                <Form.Label>
                  <h3>Nombre</h3>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Ingrese su nombre"
                  onChange={handleChange}
                  style={{ borderWidth: "3px", borderColor: "darkcyan" }}
                />
                {errores.nombre && (
                  <Form.Text className="text-danger">{errores.nombre}</Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="formApellido">
                <Form.Label>
                  <h3>Apellido</h3>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="apellido"
                  value={state.apellido}
                  onChange={handleChange}
                  placeholder="Ingrese su apellido"
                  style={{ borderWidth: "3px", borderColor: "darkcyan" }}
                  
                />
                {errores.apellido && (
                  <Form.Text className="text-danger">{errores.apellido}</Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="formRut">
                <Form.Label>
                  <h3>Rut</h3>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="rut"
                  value={state.rut}
                  onChange={handleChange}
                  placeholder="Ingrese su rut"
                  style={{ borderWidth: "3px", borderColor: "darkcyan" }}
                />
                {errores.rut && (
                  <Form.Text className="text-danger">{errores.rut}</Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>
                  <h3>Correo electronico</h3>
                </Form.Label>
                <Form.Control
                    type="email"
                    name="email"  
                    value={state.email} 
                    placeholder="Ingrese su correo electronico"
                    style={{ borderWidth: "3px", borderColor: "darkcyan" }}
                    onChange={handleChange}  
                />
                {errores.email && (
                  <Form.Text className="text-danger">{errores.email}</Form.Text>
                )}
              </Form.Group>

             < Form.Group controlId="formContraseña">
                <Form.Label>
                  <h3>Contraseña</h3>
                </Form.Label>
                <Form.Control
                    type="password"
                    name="password"  
                    value={this.state.password} 
                    placeholder="password"
                    style={{ borderWidth: "3px", borderColor: "darkcyan" }}
                    onChange={this.handleChange}  
                />
                {errores.password && (
                      <Form.Text className="text-danger">{errores.password}</Form.Text>
                    )}
              </Form.Group>

              <Form.Group controlId="formTelefono">
                <Form.Label>
                  <h3>Teléfono</h3>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="telefono"
                  value={state.telefono}
                  onChange={handleChange} 
                  placeholder="Ingrese su telefono"
                  style={{ borderWidth: "3px", borderColor: "darkcyan" }}
                />
                {errores.telefono && (
                      <Form.Text className="text-danger">{errores.telefono}</Form.Text>
                    )}
              </Form.Group>

              <Form.Group controlId="formFechaNacimiento">
                <Form.Label>
                  <h3>Fecha de nacimiento</h3>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="fecha_de_nacimiento"
                  value={state.fecha_de_nacimiento}
                  onChange={handleChange}
                  style={{ borderWidth: "3px", borderColor: "darkcyan" }}
                />
                {errores.fecha_de_nacimiento && (
                      <Form.Text className="text-danger">{errores.fecha_de_nacimiento}</Form.Text>
                    )}
              </Form.Group>

              <Form.Group controlId="formComuna">
                <Form.Label>
                  <h3>Comuna</h3>
                </Form.Label>

                <Form.Control
                  as="select"
                  name="comuna"
                  value={this.state.comuna}
                  onChange={this.handleChange}
                  style={{ borderWidth: "3px", borderColor: "darkcyan" }}
                > 
                  <option value="" hidden>Seleccione su Comuna</option>
                  <option>La Florida</option>
                  <option>La Reina</option>
                  <option>Providencia</option>
                  <option>Santiago Centro</option>
                  <option>Independencia</option>
                </Form.Control>
                {errores.comuna && (
                      <Form.Text className="text-danger">{errores.comuna}</Form.Text>
                    )}

              </Form.Group>

              <Form.Group controlId="formTipoUsuario">
              <Form.Label>
                <h3>Tipo de Usuario</h3>
              </Form.Label>
              <Form.Control
                as="select"
                name="tipoUsuario"
                value={state.tipoUsuario}
                onChange={handleChange}
                style={{ borderWidth: "3px", borderColor: "darkcyan" }}
              >
                <option value="">Seleccione...</option>
                <option value="cliente">Cliente</option>
                <option value="prestador">Prestador de Servicio</option>
              </Form.Control>
            </Form.Group>

            {/* Campo rubro visible si el tipo de usuario es "prestador" */}
            {state.tipoUsuario === "prestador" && (
              <Form.Group controlId="formRubro">
                <Form.Label>
                  <h3>Rubro</h3>
                </Form.Label>
                <Form.Control
                  as="select"
                  name="rubro"
                  value={state.rubro}
                  onChange={handleChange}
                  style={{ borderWidth: "3px", borderColor: "darkcyan" }}
                >
                  <option>Carpinteria</option>
                  <option>Electricista</option>
                  <option>Gasfitería</option>
                  <option>Pintor</option>
                  <option>Aseo</option>
                </Form.Control>
                {errores.rubro && (
                      <Form.Text className="text-danger">{errores.rubro}</Form.Text>
                    )}
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
                <Form.Group>
                <Form.Check
                  type="checkbox"
                  name="aceptoTerminos"
                  checked={state.aceptoTerminos}
                  onChange={handleChange}
                  label="Acepto los términos y condiciones"
                />
                <br />
                <Button className="buttonright" type="submit">
                  
                  Aceptar 
                </Button>{" "}
                <Button
                  className="buttonright"
                  variant="secondary"
                  type="reset"
                >
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

