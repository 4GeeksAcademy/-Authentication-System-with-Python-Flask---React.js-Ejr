import React from "react";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { PersonCategory } from "./personCategory.jsx";
import { personA, personB, personC, personD } from "../../img/image.js";
import { Jumbotron, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

export const PersonBox = props => {
	return (
		<>
			<Jumbotron className="whiteBox shadow-lg p-5 mb-5">
				<h2 className="mb-3">{props.title}</h2>
				<Row className="row-cols-1 row-cols-sm-2 row-cols-md-4 align-items-center scroll ">
					<Col md={3}>
						<PersonCategory img={personA} name="Pedro Paredes" title="Consultor" valor="$10.000/hora" />
					</Col>
					<Col md={3}>
						<PersonCategory
							img={personB}
							name="Marcia Canales"
							title="Desarrollador Fullstack"
							valor="$250.000/proyecto básico"
							numero="3"
						/>
					</Col>
					<Col md={3}>
						<PersonCategory
							img={personC}
							name="Federico Ruiz-Tagle"
							title="Diseñador de Logos"
							valor="$40.000/logo pequeño"
							numero="3"
						/>
					</Col>
					<Col md={3}>
						<PersonCategory
							img={personD}
							name="Felipe Morales"
							title="Arquitectura TI"
							valor="$25.000/hora"
							numero="3"
						/>
					</Col>
				</Row>
			</Jumbotron>
		</>
	);
};

PersonBox.propTypes = {
	name: PropTypes.string,
	title: PropTypes.string,
	valor: PropTypes.string
};
