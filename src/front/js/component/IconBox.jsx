import React from "react";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { Table, Jumbotron } from "react-bootstrap";

export const IconBox = () => {
	return (
		<Jumbotron className="whiteBox shadow-lg p-3 mb-5">
			<Table responsive className="table table-borderless text-center">
				<thead>
					<tr>
						<th>
							<i className="fas fa-tv icon" />
						</th>
						<th>
							<i className="fas fa-edit icon" />
						</th>
						<th>
							<i className="fas fa-chart-line icon" />
						</th>
						<th>
							<i className="fas fa-donate icon" />
						</th>
						<th>
							<i className="fas fa-balance-scale icon" />
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Desarollar/IT</td>
						<td>Diseño</td>
						<td>Marketing</td>
						<td>Contabilidad</td>
						<td>ley, derecho</td>
					</tr>
				</tbody>
			</Table>
		</Jumbotron>
	);
};
