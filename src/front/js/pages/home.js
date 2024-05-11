import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { CardVehicles } from "../component/cardvehicles.js";
import { Jumbotron } from "../component/jumbotron";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const Home = () => {

	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getVehicles()
	}, [])

	return (
		<>
		<div className="text-danger vehicles ms-5 mt-2 mb-5 mt-4">
			<Jumbotron />
			<div className="Map Cards text-dark d-flex" style={{ overflowX: "scroll" }}>
				{store.vehicles.map((vehicle) => {
					//   console.log(planet);
					return (
						<CardVehicles vehicle={vehicle} key={vehicle} />
					)
					})
				}
			</div>
		</div>

		<div className="text-danger vehicles ms-5 mt-2 mb-5">
			<div className="Map Cards text-dark d-flex" style={{ overflowX: "scroll" }}>
				{store.vehicles.map((vehicle) => {
					//   console.log(planet);
					return (
						<CardVehicles vehicle={vehicle} key={vehicle} />
					)
					})
				}
			</div>
		</div>

		<div className="text-danger vehicles ms-5 mt-2 mb-5">
			<div className="Map Cards text-dark d-flex" style={{ overflowX: "scroll" }}>
				{store.vehicles.map((vehicle) => {
					//   console.log(planet);
					return (
						<CardVehicles vehicle={vehicle} key={vehicle} />
					)
					})
				}
			</div>
		</div>
		</>
	);
};
