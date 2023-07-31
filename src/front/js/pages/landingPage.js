import React, { useContext } from "react";
import { Button, Form } from 'react-bootstrap';
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const LandingPage = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Welcome to the Travel Site!</h1>
			<Form>
				<Button variant="primary">Search</Button>
			</Form>
		</div>
	);
};
