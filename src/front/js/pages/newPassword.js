//import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import React from "react";

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
				<h1 style={{ paddingBottom: "60px" }}>Recupera la contraseña</h1>
				<div className="form-floating mb-3">
					<h5>Pregunta de seguridad</h5>
					<input
						type="fullName"
						className="form-control"
						id="floatingInput"
						placeholder="¿Cuál era el nombre de tu primera mascota?"
					/>
				</div>
				<input type="submit" className="btn btn-primary" style={{ width: "400px" }} value="Enviar respuesta" />
			</form>
		</div>
	);
};
