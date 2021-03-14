//import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";

export const NewPassword = () => {
	return (
		<div
			className="container text-center mt-5 d-flex justify-content-center align-items-center shadow-lg rounded border"
			style={{
				Maxwidth: "650px",
				background: "white",
				paddingTop: "80px",
				paddingBottom: "165px",
				width: "570px",
				marginBottom: "36px",
				background: "#E9E8E8"
			}}>
			<form style={{ width: "400px" }}>
				<h1 style={{ paddingBottom: "60px" }}>Ingresa una nueva contraseña</h1>
				<div className="form-floating mb-3">
					<input type="fullName" className="form-control" id="floatingInput" placeholder="Nueva contraseña" />
				</div>
				<div className="form-floating mb-3">
					<input
						type="fullName"
						className="form-control"
						id="floatingInput"
						placeholder="Ingresa nuevamente la contraseña"
					/>
				</div>
				<Link to={`./newPassword/`}>
					<input type="submit" className="btn btn-primary" style={{ width: "400px" }} value="Enviar" />
				</Link>
			</form>
		</div>
	);
};
