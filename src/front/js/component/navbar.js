import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		
		<nav class="navbar navbar-expand-lg bg-body-tertiary">
			<div class="container-fluid">
				
				<a class="navbar-brand ms-5" href="#">LOGO</a>
				

				<ul class="navbar-nav d-flex gap-5 me-2 mb-2 mb-lg-0">
					<button type="button" class="btn btn-outline-success">Registrarme</button>

					<Link to="/login">
						<button type="button" class="btn btn-outline-success">Iniciar sesión</button>
					</Link>
					
				</ul>
				
			</div>
</nav>
	);
};
