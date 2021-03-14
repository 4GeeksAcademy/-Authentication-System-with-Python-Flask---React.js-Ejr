import React from "react";
//import React, { useContext, useEffect } from "react";
import "../../styles/home.scss";
//import { Link } from "react-router-dom";

export const Comment = () => {
	return (
		<div className="container p-5 bg-light  shadow rounded" style={{ maxWidth: "1048px" }}>
			<form>
				<div className="form-group">
					<label htmlFor="exampleFormControlInput1">
						<h3 className="text-primary">Tu Opinión Es Importante Para Todos. ¡Déjanos Un Comentario!</h3>
					</label>
				</div>
				<span />
				<div className="form-group">
					<label htmlFor="exampleFormControlTextarea1">Comentario</label>
					<textarea className="form-control" id="exampleFormControlTextarea1" rows="3" />
				</div>
				<button type="submit" className="btn btn-primary">
					Enviar Comentario
				</button>
			</form>
		</div>
	);
};
