import React from "react";
import { Link } from "react-router-dom";
//import { Context } from "../store/appContext";
// listo
import { Container, Row, Image, Card, Button } from "react-bootstrap";
import "../../styles/base_category.scss";

// Imagenes a usar , propiedad de TOMATE'LO
import tomatelo from "../../img/logo/tomatelo2.png";
import not_alcohol from "../../img/categories_jpg/not_alcohol.jpg";
import ron_alcohol from "../../img/categories_jpg/ron.jpg";
import gin_alcohol from "../../img/categories_jpg/gin.jpg";
import whisky_alcohol from "../../img/categories_jpg/whisky.jpg";
import vodka_alcohol from "../../img/categories_jpg/vodka.jpg";
import tequila_alcohol from "../../img/categories_jpg/tequila_alcohol.jpg";
// Imagenes a usar , propiedad de TOMATE'LO
//Animaciones

export const Base_Categories = () => {
	return (
		<Container className="mt-2 mb-2" id="BaseDrinks">
			<div className="text-center textBox">
				<article className="text-light">
					<p>Las mejores categorias seleccionadas de los cócteles a base de su ingrediente especifica</p>
				</article>
				<footer className="blockquote-footer text-little">
					Puedes conocer mas cocteles y sus detalles dando en ver más!
				</footer>
			</div>
			<Row>
				<div data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
					<div className="mt-1 mb-1 d-flex justify-content-end" id="padre">
						<Image className="contentimg col-12 col-md-8" src={not_alcohol} fluid id="WithoutBase" />
						<div className="col-12 col-md-6" id="uno">
							<Card className="Card text-light p-3">
								<blockquote className="blockquote mb-0 card-body">
									<p>Sin Alcohol</p>
									<footer className="blockquote-footer text-little">
										Los cócteles sin alcohol (o “mocktails”) son siempre una buena alternativa para
										disfrutar de un ambiente festivo de manera responsable
									</footer>
									<Link to="/Info_WithoutBase">
										<Button type="submit" variant="outline-success">
											Ver más
										</Button>
									</Link>
								</blockquote>
							</Card>
						</div>
					</div>
				</div>
				{/* parte de ron */}
				<div data-aos="fade-left" data-aos-offset="300" data-aos-easing="ease-in-sine">
					<div className="mt-1 mb-1 d-flex justify-content-start" id="padre">
						<Image className="contentimg col-12 col-md-8" src={ron_alcohol} fluid id="RUM" />
						<div className="col-12 col-md-6" id="two">
							<Card className="Card text-light p-3">
								<blockquote className="blockquote mb-0 card-body">
									<p>RON</p>
									<footer className="blockquote-footer text-little">
										Los rones más finos y de mejor calidad son los que se preparan directamente del
										jugo de la caña de azúcar.
									</footer>
									<Link to="/Info_Rum">
										<Button type="submit" variant="outline-success">
											Ver más
										</Button>
									</Link>
								</blockquote>
							</Card>
						</div>
					</div>
				</div>
				{/* gin parte */}
				<div data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
					<div className="mt-1 mb-1 d-flex justify-content-end" id="padre">
						<Image className="contentimg col-12 col-md-8" src={gin_alcohol} fluid id="GIN" />
						<div className="col-12 col-md-6" id="uno">
							<Card className="Card text-light p-3">
								<blockquote className="blockquote mb-0 card-body">
									<p>GIN</p>
									<footer className="blockquote-footer text-little">
										El sabor central en todo gin es el enebro. Tiene un aroma fresco, balsámico,
										amaderado dulce y parecido a una hoja (aguja) de pino que crea un sabor seco,
										casi amargo.
									</footer>
									<Link to="/Info_Gin">
										<Button type="submit" variant="outline-success">
											Ver más
										</Button>
									</Link>
								</blockquote>
							</Card>
						</div>
					</div>
				</div>
				{/* vodka parte */}
				<div data-aos="fade-left" data-aos-offset="300" data-aos-easing="ease-in-sine">
					<div className="mt-1 mb-1 d-flex justify-content-start" id="padre">
						<Image className="contentimg col-12 col-md-8" src={vodka_alcohol} fluid id="VODKA" />
						<div className="col-12 col-md-6" id="two">
							<Card className="Card text-light p-3">
								<blockquote className="blockquote mb-0 card-body">
									<p>VODKA</p>
									<footer className="blockquote-footer text-little">
										Su sabor, suave y delicado, permite tomarlo solo; pero lo más común es
										combinarlo con otras bebidas no alcohólicas.
									</footer>
									<Link to="/Info_Vodka">
										<Button type="submit" variant="outline-success">
											Ver más
										</Button>
									</Link>
								</blockquote>
							</Card>
						</div>
					</div>
				</div>
				{/* tequila parte */}
				<div data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
					<div className="mt-1 mb-1 d-flex justify-content-end" id="padre">
						<Image className="contentimg col-12 col-md-8" src={tequila_alcohol} fluid id="TEQUILA" />
						<div className="col-12 col-md-6" id="uno">
							<Card className="Card text-light p-3">
								<blockquote className="blockquote mb-0 card-body">
									<p>TEQUILA</p>
									<footer className="blockquote-footer text-little">
										En un excelente Tequila se debe buscar que tenga un color brillante, que tenga
										aromas no ofensivos y que en boca sus sabores queden en el paladar y no queme en
										garganta.
									</footer>
									<Link to="/Info_Tequila">
										<Button type="submit" variant="outline-success">
											Ver más
										</Button>
									</Link>
								</blockquote>
							</Card>
						</div>
					</div>
				</div>
				{/* whisky */}
				<div data-aos="fade-left" data-aos-offset="300" data-aos-easing="ease-in-sine">
					<div className="mt-1 mb-1 d-flex justify-content-start" id="padre">
						<Image className="contentimg col-12 col-md-8" src={whisky_alcohol} fluid id="WHISKY" />
						<div className="col-12 col-md-6" id="two">
							<Card className="Card text-light p-3">
								<blockquote className="blockquote mb-0 card-body">
									<p>WHISKY</p>
									<footer className="blockquote-footer text-little">
										El sabor es diferente donde destacan los vainillas suaves, los ahumados, la
										fruta como manzanas o naranjas, los frutos secos como la nuez, el caramelo, la
										madera de roble y los tostados procedentes de la malta.
									</footer>
									<Link to="/Info_Whisky">
										<Button type="submit" variant="outline-success">
											Ver más
										</Button>
									</Link>
								</blockquote>
							</Card>
						</div>
					</div>
				</div>
			</Row>
		</Container>
	);
};
