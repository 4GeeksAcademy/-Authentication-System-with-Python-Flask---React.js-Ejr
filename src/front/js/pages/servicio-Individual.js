import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { serviceIt } from "../../img/image.js";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { Row, Col, Container, Jumbotron, Button } from "react-bootstrap";

export const Servicioindividual = () => {
	const { store, actions } = useContext(Context);

	return (
		<Container>
			<Row>
				<Col className="my-5">
					<p>
						Desarrollar/IT <i className="fas fa-chevron-right" /> Individual
					</p>
				</Col>
			</Row>
			<Row>
				<Col md={6}>
					<img
						src={serviceIt}
						width="500"
						height="400"
						className="d-inline-block align-top img-thumbnail"
						alt="service image"
					/>
				</Col>
				<Col md={6}>
					<Jumbotron className="whiteBox border p-3">
						<div>
							<h1>Crearé un sitio web</h1>
							<span className="d-flex">
								<h2>$300.000</h2>
								<p className="mt-2">/proyecto</p>
							</span>
						</div>
						<div>
							<p>
								1 pagina <br />
								Personalización del diseño <br />
								Carga de contenido
							</p>
						</div>
						<Row>
							<Col md={6}>
								<p className="float-left text-dark">
									<i className="far fa-clock h3" /> 10 dias hablies
									<br />
									<i className="far fa-star h3" /> 4.8/5 (10 comentarios)
								</p>
							</Col>
							<Col md={6}>
								<p className="float-right text-dark">
									<i className="far fa-thumbs-up h3" /> 10 trabajos
									<br />
									<i className="fas fa-sync-alt h3" /> 3 modificación
								</p>
							</Col>
						</Row>

						<p>
							<Button variant="primary" size="lg" block>
								Comprar Servicio
							</Button>
						</p>
					</Jumbotron>
				</Col>
			</Row>
			<div className="transBox" />
		</Container>
	);
};
