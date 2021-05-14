import React from "react";
import { Globalcard } from "../component/globalcard";
import { Link } from "react-router-dom";

export const Categorias = () => {
	return (
		<>
			<div className="container-fluid">
				<div className="categoriaspage row">
					<h1 className="h2 mx-auto py-4 font-weight-light">
						<strong>Categorias</strong>
					</h1>
					<div className="col-lg-12">
						<h4>
							<strong>Lacteos</strong>
						</h4>
					</div>
					<div className="col-lg-12 categorias">
						<Globalcard />
						<Globalcard />
						<Globalcard />
						<Globalcard />
						<Globalcard />
						<Globalcard />
						<Globalcard />
						<Globalcard />
					</div>
					<br />

					<div className="col-lg-12">
						<h4>
							<strong>Granos</strong>
						</h4>
					</div>
					<div className="col-lg-12 categorias">
						<Globalcard />
					</div>
					<br />

					<div className="col-lg-12">
						<h4>
							<strong>Cuidado Personal</strong>
						</h4>
					</div>
					<div className="col-lg-12 categorias">
						<Globalcard />
					</div>
				</div>
			</div>
		</>
	);
};
