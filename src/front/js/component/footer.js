import React, { Component } from "react";
import "../../styles/footer.css";

export const Footer = () => (
	<footer className="footer mt-auto py-3 justify-content-center d-flex custom-footer sticky-footer">
	
		<p className="mb-auto ms-2">
		<i className="fa-brands fa-whatsapp" style={{ marginRight: '30px', fontSize:"150%" }}></i>
		<i className="fa-brands fa-instagram" style={{ marginRight: '30px', fontSize:"150%" }}></i>
		<i className="fa-brands fa-twitter" style={{ marginRight: '30px', fontSize:"150%" }}></i>
		</p>
	</footer>
);
