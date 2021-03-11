import React from "react";
import { Link } from "react-router-dom";

export const VerifyMessage = () => {
	return (
		<div>
			<div className="jumbotron">
				<h1 className="display-4"> ¡Hola!</h1>
				<p className="lead">Se ha enviado con exito una contaseña de verificación a su dirección de email</p>
				<hr className="my-4" />
				<p> Por favor, verificar</p>
				<Link to="/recovery">
					<a className="btn btn-primary btn-lg" href="#" role="button">
						verificar
					</a>
				</Link>
			</div>
		</div>
	);
};
