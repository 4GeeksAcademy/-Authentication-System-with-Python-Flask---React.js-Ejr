import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="d-flex justify-content-around">
			<div>
				<div id="globo-info" className="d-flex">
					<div id="logo-casa">
						imagen
					</div>
					<div id="info-casa">
					<p>texto, información</p>
						<button id="boton-casa">Ir a casa</button>
					</div>
				</div>
				<div id="globo-info" className="d-flex">
					<div id="logo-casa">
						imagen
					</div>
					<div  id="info-casa">
						<p>texto, información</p>
						<button id="boton-casa">Ir a casa</button>

					</div>
				</div>
				<div id="globo-info" className="d-flex">
					<div id="logo-casa">
						imagen
					</div>
					<div id="info-casa">
					<p>texto, información</p>
						<button id="boton-casa">Ir a casa</button>
					</div>
				</div>
			</div>
			<div id="maps">
				<iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d75352.4489663738!2d-70.66174117923224!3d-33.419614353711644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1safex!5e0!3m2!1ses-419!2scl!4v1662669729294!5m2!1ses-419!2scl" width="500" height="600" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
			</div>
		</div>

	);
};
