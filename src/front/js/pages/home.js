import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Container } from "react-bootstrap";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<Container>
			<h1>Hola</h1>
		</Container>
	);
};
