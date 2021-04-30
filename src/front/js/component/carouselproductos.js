import React from "react";
import "../../styles/index.scss";

export const Carouselproductos = () => {
	let precios = ["₡100", "₡200", "₡300", "₡400", "₡500"];
	let productos = [
		"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.BF-xrA_x_seUamBn5ILQOgHaFO%26pid%3DApi&f=1",
		"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Ye5L2c2CLaR-oM-xS3DLuwAAAA%26pid%3DApi&f=1",
		"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.2bXsidQ82QomfBW6WXwlEQHaFE%26pid%3DApi&f=1",
		"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyoungevitymx.com%2Fwp-content%2Fuploads%2F2018%2F02%2FMexico-Essential-Oils-NEW_800px.png&f=1&nofb=1",
		"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.3UBIwFWHck6bv_NtegwrCgHaFB%26pid%3DApi&f=1"
	];

	let descripciones = ["1", "2", "3", "4", "5"];

	return (
		<div className="container">
			<div id="carouselExampleCaptions" className="carousel slide " data-ride="carousel">
				<ol className="carousel-indicators">
					<li data-target="#carouselExampleCaptions" data-slide-to="0" className="active" />
					<li data-target="#carouselExampleCaptions" data-slide-to="1" />
					<li data-target="#carouselExampleCaptions" data-slide-to="2" />
				</ol>
				<div className="carousel-inner">
					<div className="carousel-item active center">
						<img src={productos[0]} className="mx-auto d-block w-100 h-25" alt="..." />
						<div className="carousel-caption d-none d-md-block">
							<h5 className="text-secondary">{descripciones[0]}</h5>
							<p className="text-secondary">{precios[0]}</p>
						</div>
					</div>
					{productos.map((p, index) => {
						return (
							<div className="carousel-item center" key={index}>
								<img src={p} className="mx-auto d-block w-100 h-25" alt="..." />
								<div className="carousel-caption d-none d-md-block">
									<h5>Second slide label</h5>
									<p>Some representative placeholder content for the second slide.</p>
								</div>
							</div>
						);
					})}
				</div>
				<a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true" />
					<span className="sr-only">Previous</span>
				</a>
				<a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true" />
					<span className="sr-only">Next</span>
				</a>
			</div>
		</div>
	);
};
