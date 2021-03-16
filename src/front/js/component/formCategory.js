import React, { Component, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

export const FormCategory = () => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		actions.loadCategory();
	});

	return (
		!!store.category && (
			<div>
				<Row>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Id Categoria</th>
								<th>Nombre</th>
								<th>Descripción</th>
								<th>Modificar</th>
								<th>Eliminar</th>
							</tr>
						</thead>
						<tbody>
							{store.providers.map((item, i) => {
								return (
									<tr key={i}>
										<td>{i + 1}</td>
										<td>{store.category[i].id_Category}</td>
										<td>{store.category[i].name_Category}</td>
										<td>{store.category[i].description_Category}</td>
										<td>{store.category[i].active_Product}</td>
										<td>
											<i className="fas fa-pen" />
										</td>
										<td>
											<i className="fas fa-trash-alt" />
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</Row>
			</div>
		)
	);
};
