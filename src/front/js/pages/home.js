import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Container } from "react-bootstrap";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<Container>
			{/* <div className="bg-color text-center">
				<h1>Hello Rigo!</h1>
				<p>
					<img src={rigoImageUrl} />
				</p>
				<div className="alert alert-info">{store.message || "Loading message from the backend..."}</div>
				<p>
					This boilerplate comes with lots of documentation:{" "}
					<a href="https://github.com/4GeeksAcademy/react-flask-hello/tree/95e0540bd1422249c3004f149825285118594325/docs">
						Read documentation
					</a>
				</p>
			</div> */}

			<h1>Hola</h1>
		</Container>
	);
};
