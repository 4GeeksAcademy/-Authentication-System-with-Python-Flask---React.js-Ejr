import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { Row, Col, Container, Jumbotron, Button } from "react-bootstrap";
import { Individuallnfo } from "../component/individualInfo.jsx";
import { IndividualCard } from "../component/IndividualCard.jsx";
import { Comments } from "../component/Mycomments.jsx";
import { Formcomment } from "../component/formComment.jsx";
import Portafolio from "../component/Portafolio.jsx";

export const Servicioindividual = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<Container>
				<Row>
					<Col className="my-5">
						<p>
							Desarrollar/IT <i className="fas fa-chevron-right" /> Individual
						</p>
					</Col>
				</Row>
				<Row>
					<Col md={8}>
						<Portafolio />
					</Col>
					<Col md={4}>
						<Individuallnfo />
					</Col>
				</Row>
				<Row>
					<Col>
						<IndividualCard />
					</Col>
				</Row>
				<div className="transBox" />
				<Row>
					<Col>
						<h3 id="Theird">Opiniones sobre ABC</h3>
					</Col>
				</Row>
				<div className="transBox" />
				<Formcomment />
				<Comments />
			</Container>
		</>
	);
};
