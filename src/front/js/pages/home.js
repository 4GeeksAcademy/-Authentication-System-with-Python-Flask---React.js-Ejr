import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { CardVehicles } from "../component/cardvehicles.js";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {

	const { store, actions } = useContext(Context);

	// useEffect(() => {
	// 	actions.getVehicles()
	// }, [])

	return (
		<div className="text-danger vehicles ms-5 mt-2 mb-5">
					<div className="Map Cards text-dark" style={{ overflowX: "scroll" }}>
					{store.vehicles.map((vehicle) => {
							//   console.log(planet);
							return (
								<CardVehicles vehicle={vehicle} key={vehicle.id} />
							)
						})
						}
					<CardVehicles/>
					</div>
				</div>


		// <div className="text-center mt-5">
		// 	<h1>Hello Rigo!!</h1>
		// 	<p>0
		// 		<img src={rigoImageUrl} />
		// 	</p>
		// 	{/* <div className="alert alert-info">
		// 		{store.message || "Loading message from the backend (make sure your python backend is running)..."}
		// 	</div> */}
		// 	<p>
		// 		This boilerplate comes with lots of documentation:{" "}
		// 		<a href="https://start.4geeksacademy.com/starters/react-flask">
		// 			Read documentation
		// 		</a>
		// 	</p>
		// </div>
	);
};
