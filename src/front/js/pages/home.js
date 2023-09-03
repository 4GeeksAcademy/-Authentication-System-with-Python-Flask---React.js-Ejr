import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import homeImageUrl from "../../img/home.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="mt-5">
			<div className="card bg-dark text-white">
				<img src={homeImageUrl} className="card-img img-fluid mw-100" alt="Regístrate ahora"></img>
				<div className="card-img-overlay mx-5 float-left flex-row align-items-center">
					<div className="heading-group">
						<h1>Administra tus Eventos Deportivos</h1>
						<p className="heading-3 text-light">Organiza tus torneos en un solo click</p>
					</div>
					<div className="divider divider-default"></div>
					<p className="heading-5">Utiliza nuestra tecnología a tu favor. Estamos listos para dar a tus eventos una ventaja competitiva en la organización.</p>
					<div className="group-md button-group">
						<Link to="/planes">
							<span className="btn btn-primary btn-lg m-2" href="#" role="button">
								VER PLANES
							</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
