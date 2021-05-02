import React, { Component } from "react";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center text-white">
		<p>FOLLOW:</p>
		<div>
			<button>
				<a className="fab fa-instagram text-white" href="https://www.instagram.com/starwars/" />
			</button>
			<button>
				<a className="fab fa-facebook text-white" href="https://www.facebook.com/StarWars" />
			</button>
			<button>
				<a className="fab fa-twitter text-white" href="https://twitter.com/starwars" />
			</button>
		</div>
	</footer>
);
