import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/search.css";
import { RouteCard } from "../component/searchRouteCard.jsx"

export const Search = () => {
	const { store, actions } = useContext(Context);

	const routeData = {title: 'Título de itinerario',
		img: 'https://www.spain.info/.content/imagenes/cabeceras-grandes/andalucia/vistas-cordoba-s158982617.jpg',
		desc: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) hacer un libro de textos especimen.',
		score: '4/5'
	}
	return (
		<>
		<h6 className="mt-5 mb-3" style={{marginLeft:'11rem'}}>Se han encontrado <b>6</b> itinerarios:</h6>
		<div className="row justify-content-center mb-4 gx-0">
			<div className="col-12 col-md-5 d-flex justify-content-center">
				<RouteCard title={routeData.title} img={routeData.img} desc={routeData.desc} score={routeData.score} />
			</div>
			<div className="col-12 col-md-5 d-flex justify-content-center">
				<RouteCard title={routeData.title} img={routeData.img} desc={routeData.desc} score={routeData.score} />
			</div>
			<div className="col-12 col-md-5 d-flex justify-content-center">
				<RouteCard title={routeData.title} img={routeData.img} desc={routeData.desc} score={routeData.score} />
			</div>
			<div className="col-12 col-md-5 d-flex justify-content-center">
				<RouteCard title={routeData.title} img={routeData.img} desc={routeData.desc} score={routeData.score} />
			</div>
			<div className="col-12 col-md-5 d-flex justify-content-center">
				<RouteCard title={routeData.title} img={routeData.img} desc={routeData.desc} score={routeData.score} />
			</div>
			<div className="col-12 col-md-5 d-flex justify-content-center">
				<RouteCard title={routeData.title} img={routeData.img} desc={routeData.desc} score={routeData.score} />
			</div>
		</div>
		
		</>
	);
};
