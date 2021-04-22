import React, { useState, useEffect, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Link, useParams, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";

import { element } from "prop-types";
import { Container, Col, Image } from "react-bootstrap";

export const ManageOrder = () => {
	// let { value } = useParams();
	const history = useHistory();
	const { store, actions } = useContext(Context);
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		// actions.getAllOrders(value);
		//actions.getToken();
		//if (!store.login) {
		//	history.push("/");
		//}
	}, []);

	const goBack = () => {
		history.goBack();
	};
	console.log("mi store", store);

	const ViewDataColumn = () => {
		return <Button type="button" icon="pi pi-search" className="p-button-secondary" />;
	};

	return (
		<Container>
			<Container className="border rounded">
				<Row>
					<Col className="text-center">
						<h1>&Oacute;RDENES</h1>
					</Col>
					<br />
				</Row>
			</Container>
			<div>
				<Container className="card">
					<DataTable value={store.orders}>
						<Column
							header="Ver"
							body={ViewDataColumn}
							headerStyle={{ width: "8em", textAlign: "center" }}
							bodyStyle={{ textAlign: "center", overflow: "visible" }}
						/>
						<Column field="OrderID" header="# Orden" sortable />
						<Column field="Quantity" header="Cant de Productos" sortable />
						<Column field="State" header="Estado" sortable />
					</DataTable>
				</Container>
			</div>
			<br />
			<Link to="/">
				<Button variant="primary">Ir al inicio</Button>
			</Link>
		</Container>
	);
};
