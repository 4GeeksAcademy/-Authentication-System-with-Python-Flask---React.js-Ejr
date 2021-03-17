import React, { Component, useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

export const FormProvider = () => {
	const [id_Provider, setId_Provider] = useState("");
	const [name_Provider, setName_Provider] = useState("");
	const [email_Provider_Details, setEmail_Provider_Details] = useState("");
	const [phone_Provider_Details, setPhone_Provider_Details] = useState("");
	const [payment_Type_Provider_Details, setPayment_Type_Provider_Details] = useState("");
	const [address_Provider_Details, setAddress_Provider_Details] = useState("");

	const update = data => {
		console.log(data);
		setId_Provider(data.id_Provider);
		setName_Provider(data.name_Provider);
		setEmail_Provider_Details(data.properties[0].email_Provider_Details);
		setPayment_Type_Provider_Details(data.properties[0].payment_Type_Provider_Details);
		setPhone_Provider_Details(data.properties[0].phone_Provider_Details);
		setAddress_Provider_Details(data.properties[0].address_Provider_Details);
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (
			id_Provider === "" ||
			name_Provider === "" ||
			email_Provider_Details === "" ||
			phone_Provider_Details === "" ||
			payment_Type_Provider_Details === "" ||
			address_Provider_Details === ""
		) {
			alert("Existen campos vacios");
		} else {
			const data = {
				id_Provider: id_Provider,
				name_Provider: name_Provider,
				email_Provider_Details: email_Provider_Details,
				phone_Provider_Details: phone_Provider_Details,
				payment_Type_Provider_Details: payment_Type_Provider_Details,
				address_Provider_Details: address_Provider_Details,
				active_Provider: "activo"
			};
			actions.insertData(data);
		}
	};

	const { store, actions } = useContext(Context);
	useEffect(() => {
		actions.loadProviders();
	}, []);

	return (
		!!store.providers && (
			<div>
				<Card body>
					<Row>
						<Col sm="12" md="6" className="image">
							<Image src="https://via.placeholder.com/350x350" rounded />
						</Col>
						<Col sm="12" md="6">
							<Form onSubmit={e => handleSubmit(e)}>
								<Form.Row>
									<Form.Group as={Col}>
										<Form.Label>Cedula Juridica o Fisica:</Form.Label>
										<Form.Control
											size="sm"
											type="text"
											placeholder=""
											value={id_Provider}
											onChange={e => setId_Provider(e.target.value)}
										/>
										<Form.Text className="text-muted" />
									</Form.Group>
									<Form.Group as={Col}>
										<Form.Label>Nombre o Razon Social:</Form.Label>
										<Form.Control
											size="sm"
											type="text"
											placeholder=""
											value={name_Provider}
											onChange={e => setName_Provider(e.target.value)}
										/>
										<Form.Text className="text-muted" />
									</Form.Group>
								</Form.Row>

								<Form.Group controlId="formBasicEmail">
									<Form.Label>Correo Electronico:</Form.Label>
									<Form.Control
										size="sm"
										type="email"
										placeholder="Enter email"
										value={email_Provider_Details}
										onChange={e => setEmail_Provider_Details(e.target.value)}
									/>
								</Form.Group>
								<Form.Row>
									<Form.Group as={Col} controlId="exampleForm.ControlSelect1">
										<Form.Label>Tipo de Pago</Form.Label>
										<Form.Control
											size="sm"
											as="select"
											value={payment_Type_Provider_Details}
											onChange={e => setPayment_Type_Provider_Details(e.target.value)}>
											<option>Transferencia Bancaria</option>
											<option>Pago en Efectivo</option>
											<option>Pago con Cheque</option>
										</Form.Control>
									</Form.Group>
									<Form.Group as={Col}>
										<Form.Label># Telefonico:</Form.Label>
										<Form.Control
											size="sm"
											type="text"
											placeholder=""
											value={phone_Provider_Details}
											onChange={e => setPhone_Provider_Details(e.target.value)}
										/>
										<Form.Text className="text-muted" />
									</Form.Group>
								</Form.Row>

								<Form.Group controlId="exampleForm.ControlTextarea1">
									<Form.Label>Direccion:</Form.Label>
									<Form.Control
										size="sm"
										as="textarea"
										value={address_Provider_Details}
										rows={3}
										onChange={e => setAddress_Provider_Details(e.target.value)}
									/>
								</Form.Group>

								<Button size="sm" variant="primary" type="submit">
									Submit
								</Button>
								<Button
									size="sm"
									variant="primary"
									type="button"
									onClick={() => {
										actions.addFavorite(item);
									}}>
									Update
								</Button>
							</Form>
						</Col>
					</Row>
				</Card>

				<Row>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Identificacion</th>
								<th>Nombre</th>
								<th>Email</th>
								<th>Pago</th>
								<th>Telefono</th>
								<th>Modificar</th>
								<th>Eliminar</th>
							</tr>
						</thead>
						<tbody>
							{store.providers.map((item, i) => {
								return (
									<tr key={i}>
										<td>{i + 1}</td>
										<td>{store.providers[i].id_Provider}</td>
										<td>{store.providers[i].name_Provider}</td>
										<td>{item.properties[0].email_Provider_Details}</td>
										<td>{item.properties[0].payment_Type_Provider_Details}</td>
										<td>{item.properties[0].phone_Provider_Details}</td>
										<td>
											<i
												className="fas fa-pen"
												onClick={() => {
													update(item);
												}}
											/>
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
