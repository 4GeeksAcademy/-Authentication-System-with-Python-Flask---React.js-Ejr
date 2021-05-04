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
					<tr>
						<th scope="row">{props.id}</th>
						<td>{props.id_provincia}</td>
						<td>{props.id_canton}</td>
						<td>
							<a href="/single/:theid">{props.nombre}</a>
						</td>
						<td>{props.id_tiposServicio}</td>
						<td>{props.telefono}</td>
						<td> {props.facebook}</td>
						<td>{props.instagram}</td>
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
