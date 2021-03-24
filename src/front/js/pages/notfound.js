import React from "react";
import { Link } from "react-router-dom";
import "../styles/notfound.css";
// import { Context } from "../store/appContext";

export const NotFound = () => {
	// const { store, actions } = useContext(Context);

	return (
		<div className="content py-3">
			<div className="row align-items-center">
				<div className="col-3" />
				<div className="col-4">
					<h1 className="display-1">Error 404</h1>
					<h2 className="display-4">¡Por poquiiiiiiiito!</h2>
					<p>\n Para la próxima intenta arriba y cruzado, o mejor aún, visita nuestra página principal</p>
					<Link to="/">
						<button type="button" id="homeBtn" className="btn">
							Ir al Home
						</button>
					</Link>
				</div>
				<div className="col-2">
					<img
						src="https://amaranth-quail-umli66zm.ws-us03.gitpod.io/files/download/?id=edb15856-7fce-4d0a-be6f-3e5068acf606"
						alt="Sad Player"
						height="450 px"
					/>
				</div>
				<div className="col-3" />
			</div>
		</div>
	);
};
