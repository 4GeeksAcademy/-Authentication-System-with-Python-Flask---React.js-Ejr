import React, { useContext } from "react";
import { Context } from "../store/appContext";
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
	ListGroup
} from "react-bootstrap";
import Link from "react-router-dom";
import { OrderCard } from "./orderCard";
import { OrderList } from "./orderList";
import { ProductsByProvider } from "./productsByProvider";
import "../../styles/productsByProvider.scss";

export const ProductsByProviderReport = () => {
	return (
		<Accordion className="first-accordion" defaultActiveKey="0">
			<Card>
				{/* Primer acordión: Inventario por proveedor*/}
				<Accordion.Toggle as={Card.Header} eventKey="1">
					<h5>Inventario por proveedor</h5>
				</Accordion.Toggle>
				<Accordion.Collapse eventKey="1">
					<Accordion defaultActiveKey="0">
						{/* Segundo acordión: nombre proveedor*/}
						<ProductsByProvider />
					</Accordion>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
};
