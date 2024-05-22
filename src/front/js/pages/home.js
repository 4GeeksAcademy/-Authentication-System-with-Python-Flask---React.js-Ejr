import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { CardVehicles } from "../component/cardvehicles";
import { FiltroAsientos } from "../component/filtroasientos";
import { FiltroPrecio } from "../component/filtroprecio";
import { useNavigate} from "react-router-dom";
import swal from 'sweetalert';

export const Home = () => {
	const { store, actions } = useContext(Context);
	const { images } = useContext((Context));
	const navigate = useNavigate();
	const [filtroPrecio, setFiltroPrecio] = useState(null);
	const [filtroAsientos, setFiltroAsientos] = useState(null);

	const filtrarPorPrecio = (vehicle) => {
		if (filtroPrecio === null) {
			return true;
		}
		return (vehicle.precio > filtroPrecio.min && vehicle.precio <= filtroPrecio.max);

	}

	const filtrarPorAsientos = (vehicle) => {
		if (filtroAsientos === null) {
			return true;
		} 
		return vehicle.asientos >= filtroAsientos;
		
	}

	useEffect(() => {
		actions.getVehicles();
	}, []);

	useEffect(() => {
	   const query = new URLSearchParams(window.location.search);
   
	   if (query.get("success")) {
		 swal("Pago realizado con éxito",  "En breve recibirá un correo de confirmación", "success");
		 navigate("/");
	   }
	   if (query.get("canceled")) {
		 swal("Orden cancelada", "Por favor inténtelo nuevamente", "error")
		 navigate("/");
	   }
	 }, []); 

	return (
		<>
		<div className="d-flex justify-content-center">
			<div className="me-4">
				<FiltroAsientos
					setFiltroAsientos={setFiltroAsientos}
				/>
			</div>
			<div className="me-5">
				<FiltroPrecio
					setFiltroPrecio={setFiltroPrecio}
				/>
			</div>
		</div>
		<div className="footer-view text-danger vehicles mb-5 mt-2 justify-content-center bg-light">
			<div className="container">
				<div className="row Map Cards text-dark d-flex justify-content-center">
					{store.vehicles.filter(filtrarPorAsientos).filter(filtrarPorPrecio).map((vehicle) => {
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