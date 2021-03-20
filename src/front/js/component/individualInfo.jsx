import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { Row, Col, Jumbotron, Button } from "react-bootstrap";
import { personB } from "../../img/image.js";

export const Individuallnfo = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<h2>Crearé un sitio web flexibles</h2>
			<Jumbotron className="whiteBox border-top pt-3 p-0 position-static">
				<Row className="d-inline-block d-flex">
					<Col sm={8} style={{ width: "180px" }}>
						<span className="d-flex">
							<h2>$300.000</h2>
							<p className="mt-2">/proyecto</p>
						</span>
					</Col>
					<Col sm={4} style={{ width: "180px" }}>
						<Button variant="outline-dark" className="float-right ">
							<i className="fas fa-star " />
						</Button>

						<Button variant="outline-dark" className="float-right mr-1">
							<i className="fas fa-share-alt"></i>
						</Button>
					</Col>
				</Row>
				<div>
					<p>1 pagina, Personalización del diseño, Carga de contenido</p>
				</div>

				<Row className="d-inline-block d-flex">
					<Col sm={6} style={{ width: "180px" }}>
						<p className="float-left text-dark">
							<i className="far fa-clock h3" /> 10 dias
							<br />
							<i className="far fa-star h3" /> 4.8/5 (10)
						</p>
					</Col>
					<Col sm={6} style={{ width: "180px" }}>
						<p className="float-right text-dark">
							<i className="far fa-handshake h3" /> 10 trabajos
							<br />
							<i className="fas fa-retweet " style={{ fontSize: "1.75rem" }} /> 3 Revisión
						</p>
					</Col>
				</Row>
				<p>
					<Button variant="primary" size="lg" block>
						Comprar Servicio
					</Button>
				</p>
			</Jumbotron>
		</>
	);
};
