import React from "react";
import "../../styles/demo.scss";
import { Home } from "./home";

export const Heredia = heredia => {
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
