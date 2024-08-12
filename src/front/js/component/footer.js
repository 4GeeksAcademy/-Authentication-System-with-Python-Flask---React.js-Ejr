import React, { Component } from "react";
import { useLocation } from "react-router-dom";

export const Footer = () => {
	const location = useLocation();


	return (location.pathname != "/login" && location.pathname != "/signup") && (
		< footer className="footer mt-auto py-3 text-center" >
			<p>
				Made with <i className="fa fa-heart text-danger" /> by{" "}
				<a href="http://www.4geeksacademy.com">4Geeks Academy</a>
			</p>
		</footer >
	);
}


