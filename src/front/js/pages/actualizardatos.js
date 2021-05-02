import React from "react";
import "../../styles/demo.scss";
import { Home } from "./home";

export const Actualizardatos = actualizardatos => {
	return (
		<div>
			<div className="form-provincia">
				<label form="sel1">Provincia:</label>
				<select className="form-control" id="sel1">
					<option>Alajuela</option>
					<option>Heredia</option>
					<option>Cartago</option>
					<option>San José</option>
					<option>Guanacaste</option>
					<option>Limón</option>
					<option>Puntarenas</option>
				</select>
			</div>
			<div className="form-Cantón">
				<label form="usr">Cantón:</label>
				<input type="text" className="form-control" id="usr" />
			</div>
			<div className="form-Name">
				<label form="usr">Nombre Pymes:</label>
				<input type="text" className="form-control" id="usr" />
			</div>
			<div className="form-servicios">
				<label form="sel1">Servicios:</label>
				<select className="form-control" id="sel1">
					<option>Servicios</option>
					<option>Comida</option>
					<option>Ropa</option>
					<option>Otros</option>
				</select>
			</div>
			<div className="form-Teléfono">
				<label form="usr">Teléfono:</label>
				<input type="text" className="form-control" id="usr" />
			</div>
			<div className="form-Instagram">
				<label form="usr">Instagram:</label>
				<input type="text" className="form-control" id="usr" />
			</div>
			<div className="form-Facebook">
				<label form="usr">Facebook:</label>
				<input type="text" className="form-control" id="usr" />
			</div>
		</div>
	);
};
