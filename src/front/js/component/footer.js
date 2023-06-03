import React, { Component } from "react";
import "../../styles/footer.css";

export const Footer = () => (
	<footer className="footer mt-auto py-3 pr-3 conteiner justify-content-center d-flex custom-footer">
		<p className="mr-2">
			Made with <i className="fa fa-heart text-danger" /> by{" "}
			<a href="http://www.4geeksacademy.com">Final project group</a>
		</p>
		<p className="mb-auto ms-2">
		<i className="fa-brands fa-whatsapp" style={{ marginRight: '10px' }}></i>
		<i className="fa-brands fa-instagram" style={{ marginRight: '10px' }}></i>
		<i className="fa-brands fa-twitter" style={{ marginRight: '10px' }}></i>
		</p>
	</footer>
);
