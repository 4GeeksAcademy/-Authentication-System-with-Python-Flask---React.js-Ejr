import React from "react";
import "../../styles/footer.css";
import logo from "../component/tickeate.png";

const Footer = () => {
	return (
		<footer className="footer" style={{ backgroundColor: '#d3d3d3', padding: '1rem 0' }}>
			<div className="container-fluid">
				<div className="footer-content d-flex justify-content-between align-items-center">
					<a
						className="navbar-brand"
						href="/"
						style={{
							backgroundImage: `url(${logo})`,
							backgroundSize: 'contain',
							backgroundRepeat: 'no-repeat',
							height: '40px',
							width: '155px',
							display: 'block',
							textIndent: '-9999px'
						}}
					>
						Tickeate
					</a>
					<nav className="footer-nav">
						<ul className="navbar-nav d-flex flex-row">
							<li className="nav-item">
								<a className="nav-link" href="/events" style={{ color: 'black', padding: '0 15px' }}>
									Descubre eventos
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/galeria" style={{ color: 'black', padding: '0 15px' }}>
									Galería
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/contact" style={{ color: 'black', padding: '0 15px' }}>
									Contáctanos
								</a>
							</li>
						</ul>
					</nav>
				</div>
				<div className="copyright text-center mt-3">
					© 2024 Tickeate. All rights reserved.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
