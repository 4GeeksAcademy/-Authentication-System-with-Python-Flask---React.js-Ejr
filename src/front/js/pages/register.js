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

const Register = () => {
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
						<Col md={7}>
							<div className="transBox" />
							<h1 className="text-white mt-3">Obtenga su cuenta gratis</h1>
						</Col>
					</Row>
					<div
						className="container iconBox shadow-lg p-3 pt-5"
						style={{
							height: "100%",
							backgroundColor: "white",
							borderRadius: "10px",
							width: "800px"
						}}>
						<Form>
							<Form.Group as={Row} controlId="formHorizontalEmail">
								<Col sm={1}></Col>
								<Form.Label column sm={3}>
									<h6>Correo electrónico</h6>
								</Form.Label>
								<Col sm={6}>
									<Form.Control type="email" />
								</Col>
								<Col sm={1}></Col>
							</Form.Group>

							<Form.Group as={Row} controlId="formHorizontalPassword">
								<Col sm={1}></Col>
								<Form.Label column sm={3}>
									<h6>Contraseña</h6>
								</Form.Label>
								<Col sm={6}>
									<Form.Control type="password" />
								</Col>
								<Col sm={1}></Col>
							</Form.Group>
							<Form.Group as={Row} className="pb-3" controlId="formHorizontalPassword">
								<Col sm={1}></Col>
								<Form.Label column sm={3}>
									<h6>Confirmar contraseña</h6>
								</Form.Label>
								<Col sm={6}>
									<Form.Control type="password" />
								</Col>
								<Col sm={1}></Col>
							</Form.Group>
							<div>
								<ButtonGroup toggle className="trans mb-1">
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
								<br />
								<Button
									variant="primary"
									size="lg"
									type="submit"
									block
									style={{ marginBottom: "70px" }}>
									Crear cuenta
								</Button>
							</div>
						</Form>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default withRouter(Register);
