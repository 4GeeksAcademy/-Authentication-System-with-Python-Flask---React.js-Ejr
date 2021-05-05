import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Row, Col } from "react-bootstrap";

export const Footer1 = () => (
	<footer ClassName="section footer-classic context-dark bg-image" style={{ background: "transparent" }}>
		<div ClassName="text-center f2">
			<span>
				<a href="https://www.facebook.com/">
					<i className="fab fa-facebook f1" />
				</a>
			</span>
			<span>
				<a href="https://www.instagram.com/">
					<i className="fab fa-instagram f1" />
				</a>
			</span>
			<span>
				<a href="https://www.twitter.com/">
					<i className="fab fa-twitter f1" />
				</a>
			</span>
			<span>
				<a href="https://api.whatsapp.com/send?phone=+506">
					<i className="fab fa-whatsapp f1" />
				</a>
			</span>
		</div>
	</footer>
);
