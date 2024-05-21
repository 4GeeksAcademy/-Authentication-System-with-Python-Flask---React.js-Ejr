import React from "react";
import { Link} from "react-router-dom";
import "../../styles/index.css";
import logoImageUrl from "../../img/logoHW.png";

export const Footer = () => (
	<footer className="footer fs-4 d-flex justify-content-between">
		<div className="d-flex mt-2 ms-3">
			<img className="logo-footer" src={logoImageUrl} />
			<p className=" fs-3 me-4 ms-3 mt-3 text-white-50">© 2024 Friendly Wheels,Inc</p>
		</div>
		<div className="justify-content-end mt-3">
			<Link to="/sobrenosotros" className="text-decoration-none">
				<div className="me-3 text-white-80 fs-2">Sobre Nosotros</div>
			</Link>
		</div>
	</footer>
);
