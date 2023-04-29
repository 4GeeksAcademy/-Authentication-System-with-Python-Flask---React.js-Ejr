import React, { Component } from "react";
import { FaFacebookF } from "react-icons/fa";


export const Footer = () => (
	
	<footer className="mainfooter" role="contentinfo">
	<div className="footer-middle">
		<div className="container">
			<div className="row">
				<div className="col-md-3">
					<h4>Follow Us</h4>
					<div className="social-network text-center d-flex">
						<a href="#"><FaFacebookF className="ico facebook"/></a>
						<a href="#"><i className="fa fa-linkedin"></i></a>
					</div>				
				</div>

				<div className="col-md-3 col-sm-6">
					<div className="footer-pad">
						<h4>Política de privacidad</h4>
					</div>
				</div>

				<div className="col-md-3 col-sm-6">
					<div className="footer-pad">
						<h4>Contacto</h4>
					</div>
				</div>

			</div>
			
			<div className="row">
				<div className="col-md-12 copy">
					<p className="text-center">&copy; Copyright 2023 - Jobs Hood.  All rights reserved.</p>
				</div>
			</div>
		</div>
	</div>
  </footer>
	
);
