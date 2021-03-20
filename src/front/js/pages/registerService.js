import React, { useContext, useState } from "react";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { logoBlanco, man } from "../../img/image";
import { withRouter } from "react-router-dom";
import { Container, Button, Form, FormControl, Row, Col, ButtonGroup, ToggleButton } from "react-bootstrap";
import { IconBox } from "../component/IconBox.jsx";
import { CardBox } from "../component/cardBox.jsx";
import { ServiceBox } from "../component/serviceBox.jsx";
import { Footer } from "../component/footer";
import { LoginModal } from "../component/Login";
import { Link } from "react-router-dom";

const RegisterService = () => {
	const [checked, setChecked] = useState(false);
	return (
		<div
			className="background"
			style={{
				backgroundImage: `url(https://3000-salmon-otter-elqylgff.ws-us03.gitpod.io/backGround.png)`
			}}>
			<Container>
				<div>
					<Row>
						<Col xs={4}>
							<img
								src={logoBlanco}
								width="110"
								height="33"
								className="d-inline-block align-top mt-5"
								alt="cotec"
							/>
						</Col>
					</Row>
					<Row>
						<Col md={2}></Col>
						<Col md={7}>
							<div className="transBox" />
							<p className="text-white mt-3">
								¡Gracias por tu interes en Cotec!
								<br />
								Conectaremos millones de personas y empresas contigo
								<br />
								Para comenzar, todo lo que necesitas hacer es registrar tu servicio
							</p>

							<h1 className="text-white mt-3">Registra tu servicio</h1>
						</Col>
					</Row>
					<div
						className="container iconBox shadow-lg p-3 pt-5 pr-5 pl-5"
						style={{
							height: "100%",
							backgroundColor: "white",
							borderRadius: "10px",
							width: "730px"
						}}>
						<Form>
							<Form.Group controlId="exampleForm.ControlSelect1">
								<Form.Label>
									<strong>¿Cuál es el servicio que ofreces?</strong>
								</Form.Label>
								<Form.Control
									as="select"
									style={{
										backgroundColor: "lightgray",
										marginBottom: "10px"
									}}>
									<option defaultValue>Seleccionar categoría de servicio</option>
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</Form.Control>
								<Form.Control
									as="select"
									style={{ backgroundColor: "lightgray", marginBottom: "10px" }}>
									<option defaultValue>Seleccionar subcategoría de servicio</option>
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</Form.Control>
								<br />

								<Form.Label>
									<strong>¿Cual es el valor o costo de tu servicio?</strong>
								</Form.Label>
								<Form.Control
									as="select"
									style={{ backgroundColor: "lightgray", marginBottom: "10px" }}>
									<option defaultValue>Seleccionar el tipo. Ej: por hora, por servicio, etc.</option>
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</Form.Control>
								<Form.Control
									type="textarea"
									placeholder="Ingresa el valor del servicio"
									style={{ backgroundColor: "lightgray", marginBottom: "10px" }}></Form.Control>
								<p>La tarifa del servicio de Cotec es del 2.5% del valor del trabajo realizado</p>
								<br />
								<Form.Label>
									<strong>Titulo de tu servicio</strong>
								</Form.Label>
								<Form.Control as="textarea" placeholder="ej: ¡Crea tu propia página!" rows={2} />
								<p>Máximo 10 palabras</p>
								<br />
								<Form.Label>
									<strong>Describe tu servicio y/o habilidades</strong>
								</Form.Label>
								<Form.Control
									as="textarea"
									placeholder="ej: Tengo 10 años de experiencia en Backend Rest API, React, Adobe Photoshop"
									rows={3}
								/>
								<br />
								<Form.Label>
									<strong>
										¿Tienes un portafolio que quisieras mostrar a tus potenciales clientes?
									</strong>
								</Form.Label>
								<Form.Control as="textarea" placeholder="ej: www.virtualex.cl" rows={2} />
								<br />
								<Form.Label>
									<strong>¿Cuánto tiempo llevas trabajando en esta área?</strong>
								</Form.Label>
								<Form.Control
									as="select"
									style={{ backgroundColor: "lightgray", marginBottom: "10px" }}>
									<option defaultValue>Seleccionar rango de años</option>
									<option>1-3 años</option>
									<option>3-5 años</option>
									<option>5-10 años</option>
									<option>10-15 años</option>
									<option>+15 años</option>
								</Form.Control>
								<br />
								<Form.Label>
									<strong>¿Por qué deberian contratarte a ti?</strong>
								</Form.Label>
								<Form.Control
									as="textarea"
									placeholder="ej: He realizado mas de 100 sitios web a nivel mundial"
									rows={3}
								/>
							</Form.Group>
							<Row style={{ justifyContent: "center" }}>
								<Button
									variant="primary"
									size="lg"
									type="submit"
									style={{ marginBottom: "40px", marginTop: "40px" }}>
									<strong>Registra tu servicio</strong>
								</Button>
							</Row>
						</Form>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default withRouter(RegisterService);
