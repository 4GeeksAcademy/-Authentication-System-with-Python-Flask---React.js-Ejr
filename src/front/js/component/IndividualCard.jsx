import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { Button, Card, Nav, Col, Media } from "react-bootstrap";
import PropTypes from "prop-types";
import { personB } from "../../img/image";

export const IndividualCard = props => {
	return (
		<Card>
			<Card.Header>
				<Nav variant="tabs" defaultActiveKey="#first">
					<Nav.Item>
						<Nav.Link href="#first">Servicio</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="#Second">Sobre el vendedor</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="#Theird">Comentario</Nav.Link>
					</Nav.Item>
				</Nav>
			</Card.Header>
			<Card.Body>
				<Card.Title className="mt-4">Nuestro servicio</Card.Title>
				<Card.Text>
					¿Estás buscando a alguien para crear el diseño de sitios web de wix o la tienda en línea de wix?
					¡Entonces, ha venido al lugar correcto! Crearé un sitio web profesional de wix o un sitio web de
					comercio electrónico de wix de cada nicho de acuerdo con sus requisitos.
				</Card.Text>
				<Card.Title className="mt-4">Proceso de trabajo</Card.Title>
				<Card.Text>
					¿Estás buscando a alguien para crear el diseño de sitios web de wix o la tienda en línea de wix?
					¡Entonces, ha venido al lugar correcto! Crearé un sitio web profesional de wix o un sitio web de
					comercio electrónico de wix de cada nicho de acuerdo con sus requisitos.
				</Card.Text>
				<Card.Title className="mt-4">Portafolio / Experiencia</Card.Title>
				<Card.Text>getbootstrap.com, getbootstrap.com, getbootstrap.com</Card.Text>
				<Card.Title className="mt-4">¿Por qué deberías contratarme?</Card.Title>
				<Card.Text>
					Realizado más de 100 sitios web al mejor nivel. La satisfacción del cliente es mi primera prioridad.
					Calidad proporcionada y trabajo garantizado dentro de las 24 horas. Actitud profesional.
				</Card.Text>
				<Card.Title className="mt-4">Sobre el vendedor</Card.Title>
				<Media className="border p-2 bg-light rounded mb-3">
					<img
						src={personB}
						width="100"
						height="100"
						className="d-inline-block align-top img-thumbnail d-flex"
						alt="person_Image"
						style={{ borderRadius: "50%" }}
					/>
					<Media.Body className="ml-3 ">
						<p className="font-weight-bold">El Nombre de Freelancer</p>
						<p className="mb-2">3años experiencia</p>
						<p className="mb-2">Clasificación de membresía: Miembro individual </p>
						<p>
							{" "}
							<i className="fas fa-map-marker-alt" />
							&nbsp;Santiago
						</p>
						<p>
							<i className="far fa-star h3" /> calificación 4.8/5 (10 Comentario)
						</p>
					</Media.Body>
				</Media>
				<Button variant="outline-primary" size="lg" block>
					Comprar el servicio
				</Button>
			</Card.Body>
		</Card>
	);
};

IndividualCard.propTypes = {
	servicio: PropTypes.string,
	proceso: PropTypes.string,
	experiencia: PropTypes.string,
	merit: PropTypes.string
};
