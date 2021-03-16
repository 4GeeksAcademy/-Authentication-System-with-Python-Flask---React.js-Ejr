import React from "react";
import { Jumbotron, Button, Card, Image, Col, Row, Form, Link } from "react-bootstrap";
import "../../styles/addProduct.scss";

export const AddProduct = () => {
	return (
		<Form className="add-product-form container-fluid">
			<i className="fas fa-sign-in-alt add-product-symbol" />
			<h2>Registro de productos</h2>
			<Form.Row>
				<Form.Group as={Col}>
					<Form.Control type="text" placeholder="Nombre" />
				</Form.Group>
				<Form.Group as={Col}>
					<Form.Control type="text" placeholder="Marca" />
				</Form.Group>
			</Form.Row>
			<Form.Row>
				<Form.Group as={Col}>
					<Form.Control type="text" placeholder="Presentación" />
				</Form.Group>
				<Form.Group as={Col}>
					<Form.Control type="text" placeholder="Identificador" />
				</Form.Group>
			</Form.Row>
			<Form.Row>
				<Form.Group as={Col}>
					<Form.Control type="text" placeholder="Proveedor" />
				</Form.Group>

				<Form.Group as={Col}>
					<Form.Control type="text" placeholder="Categoría" />
				</Form.Group>
			</Form.Row>
			<Form.Row>
				<Form.Group as={Col}>
					<Form.Control type="text" placeholder="Precio de costo" />
				</Form.Group>
				<Form.Group as={Col}>
					<Form.Control type="text" placeholder="Impuesto" />
				</Form.Group>
			</Form.Row>
			<Form.Row>
				<Form.Group as={Col}>
					<Form.Control type="text" placeholder="% Ganancia" />
				</Form.Group>
				<Form.Group as={Col}>
					<Form.Control type="text" placeholder="Precio de venta" />
				</Form.Group>
			</Form.Row>
			<Button block variant="primary" type="submit" className="guardar-button">
				Guardar
			</Button>
		</Form>
	);
};
