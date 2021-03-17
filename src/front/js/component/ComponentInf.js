import React, { Component } from "react";
import { Media, Jumbotron, Container } from "react-bootstrap";
import titulo from "../../img/titulo.png";
import jumbo from "../../img/jumbo.png";
import uno from "../../img/uno.png";
import dos from "../../img/dos.png";
import tres from "../../img/tres.png";
import cuatro from "../../img/cuatro.png";
import about from "../../img/about.png";

export const ComponenteInf = () => {
	return (
		<div style={{ marginTop: 100 }}>
			<img src={titulo} height="300px" className="mt-5" />
			<br />
			<br />
			<br />
			<Jumbotron fluid id="jumbo">
				<Container>
					<img src={jumbo} height="300px" width="1080px" />
					<p>This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
				</Container>
			</Jumbotron>
			<br />
			<Media id="caja">
				<img src={uno} height="300px" width="300px" className="mr-3 rounded-circle" alt="Generic placeholder" />
				<Media.Body>
					<h2>
						<span>TIQUICIA</span>
					</h2>
					<p>
						Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin
						commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum
						nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
					</p>
				</Media.Body>
			</Media>
			<br />
			<Media id="caja">
				<Media.Body>
					<h2>
						<span>GASTRONOMÍA</span>
					</h2>
					<p>
						Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin
						commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum
						nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
					</p>
				</Media.Body>
				<img src={dos} height="300px" width="300px" className="mr-3 rounded-circle" alt="Generic placeholder" />
			</Media>
			<br />
			<Media id="caja">
				<img
					src={tres}
					height="300px"
					width="300px"
					className="mr-3 rounded-circle"
					alt="Generic placeholder"
				/>
				<Media.Body>
					<h2>
						<span>AVENTURAS</span>
					</h2>
					<p>
						Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin
						commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum
						nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
					</p>
				</Media.Body>
			</Media>
			<br />
			<Media id="caja">
				<Media.Body>
					<h2>
						<span>CULTURA</span>
					</h2>
					<p>
						Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin
						commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum
						nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
					</p>
				</Media.Body>
				<img
					src={cuatro}
					height="300px"
					width="300px"
					className="mr-3 rounded-circle"
					alt="Generic placeholder"
				/>
			</Media>
			<br />
			<img src={about} height="600px" />
		</div>
	);
};
