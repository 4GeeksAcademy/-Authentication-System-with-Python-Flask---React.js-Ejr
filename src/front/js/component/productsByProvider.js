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
import "../../styles/productsByProvider.scss";

export const ProductsByProvider = () => {
	const { store, actions } = useContext(Context);
	return (
		<div>
			{!!store.products &&
				store.products.map((item, index) => {
					return (
						<Accordion key={item} defaultActiveKey="0">
							<Card className="second-accordion">
								{/* Segundo acordión: Nombre de proveedor */}
								<Accordion.Toggle as={Button} variant="link" eventKey="1">
									{item.provider}
								</Accordion.Toggle>
								<Accordion.Collapse eventKey="1">
									<Card.Body>
										{/* Tercer acordión: cartas de productos */}
										<div>
											<Accordion defaultActiveKey="0">
												<OrderList />
											</Accordion>
											<Card className="cards-container">
												<OrderCard />
											</Card>
										</div>
									</Card.Body>
								</Accordion.Collapse>
							</Card>
						</Accordion>
					);
				})}
		</div>
	);
};
