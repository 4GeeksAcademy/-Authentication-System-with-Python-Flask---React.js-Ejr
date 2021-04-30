import React, { Component } from "react";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center text-white">
		<p>FOLLOW:</p>
		<div>
			<img
				src="https://lh3.googleusercontent.com/proxy/S-LjN8Gal8s3_ivNRTwbzR9thtfkT6w5Y81oIh2pvs8cKfF0dU6q74Xc0idq2-nwqlarwWGvUGkEAW1yO10aXfm8JciM3qMJOrw9U-jPc3FR3wIAAc71Ykbw8Q"
				width="80px"
			/>
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
