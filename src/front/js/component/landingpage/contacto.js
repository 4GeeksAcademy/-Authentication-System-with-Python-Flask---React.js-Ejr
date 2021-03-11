import React, { Component } from "react";

export const Contacto = () => (
	<div className="row justify-content-around border-top border-bottom border-dark my-5 py-5">
		{/* FORM DE CONTACTO */}
		<form className="col-5">
			<h1>Contacto</h1>
			{/* Nombre */}
			<div className="form-group">
				<label htmlFor="exampleInputEmail1">Nombre</label>
				<input
					type="email"
					className="form-control"
					id="exampleInputEmail1"
					aria-describedby="emailHelp"
					placeholder="Nombre"
				/>
			</div>
			{/* Correo */}
			<div className="form-group">
				<label htmlFor="exampleInputEmail1">Correo electrónico</label>
				<input
					type="email"
					className="form-control"
					id="exampleInputEmail1"
					aria-describedby="emailHelp"
					placeholder="Correo"
				/>
				<small id="emailHelp" className="form-text text-muted">
					We will never share your email with anyone else
				</small>
			</div>

			{/* Mensaje */}
			<div className="form-group">
				<label htmlFor="exampleFormControlTextarea1">Envíe su mensaje</label>
				<textarea className="form-control" id="exampleFormControlTextarea1" rows="3" />
			</div>
			{/* Botón Enviar */}
			<button type="submit" className="btn btn-primary">
				Enviar
			</button>
		</form>
		{/* REDES SOCIALES */}
		<div className="col-5">
			<h1>Redes Sociales</h1>
			<div className="list-group list-group-flush">
				<a href="#" className="list-group-item list-group-item-action">
					<i className="fab fa-facebook-square fa-2x" /> Facebook
				</a>
				<a href="#" className="list-group-item list-group-item-action">
					<i className="fab fa-instagram fa-2x" /> Instagram
				</a>
				<a href="#" className="list-group-item list-group-item-action">
					<i className="fab fa-twitter-square fa-2x" /> Twitter
				</a>
			</div>
		</div>
	</div>
);
