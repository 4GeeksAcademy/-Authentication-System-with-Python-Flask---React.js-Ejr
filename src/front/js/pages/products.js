import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Globalcard } from "../component/globalcard";
import { Context } from "../store/appContext";

export const Productos = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<p className="h2 mx-auto py-4 font-weight-light">Productos disponibles</p>
			<div className="whole_content">
				<div className="container1">
					<Globalcard />
					<Globalcard />
					<Globalcard />
					<Globalcard />
					<Globalcard />
				</div>
				<div className="container2">
					<Globalcard />
					<Globalcard />
					<Globalcard />
					<Globalcard />
					<Globalcard />
				</div>
			</div>
		</>
	);
};
