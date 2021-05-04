import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import heroCustom from "../../img/hero-custom.jpeg";
import "../../styles/home.scss";
import { Link } from "react-router-dom";
import ProvinceCard from "../component/ProvinceCard";
import cartagoImg from "../../img/Cartago.jpg";
import alajuelaImg from "../../img/Alajuela.jpg";
import guanacasteImg from "../../img/Guanacaste.jpg";
import herediaImg from "../../img/Heredia.jpg";
import limonImg from "../../img/Limon.jpg";
import puntarenasImg from "../../img/Puntarenas.jpg";
import sanjoseImg from "../../img/SanJose.jpg";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1 />
			<div className="">
				<img src={heroCustom} className="img-fluid" />
			</div>
			<div className="alert alert-info">{store.message || ""}</div>
			<span>Busc@PYMES</span>
			<div className="text-center">
				<ul className="text-center">
					<li>
						<ProvinceCard route="alajuela" provinceName="Alajuela" imagen={alajuelaImg} />
					</li>
					<li>
						<ProvinceCard route="cartago" provinceName="Cartago" imagen={cartagoImg} />
					</li>
					<li>
						<ProvinceCard route="guanacaste" provinceName="Guanacaste" imagen={guanacasteImg} />
					</li>

					<li>
						<ProvinceCard route="heredia" provinceName="Heredia" imagen={herediaImg} />
					</li>

					<li>
						<ProvinceCard route="limon" provinceName="Limón" imagen={limonImg} />
					</li>
					<li>
						<ProvinceCard route="puntarenas" provinceName="Puntarenas" imagen={puntarenasImg} />
					</li>

					<li>
						<ProvinceCard route="sanjose" provinceName="San José" imagen={sanjoseImg} />
					</li>
				</ul>
			</div>
		</div>
	);
};
