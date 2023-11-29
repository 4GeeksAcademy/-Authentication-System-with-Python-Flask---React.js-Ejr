import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const Tasks = () => {
	const [agenda, setAgenda] = useState([]);

	const { nombre } = useParams();


	useEffect (() => {
		fetch(`https://playground.4geeks.com/apis/fake/contact/agenda/${nombre}`, {
		  method: "GET",
		  headers: {
			"Content-Type": "application/json"
		  }
		})
		.then(resp => resp.json())
		.then(data => {
			setAgenda(data);
		})
		.catch(error => console.log(error));
	  },[])
	
	return (
		<div className="container mt-5">
		<h1 className="text-center mb-4">Agenda</h1>
		{agenda.length > 0 ? (
		  <ul className="list-group">
			{agenda.map((item, index) => (
			  <li
				key={index}
				className="list-group-item d-flex justify-content-between align-items-center"
			  >
				<strong>Nombre</strong>{item.full_name} <br/>
				<strong>Direccion</strong>{item.address} <br/>
				<strong>email</strong>{item.email} <br/>
				<strong>Telefono</strong>{item.phone} <br/>
				
			  </li>
			))}
		  </ul>
		) : (
		  <p>No hay tareas, añadir tareas</p>
		)}

	  </div>
	);
};

export default Tasks;