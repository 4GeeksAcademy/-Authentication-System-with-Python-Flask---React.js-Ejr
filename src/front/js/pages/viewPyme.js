import React from "react";
//import React, { useContext, useEffect } from "react";
import "../../styles/home.scss";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
//import { Context } from "../store/appContext";
//import { useParams } from "react-router-dom";
import { Mapa2 } from "../component/mapa";

//const PymeView = ({ pymes })
const PymeProfile = () => {
	return (
		<>
			<img
				className="card-img-top rounded-right shadow"
				style={{ width: "100%", height: "300px", margin: "0 auto" }}
				src="https://fondosmil.com/fondo/74500.jpg"
				alt="Card image cap"
			/>
			<div className="container">
				<div className="row" style={{ marginBottom: "37px", marginTop: "68px" }}>
					<h1 className="font-weight-bolder" style={{ paddingLeft: "13px" }}>
						Chachagua Rainforest Eco Lodge
					</h1>
				</div>
				<div className="d-flex mb-3">
					<div className="d-inline mr-3">
						<i className="fas fa-2x fa-map-marked-alt" />
					</div>
					<div className="d-inline font-italic">
						<h3>Alajuela, Costa Rica</h3>
					</div>
				</div>
				<div className="row d-flex">
					<div className="col-8">
						<p>
							Chachagua Rainforest Hotel and Ecolodge se encuentra en un bello paraíso selvático cerca del
							Volcán Arenal. Aclamado por las publicaciones de viajes de confianza, somos el principal
							destino de bosque tropical en Costa Rica. Desde el momento en que llege será transportado
							hacia el mágico y exquisito encanto de nuestro singular complejo en el bosque.
						</p>
						<p>
							En nuestro hotel del bosque tropical en Costa Rica se le garantiza que experimentará
							servicio de primera clase, habitaciones bellas y bien equipados que se mezclan con la
							naturaleza, y gastronomía de alto nivel con productos agrícolas de nuestras propias huertas
							orgánicas.
						</p>
						<p>
							Eco-aventuras excepcionales colocadas en impresionantes entornos son aptas para todas las
							edades y las habilidades.
						</p>
					</div>
					<div className="col-4" />
					<div>
						<Mapa2 />
					</div>
				</div>
				<div className="row" style={{ paddingLeft: "14px" }}>
					<p>
						Nuestro Tour de Avistamiento de Aves del Bosque Lluvioso está diseñado para presentarle a la
						increíble flora y fauna de nuestro paraíso tropical en el Chachagua Rainforest Hotel and
						Ecolodge. Al salir de nuestra área de recepción, ya sea a las 6:00 a.m. o a las 4:00 p.m.,
						nuestro tour se aprovecha de los momentos en que el bosque y sus habitantes se estén despertando
						para el día o preparándose para la noche.
					</p>
				</div>
				<div className="row mt-3 mb-3" style={{ paddingLeft: "13px" }}>
					<h3>Contáctenos:</h3>
				</div>
				<div className="pl-3">
					<div className="row">
						<div className="d-flex mb-3">
							<div className="d-inline mr-3">
								<i className="fas fa-phone" />
							</div>
							<div className="d-inline font-italic">
								<h5>+(506) 4000-2026</h5>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="d-flex mb-3">
							<div className="d-inline mr-3">
								<i className="far fa-envelope" />
							</div>
							<div className="d-inline font-italic">
								<h5>info@chachaguarainforest.com</h5>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="d-flex mb-3">
							<div className="d-inline mr-3">
								<i className="fas fa-clock" />
							</div>
							<div className="d-inline font-italic">
								<h5>6:00am to 10:00pm</h5>
							</div>
						</div>
					</div>
				</div>
				<div className="embed-responsive embed-responsive-16by9">
					<iframe
						className="embed-responsive-item"
						src="https://www.youtube.com/embed/pHBh5DNQ1cw?rel=0"
						allowFullScreen
					/>
				</div>
			</div>
		</>
	);
};

/*export const Profile = () => {
	const { entity, id } = useParams();
	const storeContext = useContext(Context);
	const {
		store: { characterEntity, planetsEntity }
	} = storeContext;

	useEffect(
		() => {
			storeContext.actions.fetchEntity(entity, id);
		},
		[entity, id]
	);*/
export const PymeView = () => {
	return (
		<div className="container">
			<PymeProfile />
		</div>
	);
};
//};

/*PlanetProfile.propTypes = {
	planet: PropTypes.object
};

PersonProfile.propTypes = {
	person: PropTypes.object
};
*/
