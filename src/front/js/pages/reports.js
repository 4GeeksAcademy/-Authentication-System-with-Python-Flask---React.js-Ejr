import React from "react";
import { ProviderReport } from "../component/reportProvider";
import { Card, Accordion, Button, Badge, Link, Col, Row } from "react-bootstrap";

export const Reports = () => {
	return (
		<Col className="reportsContainer container-fluid">
			<Badge className="titleReportes container fluid" variant="primary">
				<h1>REPORTES</h1>
			</Badge>
			<Col>
				<ProviderReport />
				<ProviderReport />
				<ProviderReport />
				<ProviderReport />
			</Col>
		</Col>
	);
};
