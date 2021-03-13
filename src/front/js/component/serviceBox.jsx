import React from "react";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { Jumbotron } from "react-bootstrap";

export const ServiceBox = () => {
	return (
		<>
			<Jumbotron className="whiteBox shadow-lg p-3 mb-5 p-5">
				<h2>¿Qué es lo fabuloso de Cotec?</h2>
				<br />
				<h4>
					<i className="fas fa-dollar-sign" />
					&nbsp;&nbsp; Lo mejor para cada presupuesto
				</h4>
				<p>
					Encuentre servicios de alta calidad a todos los precios. Sin tarifas por hora, solo precios basados
					en proyectos
				</p>
				<h4>
					<i className="fas fa-history" />
					&nbsp;&nbsp; Trabajo de calidad hecho rápidamente
				</h4>
				<p>
					Encuentre el profesional independiente adecuado para comenzar a trabajar en su proyecto en cuestión
					de minutos.
				</p>
				<h4>
					<i className="far fa-credit-card" />
					&nbsp;&nbsp; Pagos protegidos, siempre
				</h4>
				<p>Siempre sepa lo que pagará por adelantado. Su pago no se libera hasta que aprueba el trabajo.</p>
			</Jumbotron>
		</>
	);
};
