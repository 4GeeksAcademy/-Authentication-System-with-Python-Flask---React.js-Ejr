import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Form, Button, Row, Col, Card, Badge, CardDeck, ButtonToolbar, ButtonGroup } from "react-bootstrap";
import "../../styles/orderCard.scss";

export function OrderCard() {
	const { store, actions } = useContext(Context);
	return (
		<Card className="orderCardBody">
			<div className="containerOrder">
				<h3 className="productName">Jamón prensado</h3>
				<span className="providerName">Distribuidora de carnes</span>
				<span className="productSize">200 gramos</span>
				<hr className="line" />
				<div className="buttonsGroup">
					<Button className="checkButton" variant="success">
						<h4 className="productsInPlace">12</h4> <i className="fas fa-check checkBackspaceInSymbols" />
					</Button>
					<div className="allNumberButtons">
						<Form.Control className="orderInput" size="lg" type="text" placeholder="Ingrese orden" />
					</div>
					<div className="bottomButtons">
						<Button className="backspaceButton" variant="secondary">
							<i className="fas fa-backspace checkBackspaceInSymbols" />
						</Button>
						<Button className="orderButton" variant="primary">
							<h4>3</h4> <i className="fas fa-sign-in-alt checkBackspaceInSymbols" />
						</Button>
					</div>
				</div>
			</div>
		</Card>
	);
}
