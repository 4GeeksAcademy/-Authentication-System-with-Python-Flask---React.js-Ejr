import React from "react";
//import React, { useContext, useEffect } from "react";
import "../../styles/home.scss";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
//import { Context } from "../store/appContext";
//import { useParams } from "react-router-dom";
import { Link, animateScroll as scroll } from "react-scroll";
import { Review } from "../component/review";
import { Comment } from "../component/comment";

//const PymeView = ({ pymes })
const PymeProfile = () => {
	return (
		<>
			<div>
				<img
					className="card-img-top rounded-right shadow mt-3"
					style={{ width: "100%", height: "400px", margin: "0 auto" }}
					src="https://sfo2.digitaloceanspaces.com/elpaiscr/2021/02/Volcan-Arenal..jpeg"
					alt="Card image cap"
				/>
			</div>
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
					<div className="col-sm-12 col-md-8">
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
					<div className="col-sm-12 col-md-4">
						<img
							className="card-img-top"
							style={{ height: "230px", margin: "0 auto" }}
							src="https://images.squarespace-cdn.com/content/v1/555cbc7ee4b059e095f39179/1488390070674-CXYQU17QO2DSEV4TJ5V5/ke17ZwdGBToddI8pDm48kMxP3zelORv554bfrCgYiuNZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIO3p9JfP_jmAUPHyNnkpZX7wqTYQ8n-Q3yghIWqr7I-w/map-la-fortuna-arenal-costa-rica.jpg"
							alt="Card image cap"
						/>
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
					<div className="row">
						<div className="d-flex mb-3">
							<div className="d-inline mr-3">
								<i className="fas fa-globe" />
							</div>
							<div className="d-inline font-italic">
								<h5>Visitanos en nuetra página</h5>
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

export const PymeView = () => {
	return (
		<div>
			<div className="container">
				<PymeProfile />
			</div>

			<hr />
			<div style={{ background: "#DCDCDC", width: "100%", height: "auto" }}>
				<Review />
			</div>
			<div
				style={{
					background: "#DCDCDC",

					height: "auto",
					paddingBottom: "50px"
				}}>
				<Comment />
			</div>
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
