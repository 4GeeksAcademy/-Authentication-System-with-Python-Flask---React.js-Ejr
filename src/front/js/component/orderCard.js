import React from "react";
import { Form, Button, Row, Col, Card, Badge, CardDeck, ButtonToolbar, ButtonGroup } from "react-bootstrap";

export function OrderCard() {
	return (
		<Card className="cardBody">
			<div className="container">
				<h3 className="productName">Jamón prensado</h3>
				<span className="providerName">Distribuidora de carnes</span>
				<span className="productSize">200 gramos</span>
				<hr className="line" />
				<div className="buttonsGroup">
					<Button className="checkButton" variant="success">
						<h4>12</h4> <i className="fas fa-check checkBackspaceInSymbols" />
					</Button>
					<div className="allNumberButtons">
						<Form.Control className="orderInput" size="lg" type="text" placeholder="Ingrese orden" />
						{/* <Button className="numberButton">1</Button>
						<Button className="numberButton">2</Button>
						<Button className="numberButton">3</Button>
						<Button className="numberButton">4</Button>
						<Button className="numberButton">5</Button>
						<Button className="numberButton">6</Button>
						<Button className="numberButton">7</Button>
						<Button className="numberButton">8</Button>
						<Button className="numberButton">9</Button> */}
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
