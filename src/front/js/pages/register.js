import React, { useContext, useState } from "react";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { logoBlanco, man } from "../../img/image";
import { withRouter } from "react-router-dom";
import { Container, Button, Form, FormControl, Row, Col, ButtonGroup, ToggleButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Footer } from "../component/footer";

const Register = () => {
	const [checked, setChecked] = useState(false);
	return (
		<div
			className="backgroundRegistro"
			style={{
				backgroundImage: `url(http://localhost:3000/loginBackGround.png)`
			}}>
			<Container>
				<div>
					<Row>
						<Link to="/">
							<Col xs={4}>
								<img
									src={logoBlanco}
									width="110"
									height="33"
									className="d-inline-block align-top mt-5"
									alt="cotec"
								/>
							</Col>
						</Link>
					</Row>
					<Row>
						<Col md={2} />
						<Col md={7}>
							<div className="transBox" />
							<h2 className="text-white mt-3">Obtenga su cuenta gratis</h2>
						</Col>
					</Row>
					<div
						className="container iconBox shadow-lg p-3 pt-5"
						style={{
							height: "100%",
							backgroundColor: "white",
							borderRadius: "10px",
							width: "730px"
						}}>
						<Form>
							<Form.Group as={Row} controlId="formHorizontalEmail">
								<Col sm={1} />
								<Form.Label column sm={3}>
									<h6>Correo electrónico</h6>
								</Form.Label>
								<Col sm={6}>
									<Form.Control type="email" />
								</Col>
								<Col sm={1} />
							</Form.Group>

							<Form.Group as={Row} controlId="formHorizontalPassword">
								<Col sm={1} />
								<Form.Label column sm={3}>
									<h6>Contraseña</h6>
								</Form.Label>
								<Col sm={6}>
									<Form.Control type="password" />
								</Col>
								<Col sm={1} />
							</Form.Group>
							<Form.Group as={Row} className="pb-3" controlId="formHorizontalPassword">
								<Col sm={1} />
								<Form.Label column sm={3}>
									<h6>Confirmar contraseña</h6>
								</Form.Label>
								<Col sm={6}>
									<Form.Control type="password" />
								</Col>
								<Col sm={1} />
							</Form.Group>
							<div className="row" style={{ justifyContent: "center" }}>
								<ButtonGroup toggle className="mb-5">
									<ToggleButton
										type="checkbox"
										variant="outline-primary"
										checked={checked}
										value="1"
										onChange={e => setChecked(e.currentTarget.checked)}>
										Quiero ofrecer mis servicios
									</ToggleButton>
									&nbsp;&nbsp;&nbsp;&nbsp;
									<ToggleButton
										type="checkbox"
										variant="primary"
										checked={checked}
										value="1"
										onChange={e => setChecked(e.currentTarget.checked)}>
										Quiero contratar servicios
									</ToggleButton>
								</ButtonGroup>
							</div>
							<Row style={{ justifyContent: "center" }}>
								<Link to="/registerservice">
									<Button
										variant="primary"
										size="lg"
										type="submit"
										style={{ marginBottom: "40px", width: "300px" }}>
										<strong>Crear cuenta</strong>
									</Button>
								</Link>
							</Row>
						</Form>
					</div>
				</div>
			</Container>
			<div className="transBox" />
			<div className="transBox" />
			<div className="transBox" />
			<Footer />
		</div>
	);
};

export default withRouter(Register);
