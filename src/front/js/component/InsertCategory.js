import React, { Component, useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
export const FormProvider = () => {
	const [id_Provider, setId_Provider] = useState("");
	const [name_Provider, setName_Provider] = useState("");
	const [email_Provider_Details, setEmail_Provider_Details] = useState("");
	const [phone_Provider_Details, setPhone_Provider_Details] = useState("");
	const [payment_Type_Provider_Details, setPayment_Type_Provider_Details] = useState("");
	const [address_Provider_Details, setAddress_Provider_Details] = useState("");

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
						<Col sm="12" md="6">
							<Form>
								<Form.Row>
									<Form.Group as={Col}>
										<Form.Label>Nombre:</Form.Label>
										<Form.Control size="sm" type="text" placeholder="" />
										<Form.Text className="text-muted" />
									</Form.Group>
								</Form.Row>
								<Button size="sm" variant="primary" type="submit">
									Submit
								</Button>
							</Form>
						</Col>
					</Row>
				</Card>
			</div>
		)
	);
};
