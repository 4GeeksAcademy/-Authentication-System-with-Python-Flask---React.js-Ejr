import React, { useContext } from "react";
import "../../styles/demo.scss";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const Alajuela = alajuela => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<table className="table table-sl table-dark">
				<thead>
					<tr>
						<th scope="col">#</th>

						<th scope="col">Provincia</th>

						<th scope="col">Cantón</th>

						<th scope="col">Nombre PYMES</th>

						<th scope="col">Servicio</th>

						<th scope="col">Teléfono</th>

						<th scope="col">Facebook</th>

						<th scope="col">Instagram</th>
					</tr>
				</thead>
				<tbody>
					{store.alajuela.map((item, index) => (
						<tr key={index}>
							<th scope="row">{item.id}</th>
							<td>{store.provincias.find(x => x.id === item.id_provincia).nombre}</td>
							<td>{store.cantones.find(x => x.id === item.id_canton).nombre}</td>
							<td>
								<a href="/single/:theid">{item.nombre}</a>
							</td>
							<td>{store.servicios.find(x => x.id === item.id_tiposServicio).tipo}</td>
							<td>{item.telefono}</td>
							<td> {item.facebook}</td>
							<td>{item.instagram}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
Alajuela.propTypes = {
	id: PropTypes.number,
	nombre: PropTypes.string,
	id_provincia: PropTypes.string,
	id_canton: PropTypes.string,
	id_tiposServicio: PropTypes.string,
	telefono: PropTypes.string,
	instagram: PropTypes.string,
	facebook: PropTypes.string
};
export default Alajuela;
