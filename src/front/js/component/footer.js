import React, { Component } from "react";

export const Footer = () => (
	<footer className="footer text-white" style={{ backgroundColor: "#282E34" }}>
		<div className="container">
			<div style={{ paddingTop: '20px' }}></div> {/* Blank space */}
			<div className="row">
				<div className="col-md-1"></div> {/* Blank space */}
				<div className="col-md-8">
					<div className="row">
						<div className="col-md-6">
							<h3>About Us</h3>
							<p>Somos dos estudiantes de Full-Stack developing apasionados por nuestro trabajo.</p>
						</div>
						<div className="col-md-3">
							<h3>Links</h3>
							<ul className="footer-links list-unstyled">
								<li><a href="/" className="link-unstyled">Home</a></li>
								<li><a href="/about" className="link-unstyled">About</a></li>
								<li><a href="/contact" className="link-unstyled">Contact</a></li>
							</ul>
						</div>
						<div className="col-md-3">
							<h3>Connect</h3>
							<ul className="social-links list-unstyled">
								<li><a href="https://twitter.com/" className="link-unstyled"><i className="fab fa-twitter FooterIcon"></i></a>
									<a href="https://es-es.facebook.com/" className="link-unstyled"><i className="fab fa-facebook FooterIcon"></i></a>
									<a href="https://www.instagram.com/" className="link-unstyled"><i className="fab fa-instagram FooterIcon"></i></a>
									<a href="https://www.tiktok.com/" className="link-unstyled"><i className="fab fa-tiktok FooterIcon"></i></a></li>
							</ul>
						</div>
					</div>
				</div>
				<div className="col-md-2"></div> {/* Blank space */}
			</div>
			<div className="footer-bottom">
				<div className="container">
					<div className="row">
						<div className="col-md-1"></div> {/* Blank space */}
						<div className="col-md-8">
							<div className="row">
								<div className="col-md-6">
									<p>&copy; {new Date().getFullYear()} Adoptabuelo</p>
								</div>
								<div className="col-md-6">
									<ul className="footer-nav list-unstyled">
										<li><a href="/terms" className="link-unstyled">Terms of Service</a></li>
										<li><a href="/privacy" className="link-unstyled">Privacy Policy</a></li>
									</ul>
								</div>
							</div>
						</div>
						<div className="col-md-1"></div> {/* Blank space */}
					</div>
				</div>
			</div>
		</div>
	</footer>
);
