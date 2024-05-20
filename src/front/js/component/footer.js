import React from "react";
import { Link} from "react-router-dom";
import "../../styles/index.css";

export const Footer = () => (
	<footer className="footer fs-4 d-flex" style={{ backgroundColor: "#a9ce68" }}>
		<div className="d-flex mt-3">
			<p className="me-4">© 2024 Friendly Wheels,Inc</p>
			<Link to="/datosempresa" className="text-decoration-none">
				<div className="ms-5 text-black">Sobre Nosotros</div>
			</Link>
		</div>
	</footer>
);
