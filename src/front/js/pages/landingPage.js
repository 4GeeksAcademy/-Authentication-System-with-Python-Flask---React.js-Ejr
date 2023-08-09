import React, { useContext } from "react";
import { Button, Form, FormControl } from 'react-bootstrap';
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const LandingPage = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="welcome_text bg-image">
			<Form className="">
				<FormControl type="text" placeholder="Search your destination..." className="searchbar" />
			</Form>
			    <Button className="searchbutton">Search</Button>
				<h1 className="">Welcome to the Travel Site!</h1>
		</div>
	);
};
