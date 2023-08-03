import React, { Component } from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<div>
		<footer className="footer mt-auto py-3 text-center">
			<Link to="/aboutus">
				<p>
					About
				</p>
			</Link>
		</footer>
	</div>
);
