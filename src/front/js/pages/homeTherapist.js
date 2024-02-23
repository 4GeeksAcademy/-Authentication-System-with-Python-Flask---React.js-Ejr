import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link} from "react-router-dom";


export const HomeTherapist = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 homepsico">
			<p>
                <Link to="/patients">Gestion de pacientes</Link>
            </p>
			<p>
                <Link to="/scheduling">Manejo de agenda</Link>
            </p>
			<p>
                <Link to="/appointment_scheduling">Asignacion de turnos</Link>
            </p>
			<p>
                <Link to="/income_control">Control de ingresos</Link>
            </p>
			<p>
                <Link to="/inbox">Bandeja de entrada</Link>
            </p>
		</div>
		
	);
};
