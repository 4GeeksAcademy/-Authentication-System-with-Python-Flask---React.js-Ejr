import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Figure from "react-bootstrap/Figure";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import CardDeck from "react-bootstrap/CardDeck";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Link from "react-router-dom";

export const ProviderReport = () => {
	return (
		<Accordion className="accordion" defaultActiveKey="0">
			<Card>
				<Card.Header className="header">
					<Accordion.Toggle as={Button} variant="link" eventKey="1">
						<h4>
							<i className="fas fa-layer-group fa-1x productSymbolAccordion" />
							Existencias por proveedores
						</h4>
					</Accordion.Toggle>
				</Card.Header>
				<Accordion.Collapse eventKey="1">
					{/* ******Empieza el jumbotron del reporte**** */}
					<Card.Body>
						<CardDeck className="deckCSS">
							<Card.Body>
								<Card className="dataRow">
									<i className="image fas fa-layer-group fa-8x" />
									<Col>
										<Card.Title>Arroz Tío Pelón</Card.Title>
										<Card.Text>Distribuidora La Pampa</Card.Text>
									</Col>
									<Col>
										<Card.Text>
											<Badge variant="success" className="enBodega">
												<h4>24</h4>
											</Badge>
											<Button variant="outline-primary" block>
												<i className="fas fa-check fa-1x" />
											</Button>
										</Card.Text>
									</Col>
								</Card>
							</Card.Body>
							{/* ************Cartas de relleno************ */}
							<Card.Body>
								<Card className="dataRow">
									<i className="image fas fa-layer-group fa-8x" />
									<Col>
										<Card.Title>Sal Andrews</Card.Title>
										<Card.Text>DIPO S.A.</Card.Text>
									</Col>
									<Col>
										<Card.Text>
											<Badge variant="danger" className="enBodega">
												<h4>3</h4>
											</Badge>
											<Button variant="outline-primary" block>
												<i className="fas fa-check fa-1x" />
											</Button>
										</Card.Text>
									</Col>
								</Card>
							</Card.Body>
							<Card.Body>
								<Card className="dataRow">
									<i className="image fas fa-layer-group fa-8x" />
									<Col>
										<Card.Title>Pilsen</Card.Title>
										<Card.Text>Cervecería de Costa Rica</Card.Text>
									</Col>
									<Col>
										<Card.Text>
											<Badge variant="success" className="enBodega">
												<h4>298</h4>
											</Badge>
											<Button variant="outline-primary" block>
												<i className="fas fa-check fa-1x" />
											</Button>
										</Card.Text>
									</Col>
								</Card>
							</Card.Body>
							{/* **************Terminan cartas de relleno*************** */}
						</CardDeck>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
};
