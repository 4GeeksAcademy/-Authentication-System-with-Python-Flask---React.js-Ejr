import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Link from "react-router-dom";

export const AddProduct = () => {
	return (
		<Jumbotron className="jumbotronCSS">
			<h1>
				<i className="fas fa-sign-in-alt" />
			</h1>
			<h5>Registro de productos</h5>

			<Card body style={{ display: "flex" }}>
				<Row>
					<Col md={3}>
						<Image src="https://via.placeholder.com/250C/O https://placeholder.com/" fluid />
					</Col>
					<Col>
						<Form>
							<Form.Group as={Col}>
								<Form.Control size="sm" type="text" placeholder="Nombre" />
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Control size="sm" type="text" placeholder="Marca" />
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Control size="sm" type="text" placeholder="Categoría" />
							</Form.Group>
						</Form>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<Form>
							<Form.Group as={Col}>
								<Form.Control size="sm" type="text" placeholder="Presentación" />
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Control size="sm" type="text" placeholder="Impuesto" />
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Control size="sm" type="text" placeholder="Código" />
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Control size="sm" type="text" placeholder="Código Cabys" />
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Control size="sm" type="text" placeholder="Proveedor" />
							</Form.Group>
						</Form>
					</Col>
				</Row>
				<Row className="buttonsCSS">
					<Col md={2}>
						<Button size="sm" variant="primary">
							Guardar
						</Button>
					</Col>
					<Col md={2}>
						<Button size="sm" variant="secondary">
							Eliminar
						</Button>
					</Col>
				</Row>
			</Card>
		</Jumbotron>
	);
};
