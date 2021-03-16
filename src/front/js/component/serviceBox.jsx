import React from "react";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { Jumbotron, Row, Col } from "react-bootstrap";

export const ServiceBox = () => {
	return (
		<>
			<Jumbotron className="whiteBox shadow-lg p-3 mb-5 p-5">
				<h2>¿Qué es lo fabuloso de Cotec?</h2>
				<br />
				<Row>
					<Col md={1}>
						<i className="fas fa-wallet icon" />
					</Col>
					<Col md={11}>
						<h4>Lo mejor para cada presupuesto</h4>
						<p>
							Encuentre servicios de alta calidad a todos los precios. Sin tarifas por hora, solo precios
							basados en proyectos
						</p>
					</Col>
				</Row>
				<Row className="my-3">
					<Col md={1}>
						<i className="fas fa-history icon" />
					</Col>
					<Col md={11}>
						<h4>Trabajo de calidad hecho rápidamente</h4>
						<p>
							Encuentre el profesional independiente adecuado para comenzar a trabajar en su proyecto en
							cuestión de minutos.
						</p>
					</Col>
				</Row>
				<Row>
					<Col md={1}>
						<i className="far fa-credit-card icon" />
					</Col>
					<Col md={11}>
						<h4>Pagos protegidos, siempre</h4>
						<p>
							Siempre sepa lo que pagará por adelantado. Su pago no se libera hasta que aprueba el
							trabajo.
						</p>
					</Col>
				</Row>
			</Jumbotron>
		</>
	);
};
