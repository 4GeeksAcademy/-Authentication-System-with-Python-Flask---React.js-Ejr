import React from "react";
import { Link } from "react-router-dom";

export const NavbarRegistro= () => {
	return (
		<nav className="navbar navbar-light bg-warning  d-flex justify-content-between p-2">
			<div className="container">
				<Link to="/">
				<a class="navbar-brand" href="#">
     			 <img src="/docs/5.2/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" class="d-inline-block align-text-top"/>
      				Cachai el cambio
    			</a>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Salir</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
