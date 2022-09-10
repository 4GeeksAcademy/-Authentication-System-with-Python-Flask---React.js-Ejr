import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Stark from "../../img/stark.jpg";
import "../../styles/index.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
		<form id="formulario" className="">
			<h2 id="title" className="my-3" >Consigue la mejor tasa aqui</h2>
			<div className="mb-3 d-flex mx-4" id="name">
				<label id="ingresar-monto" for="exampleInputName" className="form-label">Imgresa un monto</label>
				<input type="usuario" className="form-control" id="data"/>
				<div class="dropdown">
				<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="boton">
					Selecciona divisa
				</button>
				<ul class="dropdown-menu">
					<li><button class="dropdown-item" type="button">USD</button></li>
					<li><button class="dropdown-item" type="button">CLP</button></li>
					<li><button class="dropdown-item" type="button">EU</button></li>
				</ul>
				</div>
			</div>
			<div className="mb-3 d-flex mx-4">
				<label id="monto-recibir" for="exampleInputEmail1" className="form-label">Monto as recibir</label>
				<input type="email" className="form-control" id="data"/>
				<div class="dropdown">
				<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="boton">
					Selecciona divisa
				</button>
				<ul class="dropdown-menu">
					<li><button class="dropdown-item" type="button">USD</button></li>
					<li><button class="dropdown-item" type="button">CLP</button></li>
					<li><button class="dropdown-item" type="button">EU</button></li>
				</ul>
				</div>
			</div>
			
			<div className="mb-3 d-flex mx-4">
				<label id="tipo-cambio" for="exampleInputPassword1" className="form-label">Tipo de cambio</label>
				<input type="password" className="form-control" id="data"/>
				<button type="submit" id="boton2">Cambiar</button>
			</div>
		</form>
		</div>	
	);
};



