import React from "react";
import { ProductsByProviderReport } from "../component/productsByProviderReport";
import { Card, Accordion, Button, Badge, Link, Col, Row } from "react-bootstrap";

export const Reports = () => {
	return (
		<Col className="reportsContainer container-fluid">
			<Badge className="titleReportes container fluid" variant="primary">
				<h1>REPORTES</h1>
			</Badge>
			<Col>
				<ProductsByProviderReport />
			</Col>
		</Col>
	);
};
