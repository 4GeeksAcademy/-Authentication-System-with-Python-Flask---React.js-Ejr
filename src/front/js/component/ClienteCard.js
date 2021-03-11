import React from "react";
import "../../styles/ClienteCard.scss";

const ClienteCard = () => {
	return (
		<div id="cliente-card" className="card border-primary mb-3">
			<div className="card-header">
				<h5>Nombre del cliente</h5>
			</div>
			<div className="row d-flex justify-content-center">
				<div className="col-4">
					<img className="rounded float-left" src="https://picsum.photos/100/100" />
				</div>
				<div className="col-8">
					<div className="card-body text-primary">
						{/* <h5 className="card-title">Primary card title</h5> */}
						<p className="card-text">correo@gmail.com</p>
						<p className="card-text">+506 88888888</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ClienteCard;
