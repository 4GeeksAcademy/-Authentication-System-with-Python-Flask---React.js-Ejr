import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Table } from "react-bootstrap";

export function Modal1() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button variant="btn btn-outline-success float-right" onClick={handleShow}>
				Ver detalles
			</Button>
			<button type="button" className="btn btn-outline-success float-right">
				<i className="fas fa-cart-arrow-down" />
			</button>

			<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>
						<img
							src="https://www.cellshop.com/52067-large_default/desodorante-rexona-women-bamboo-48hs-150ml.jpg"
							className="card-img-top"
							alt="..."
						/>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Table responsive="sm">
						<thead>
							<tr>
								<th>Nombre del producto:</th>
								<th>Desodorante Rexona</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Supermercado:</td>
								<td>Palí</td>
							</tr>
							<tr>
								<td>Pasillo:</td>
								<td>#8</td>
							</tr>
							<tr>
								<td>Unidades:</td>
								<td>150 mL</td>
							</tr>
							<tr>
								<td>Categoría:</td>
								<td>Cuidado personal</td>
							</tr>
						</tbody>
					</Table>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cerrar
					</Button>
					<Link to={"/products"}>
						<Button variant="warning">Regresar a listado de productos</Button>
					</Link>
				</Modal.Footer>
			</Modal>
		</>
	);
}
