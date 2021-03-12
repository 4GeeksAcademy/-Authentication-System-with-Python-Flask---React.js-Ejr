import React from "react";
import PropTypes from "prop-types";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Link from "react-router-dom";

export const ProductRegister = () => {
	return (
		<Jumbotron size="sm">
			<h1>Nuevo producto</h1>
			<Card size="sm" body>
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
					<Form.Group as={Col}>
						<Form.Control size="sm" type="text" placeholder="Presentación" />
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Control size="sm" type="text" placeholder="Código" />
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Control size="sm" type="text" placeholder="Cabys" />
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Control size="sm" type="text" placeholder="Proveedor" />
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Control size="sm" type="text" placeholder="Impuesto" />
					</Form.Group>
				</Form>
				<Button size="sm" variant="success">
					Guardar
				</Button>
				<Button size="sm" variant="danger">
					Eliminar
				</Button>
			</Card>
		</Jumbotron>
	);
};
