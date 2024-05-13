import React, { Component } from "react";
import "../../styles/index.css";

export const Footer = () => (
	<footer className="footer fs-4  mt-auto py-3" style={{ height: "100px", backgroundColor: "#a9ce68" }}>
		<div className="container justify-content-center text-center">
			<p>Made with <i className="fa fa-heart text-danger" /> by{" "}
				<a href="http://www.4geeksacademy.com">Nosotr@s</a>
			</p>
		</div>
	</footer>
);
