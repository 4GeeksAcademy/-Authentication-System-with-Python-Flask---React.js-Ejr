import React from "react";
import { Container, Table } from "react-bootstrap";
import "../../styles/home.scss";
import "../../styles/index.scss";

export const IconBox = () => {
	return (
		<>
			<Container className="px-0 pt-3">
				<div className="mt-5 iconBox shadow p-3 mb-5 bg-white">
					<div>
						<Table responsive className="table table-borderless text-center pt-3">
							<tbody>
								<tr>
									<td>
										<i className="fas fa-tv icon" />
									</td>
									<td>
										<i className="fas fa-balance-scale icon" />
									</td>
									<td>
										<i className="far fa-object-group icon" />
									</td>
									<td>
										<i className="fas fa-chart-line icon" />
									</td>
									<td>
										<i className="fas fa-donate icon" />
									</td>
								</tr>
								<tr>
									<td>Desarollar/IT</td>
									<td>Diseno</td>
									<td>ley, derecho</td>
									<td>Marketing</td>
									<td>Accounting</td>
								</tr>
							</tbody>
						</Table>
					</div>
				</div>
			</Container>
		</>
	);
};
