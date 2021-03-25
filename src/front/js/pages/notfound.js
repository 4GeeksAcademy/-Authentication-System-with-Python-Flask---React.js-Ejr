import React from "react";
import { Link } from "react-router-dom";
import "../styles/notfound.css";
import SadPlayer from "../../img/favpng_marcel-sabitzer-rb-leipzig-jersey-soccer-player-clip-art.png";
// import { Context } from "../store/appContext";

export const NotFound = () => {
	// const { store, actions } = useContext(Context);

	return (
		<div className="yellowBG content py-3">
			<div className="row align-items-center">
				<div className="col-3" />
				<div className="col-4">
					<h1 className="display-1 dGreenText mb-0">Error 404</h1>
					<h2 className="display-4 lGreenText mt-0">¡Por poquiiito!</h2>

					<p className="font-weight-bold font-italic mt-3">
						Para la próxima intenta arriba y cruzado, o mejor aún, visita nuestra página principal.
					</p>
					<Link to="/">
						<button type="button" className="notFound btn my-4">
							Ir al Home
						</button>
					</Link>
				</div>
				<div className="col-2">
					<img src={SadPlayer} alt="Sad Player" height="450 px" />
				</div>
				<div className="col-3" />
			</div>
		</div>
	);
};
