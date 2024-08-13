import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/search.css";
import { RouteCard } from "../component/searchRouteCard.jsx"
import { Navbarsearch } from "../component/navbar-search.jsx";
import { LoginRegister } from "../component/registerModal.jsx";

export const Search = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
		<Navbarsearch />
		<LoginRegister />
		<h6 className="mt-5 mb-3" style={{marginLeft:'11rem'}}>Se han encontrado <b>{store.itineraryData.length}</b> itinerarios:</h6>
		<div className="row justify-content-center mb-4 gx-0">
			{store.itineraryData && store.itineraryData.length > 0 ? (
				store.itineraryData.map((itinerary, index) => (
						<div className="col-12 col-md-5 d-flex justify-content-center mb-4" key={index}>
							<RouteCard id={index} title={itinerary.title} img={itinerary.img} desc={itinerary.desc} score={itinerary.score} />
						</div>
					))
				) : (
					<h1>No se ha encontrado ninguna ruta</h1>
				)
			}
		</div>
		
		</>
	);
};
