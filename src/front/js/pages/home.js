import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { homeSlideA, homeSlideB, homeSlideC, serviceDiseno, serviceMarketing, serviceIt } from "../../img/image.js";
import "../../styles/home.scss";
import "../../styles/index.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!</h1>
			<p>
				<img
					src={homeSlideA}
					width="100%"
					height="450px"
					className="d-inline-block align-top mt-3 "
					alt="Home Slide"
				/>
			</p>
			<div className="alert alert-info">{store.message || "Loading message from the backend..."}</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://github.com/4GeeksAcademy/react-flask-hello/tree/95e0540bd1422249c3004f149825285118594325/docs">
					Read documentation
				</a>
			</p>
		</div>
	);
};
