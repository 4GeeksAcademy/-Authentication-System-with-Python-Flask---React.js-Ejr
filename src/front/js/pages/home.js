import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Jumbotron } from "../component/jumbotronhome";
import { Intro } from "../component/introhome";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="home">
			<Jumbotron />
			<div className="container">
				<Intro />
			</div>
		</div>
	);
};
