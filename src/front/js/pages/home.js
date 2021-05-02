import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpeg";
import "../../styles/home.scss";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1 />
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">{store.message || ""}</div>
			<span> Busc@ Pymes </span>
			<div>
				<ul>
					<li>
						<Link to="alajuela">Alajuela</Link>
					</li>
					<li>
						<Link to="cartago">Cartago</Link>
					</li>
					<li>
						<Link to="sanjose">San José</Link>
					</li>
					<li>
						<Link to="limon">Limón</Link>
					</li>
					<li>
						<Link to="puntarenas">Puntarenas</Link>
					</li>
					<li>
						<Link to="guanacaste">Guanacaste</Link>
					</li>
					<li>
						<Link to="heredia">Heredia</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};
