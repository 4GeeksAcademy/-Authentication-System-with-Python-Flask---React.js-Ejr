import React, { Component } from "react";

export const Footer = () => (
	<footer className=" footer text-center bg-light sticky-bottom" style={{zIndex: "9999", marginTop:"4rem"}}>
		<p className="text-dark p-0 m-0">
			Made with <i className="fa fa-heart text-danger" /> by{" "}
			<a href="http://www.4geeksacademy.com">4Geeks Academy</a>
		</p>
		<p className="bg-light text-light">Soy un texto secreto, gracias por pasarte por nuestra pagina! n.n</p>
		<button className="btn btn-info p-0 m-0" style={{borderRadius:"50% 50% 50% 50% / 95% 95% 5% 5%", width:"8rem", height:"1rem"}}></button>
			<h2 className="text-success p-0 m-0" style={{fontSize:"1rem"}}>¿Sha tenés hambre?</h2>
		<button className="btn btn-info p-0 m-0" style={{borderRadius:"50% 50% 50% 50% / 12% 12% 88% 88% ", width:"8rem", height:"1rem"}}></button>
	</footer>
);