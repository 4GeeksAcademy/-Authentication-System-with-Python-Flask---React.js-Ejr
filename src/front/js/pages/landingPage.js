import React, { useContext } from "react";
import { Button, Form, FormControl } from 'react-bootstrap';
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const LandingPage = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="bg-image text-center d-flex flex-column justify-content-center align-items-center" style={{height: "85vh"}}>
			<h1 className="text-light">Welcome to the Travel Site!</h1>
			<Form className="w-50">
				<FormControl type="text" placeholder="Search your destination..." className="mr-sm-2" />
				<Button variant="outline-light">Search</Button>
			</Form>
		</div>
	);
};
