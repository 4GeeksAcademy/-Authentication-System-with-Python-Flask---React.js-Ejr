import React from "react";
import "../../styles/demo.scss";
import PropTypes from "prop-types";

export const Alajuela = alajuela => {
	return (
		<div className="container">
			<table className="table table-sl table-dark">
				<thead>
					<tr>
						<th scope="col">#</th>
						{props.id}
						<th scope="col">Provincia</th>
						{props.id_provincia}
						<th scope="col">Cantón</th>
						{props.id_canton}
						<th scope="col">Nombre PYMES</th>
						{props.nombre}
						<th scope="col">Servicio</th>
						{props.id_tiposServicio}
						<th scope="col">Teléfono</th>
						{props.telefono}
						<th scope="col">Facebook</th>
						{props.facebook}
						<th scope="col">Instagram</th>
						{props.instagram}
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">1</th>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
						<td>@mdo</td>
					</tr>
					<tr>
						<th scope="row">2</th>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
						<td>@mdo</td>
					</tr>
					<tr>
						<th scope="row">3</th>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
						<td>@mdo</td>
					</tr>
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
	id_tiposServicio: PropTypes.sting,
	telefono: PropTypes.string,
	instagram: PropTypes.string,
	facebook: PropTypes.string
};
export default Alajuela;
