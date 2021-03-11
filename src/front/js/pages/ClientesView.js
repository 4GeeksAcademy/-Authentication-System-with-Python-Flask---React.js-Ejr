import React, { useState, useEffect } from "react";
import ClienteCard from "../component/ClienteCard";

const ClientesView = () => {
	//Acá se obtienen todos los clientes y se renderiza un card por cada uno

	const [clientes, setClientes] = useState([]);

	useEffect(() => {
		var _clientes = [];

		for (var i = 0; i < 3; i++) {
			_clientes.push({
				nombre: "Nombre del cliente",
				correo: "correo@gmail.com",
				telefono: "+506 88888888"
			});
		}
		setClientes(_clientes);
	}, []);

	return (
		<div className="container-fluid">
			<div id="search-bar" className="input-group d-flex flex-row justify-content-end">
				<div className="form-outline">
					<input type="search" id="form" className="form-control" placeholder="Buscar" />
				</div>
				<button type="button" className="btn btn-primary">
					<i className="fas fa-search" />
				</button>
				<button id type="button" className="btn btn-secondary">
					Agregar cliente
				</button>
			</div>
			<ClienteCard />
			{/* {clientes.map((cliente, i) => {
				return <ClienteCard key={i} clientes={cliente} />;
			})} */}
		</div>
	);
};

export default ClientesView;
