import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { CardVehicles } from "../component/cardvehicles";
import { useNavigate} from "react-router-dom";
import swal from 'sweetalert';
import "../../styles/home.css";

export const Home = () => {
	const { store } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
	   const query = new URLSearchParams(window.location.search);
   
	   if (query.get("success")) {
		 swal("Pago realizado con éxito",  "En breve recibira un correo de confirmación", "success");
		 navigate("/");
	   }
	   if (query.get("canceled")) {
		 swal("Orden cancelada", "Por favor intentelo nuevamente", "error")
		 navigate("/");
	   }
	 }, []); 

	return (
		<>
		<div className="footer-view text-danger vehicles mt-2 mb-5 mt-4 justify-content-center bg-light">
			<div className="container">
				<div className="row Map Cards text-dark d-flex justify-content-center">
					{store.vehicles.map((vehicle) => {
						return (
							<CardVehicles vehicle={vehicle} key={vehicle.id} />
						)
						})
					}
				</div>
			</div>
		</div>
		</>
	);
};