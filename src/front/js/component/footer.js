import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { logoAzul } from "../../img/image";

export const Footer = () => (
	<footer className="footer mt-auto py-3" style={{ backgroundColor: "#F2F2F2" }}>
		<Container>
			<img src={logoAzul} width="110" height="33" className="mt-5" alt="cotec" />
			<p className="mt-2">© 2021 cotec® Global Inc.</p>
		</Container>
	</footer>
);
