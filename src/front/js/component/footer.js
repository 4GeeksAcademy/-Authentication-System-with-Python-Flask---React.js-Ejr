import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { logoAzul } from "../../img/image";

export const Footer = () => (
<<<<<<< HEAD
	<footer className="footer mt-auto py-3 text-center">
		<p>
			Made with <i className="fa fa-heart text-danger" /> by <a href="http://www.4geeksacademy.com">cotec</a>
		</p>
=======
	<footer className="footer mt-auto py-3" style={{ backgroundColor: "#F2F2F2" }}>
		<Container>
			<img src={logoAzul} width="110" height="33" className="mt-5" alt="cotec" />
			<p className="mt-2">© 2021 cotec® Global Inc.</p>
		</Container>
>>>>>>> 2e10dc16ebf3e51eaa20cf0c4264e351b31b4fdd
	</footer>
);
