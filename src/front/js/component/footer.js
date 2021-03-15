import React, { Component } from "react";
import cinde from "../../img/cinde.png";
import micitt from "../../img/micitt.png";

export const Footer = () => (
	<div className="card text-center" style={{ background: "rgb(39, 34, 34)", border: "none" }}>
		<div className="card-body text-right text-light">
			<p>© 2021 Pura Vida Passport. Derechos reservados.</p>
		</div>

		<div className="bg-light" height="250px">
			<a href="https://www.cinde.org/es">
				<img
					src={cinde}
					className="mr-5"
					style={{ maxHeight: "50px" }}
					target="_blank"
					rel="cindepage"
					height="80px"
				/>
			</a>

			<a href="https://www.micit.go.cr/">
				<img
					src={micitt}
					className="mr-5"
					style={{ maxHeight: "78px" }}
					target="_blank"
					rel="micittpage"
					height="100px"
				/>
			</a>
			<a href="https://www.visitcostarica.com/es">
				<img
					src="https://graylinecostarica.files.wordpress.com/2012/02/costa_rica1.jpg"
					className="mr-5"
					target="_blank"
					rel="CRpage"
					height="100px"
					style={{ maxHeight: "128px" }}
				/>
			</a>
			<a href="https://www.canatur.org/">
				<img
					src="https://www.centralamericadata.com/image_archive/e/448121.jpg"
					className="mr-5"
					target="_blank"
					rel="canatourpage"
					height="100px"
					style={{ maxHeight: "130px" }}
				/>
			</a>
			<a href="https://www.ict.go.cr/es/">
				<img
					src="https://www.elmundo.cr/wp-content/uploads/2018/04/untitled-2-1024x414.png"
					className="mr-5"
					target="_blank"
					rel="ictpage"
					height="150px"
					style={{ maxHeight: "90px" }}
				/>
			</a>
		</div>
	</div>
);
