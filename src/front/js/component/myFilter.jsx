import React from "react";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { Card, Button, Accordion } from "react-bootstrap";

export const MyFilter = () => {
	return (
		<>
			<Accordion defaultActiveKey="0">
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="0">
							<i className="fas fa-chevron-right" /> Desarrollar/IT
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="0">
						<Card.Body>
							E-commerce
							<br />
							Mobil App
							<br />
							Softwear
							<br />
							Game
							<br />
							Wordpress
							<br />
							Otros
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="1">
							<i className="fas fa-chevron-right" /> Diseño
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="1">
						<Card.Body>
							Arte/Illustration
							<br />
							Branding
							<br />
							Editor/Presentacion
							<br />
							Photo
							<br />
							Video
							<br />
							Otros
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="2">
							<i className="fas fa-chevron-right" /> Marketing
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="2">
						<Card.Body>
							Arte/Illustration
							<br />
							Branding
							<br />
							Otros
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="3">
							<i className="fas fa-chevron-right" /> Contabilidad
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="3">
						<Card.Body>
							Arte/Illustration
							<br />
							Branding
							<br />
							Otros
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Card.Header>
						<Accordion.Toggle as={Button} variant="link" eventKey="4">
							<i className="fas fa-chevron-right" /> Ley/Derecho
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="4">
						<Card.Body>
							Arte/Illustration
							<br />
							Branding
							<br />
							Otros
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		</>
	);
};
