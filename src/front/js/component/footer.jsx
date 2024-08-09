import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css"

export const Footer = () => {
	return(
		<footer className="footer mt-auto py-3 text-center">
			<div className="container-fluid">
				<div className="row p-5 text-white">

					<div className="col-xs-12 col-md-6 col-lg-4">
						<h3>Contacto</h3>
						<br />
						<div className="ml-auto">
							<Link to="/demo">
								<button className="btn btn-outline">Rellenar fomulario</button>
							</Link>
						</div>
						<br />
						<button type="button" class="btn btn-success"> + 34  666 555 444 </button>
					</div>

					<div className="col-xs-12 col-md-6 col-lg-4 text-center">
						<h3>Sobre Nosotros</h3>
						<ul className="list">
							<li><a href="">Nuestra historia</a></li>
							<li><a href="">Premios</a></li>
							<li><a href="">Trabaja con nosotros</a></li>
						</ul>
					</div>

					<div className="col-xs-12 col-md-6 col-lg-4">
						<h3>Síguenos</h3>
						<br />
							<a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="mx-3">
								<i className="fab fa-facebook fa-2x"></i>
							</a>
							<a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="mx-3">
								<i className="fab fa-twitter fa-2x"></i>
							</a>
							<a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="mx-3">
								<i className="fab fa-instagram fa-2x"></i>
							</a>
							<a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="mx-3">
								<i className="fab fa-linkedin fa-2x"></i>
							</a>
					</div>
					<p className="mt-4 mb-0"> Copyright &copy; 2024 ShareTrip.</p>
				</div>
			</div>
		</footer>
	);
};