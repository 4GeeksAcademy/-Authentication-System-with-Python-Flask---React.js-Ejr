import React from "react";
import { Link } from "react-router-dom";
// import { Context } from "../store/appContext";

export const NotFound = () => {
	// const { store, actions } = useContext(Context);

	return (
		<div className="content">
			<div className="row align-items-center">
				<div className="col-3" />
				<div className="col-3">
					<h1>¡Por poquiiiiiiiito!</h1>
					<p>Para la proxima intenta arriba y cruzado, o mejor aun, visita nuestro sitio</p>
					<Link to="/home">
						<button type="button" className="btn btn-warning">
							Ir al Home
						</button>
					</Link>
				</div>
				<div className="col-3">
					<img
						src="https://tomato-tiglon-43yhxp8c.ws-us03.gitpod.io/files/download/?id=48def608-b2ef-42d0-a189-e681375df998"
						alt="Sad Player"
						height="450 px"
					/>
				</div>
				<div className="col-3" />
			</div>
		</div>
	);
};
