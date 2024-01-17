import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="home-container">
			<div className="bg position-relative text-center">
				<div className="overlay"></div>
				<div className="jumbo">
				<h1 className="display-5 fw-bold">Ever wondered what to pack in February? How many days to spend? Which museum to visit?</h1>
				<div className="col-lg-6 mx-auto">
					<h2 className="lead mb-4">DioDio's got you covered!</h2>
				</div>
				</div>
			</div>
		</div>
	);
};
