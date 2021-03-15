import React from "react";
import { Accordion, Form, Button, Card, ListGroup, Jumbotron } from "react-bootstrap";

export const OrderList = () => {
	return (
		<div>
			<Accordion.Toggle as={Card.Header} eventKey="1">
				<strong>Ver pedido: [Nombre de proveedor]</strong>
			</Accordion.Toggle>
			<Accordion.Collapse eventKey="1">
				<Card.Body>
					<ListGroup>
						<ListGroup.Item>24 Cuadernos</ListGroup.Item>
						<ListGroup.Item>6 Insecticida</ListGroup.Item>
						<ListGroup.Item>12 Salsa de tomate</ListGroup.Item>
						<ListGroup.Item>12 Desinfectante</ListGroup.Item>
					</ListGroup>
				</Card.Body>
			</Accordion.Collapse>
		</div>
	);
};
