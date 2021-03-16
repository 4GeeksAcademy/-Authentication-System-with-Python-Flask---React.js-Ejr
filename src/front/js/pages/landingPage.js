import React, { useContext } from "react";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { logoBlanco, man } from "../../img/image";
import { withRouter } from "react-router-dom";
import { Container, Button, Form, FormControl, Row, Col } from "react-bootstrap";
import { IconBox } from "../component/IconBox.jsx";
import { CardBox } from "../component/cardBox.jsx";
import { ServiceBox } from "../component/serviceBox.jsx";

const LandingPage = () => {
	return (
		<div
			className="background"
			style={{
				backgroundImage: `url(http://localhost:3000/backGround.png)`
			}}>
			<Container>
				<div>
					<Row>
						<Col md={6}>
							<img
								src={logoBlanco}
								width="110"
								height="33"
								className="d-inline-block align-top mt-5"
								alt="coteclogo"
							/>
							<div className="transBox" />

							<h1 className="text-white mt-3">
								Contrata en línea
								<br />a los mejores freelancers
							</h1>
							<Form inline>
								<FormControl
									type="text"
									placeholder="Search"
									className="mr-sm-2 my-3 "
									style={{ borderRadius: "1.75rem", width: "526px" }}
								/>
								<Button variant="outline-light" className="mr-3 mt-2 px-5">
									Buscar una freelancer
								</Button>
								<Button variant="secondary" className="mt-2 px-5">
									Soy un freelancer
								</Button>
							</Form>
						</Col>
						<Col md={6} sm={12} className="mt-5">
							<Button variant="secondary" className="float-right">
								Registrase
							</Button>
							<Button variant="outline-light" className="float-right" style={{ border: "none" }}>
								Inicia Seción
							</Button>
							<img
								src={man}
								width="500px"
								height="450px"
								className="d-inline-block align-top mt-2 "
								alt="freelancer"
							/>
						</Col>
					</Row>
					<IconBox />
					<CardBox />
					<ServiceBox />
					<br />

					<Button variant="primary">Primary</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="success">Success</Button>
					<Button variant="outline-primary">Primary</Button>
					<Button variant="outline-secondary">Secondary</Button>
					<Button variant="outline-success">Success</Button>
					<Button variant="light">Light</Button>
					<Button variant="outline-light">Light</Button>
				</div>
			</Container>
		</div>
	);
};

export default withRouter(LandingPage);
