import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.scss";
import { Link } from "react-router-dom";

export const Home = () => {
	/*Pensar en lema*/
	return (
		<div className="container principal">
			<div className="row">
				<div className="col-12">
					<div className="text-white">
						<h3>¡Más opciones, ahorrás más colones!</h3>
					</div>
					<form>
						<div className="form-group text-white">
							<label htmlFor="exampleInputEmail1">Nombre del producto</label>
							<div className="input-group mb-3">
								<input
									type="text"
									className="form-control"
									placeholder="Qué estás buscando?"
									aria-label="Recipient's username"
									aria-describedby="basic-addon2"
								/>
								<div className="input-group-append">
									<span className="input-group-text" id="basic-addon2">
										<i className="fas fa-search" />
									</span>
								</div>
							</div>
						</div>
						<div className="form-group text-white">
							<label htmlFor="exampleInputPassword1">Ubicación</label>
							<input
								type="text"
								className="form-control"
								placeholder="Dónde estás ubicado?"
								aria-label="Recipient's username"
								aria-describedby="basic-addon2"
							/>
						</div>
						<button type="submit" className="btn btn-warning btn-lg btn-block">
							Iniciar búsqueda
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
