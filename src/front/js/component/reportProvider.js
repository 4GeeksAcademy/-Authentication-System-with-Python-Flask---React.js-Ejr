import React from "react";
import {
	Jumbotron,
	Button,
	Card,
	Image,
	Figure,
	Col,
	Row,
	Badge,
	CardDeck,
	Form,
	ButtonGroup,
	Container,
	Accordion,
	Header,
	ListGroup
} from "react-bootstrap";
import Link from "react-router-dom";
import { OrderCard } from "./orderCard";
import { OrderList } from "./orderList";
import "../../styles/reportProvider.scss";

export const ProviderReport = () => {
	return (
		<Accordion className="accordion" defaultActiveKey="0">
			<Card>
				<Accordion.Toggle as={Card.Header} eventKey="1">
					<h5>Inventario por proveedor</h5>
				</Accordion.Toggle>
				<Accordion.Collapse eventKey="1">
					<div>
						<Accordion defaultActiveKey="0">
							<OrderList />
						</Accordion>
						<div className="cardsContainer">
							<OrderCard />
							<OrderCard />
							<OrderCard />
							<OrderCard />
							<OrderCard />
							<OrderCard />
							<OrderCard />
							<OrderCard />
							<OrderCard />
							<OrderCard />
							<OrderCard />
						</div>
					</div>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
};
