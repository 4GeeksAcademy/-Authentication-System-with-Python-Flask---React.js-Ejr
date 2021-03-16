import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Form, Button, Row, Col, Card, Badge, CardDeck, ButtonToolbar, ButtonGroup, Jumbotron } from "react-bootstrap";
import "../../styles/orderCard.scss";

export function OrderCard() {
	const { store, actions } = useContext(Context);
	return (
		<Jumbotron>
			<Row>
				{!!store.products &&
					store.products.map((item, index) => {
						return (
							<Card key={item} className="order-body">
								<div className="order-container">
									{/* Nombre del producto */}
									<h3 className="product-name">{item.name_Product}</h3>
									{/* Nombre del proveedor */}
									<h5 className="provider-name">{item.provider}</h5>
									<span className="product-size">{item.cantidad}</span>
									<hr className="line" />
									<div className="buttons-group">
										<Button className="check-button" variant="success">
											<h4 className="product-in-place">{item.cantidad}</h4>
											<i className="fas fa-check font-awesome-symbols" />
										</Button>
										<div>
											<Form.Control
												className="order-input"
												size="lg"
												type="text"
												placeholder="Ingrese orden"
											/>
										</div>
										<div className="bottom-buttons">
											<Button className="backspace-button" variant="secondary">
												<i className="fas fa-backspace font-awesome-symbols" />
											</Button>
											{/* Botón de pedido */}
											<Button className="order-button" variant="primary">
												<h4>3</h4> <i className="fas fa-sign-in-alt font-awesome-symbols" />
											</Button>
										</div>
									</div>
								</div>
							</Card>
						);
					})}
			</Row>
		</Jumbotron>
	);
}
