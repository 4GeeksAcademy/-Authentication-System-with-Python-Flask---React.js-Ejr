import React from "react";
import { ProviderReport } from "../component/reportProvider";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Link from "react-router-dom";

export const Reports = () => {
	return (
		<div>
			<Card>
				<Badge variant="primary">
					<h1>REPORTES</h1>
				</Badge>
			</Card>
			<ProviderReport />
			<ProviderReport />
			<ProviderReport />
			<ProviderReport />
		</div>
	);
};
