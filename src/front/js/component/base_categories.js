import React, { useContext } from "react";
import { Link } from "react-router-dom";
//import { Context } from "../store/appContext";
import { Container, Row, Image, Card, Button } from "react-bootstrap";
import "../../styles/base_category.scss";
import tomatelo from "../../img/logo/tomatelo2.png";
import not_alcohol from "../../img/categories_jpg/not_alcohol.jpg";
import ron_alcohol from "../../img/categories_jpg/ron.jpg";
import gin_alcohol from "../../img/categories_jpg/gin.jpg";
import whisky_alcohol from "../../img/categories_jpg/whisky.jpg";
import vodka_alcohol from "../../img/categories_jpg/vodka.jpg";
import tequila_alcohol from "../../img/categories_jpg/tequila_alcohol.jpg";

export const Base_Categories = () => {

		<Container className="mt-2 mb-2">
			<Row>
				<article className="text-light" id="BaseDrinks">
					<p>
						Esta página esta ligada a una base de datos ya creada por lo cual para poder ingresar deberás
						revisar F12 y conocer los usuarios en lista ya creados!
					</p>
				</article>
				<div className="mt-1 mb-1 d-flex justify-content-end" id="padre">
					<Image className="contentimg col-12 col-md-8" src={not_alcohol} fluid />
					<div className="col-12 col-md-6" id="uno">
						<Card className="Card text-light p-3">
							<blockquote className="blockquote mb-0 card-body">
								<p>Sin Alcohol</p>
								<footer className="blockquote-footer">
									<small className="text-muted">
										<cite title="Source Title">
											Los cócteles sin alcohol (o “mocktails”) son siempre una buena alternativa
											para disfrutar de un ambiente festivo de manera responsable y también tienen
											cabida en el mundo de la coctelería. Los cócteles sin alcohol están muchas
											veces destinados a conductores, mujeres embarazadas, niños, intolerantes al
											alcohol, etc. de manera que también puedan disfrutar de un buen cóctel sin
											correr riesgo alguno.
										</cite>
									</small>
								</footer>
								<Link to="/Info_Category">
									<Button type="submit" variant="outline-info">
										Ver más
									</Button>
								</Link>
							</blockquote>
						</Card>
					</div>
				</div>
				{/* parte de ron */}
				<div className="mt-1 mb-1 d-flex justify-content-start" id="padre">
					<Image className="contentimg col-12 col-md-8" src={ron_alcohol} fluid />
					<div className="col-12 col-md-6" id="two">
						<Card className="Card text-light p-3">
							<blockquote className="blockquote mb-0 card-body">
								<p>RON</p>
								<footer className="blockquote-footer">
									<small className="text-muted">
										<cite title="Source Title">
											El ron es un destilado elaborado a partir de la caña de azúcar que, en sus
											distintas variedades como pueden ser el ron blanco, oscuro o dorado, se
											adaptan perfectamente a su utilización en una gran cantidad de cócteles
											gracias a la versatilidad de este destilado.
										</cite>
									</small>
								</footer>
								<Link to="/Info_Rum">
									<Button type="submit" variant="outline-info">
										Ver más
									</Button>
								</Link>
							</blockquote>
						</Card>
					</div>
				</div>
				{/* gin parte */}
				<div className="mt-1 mb-1 d-flex justify-content-end" id="padre">
					<Image className="contentimg col-12 col-md-8" src={gin_alcohol} fluid />
					<div className="col-12 col-md-6" id="uno">
						<Card className="Card text-light p-3">
							<blockquote className="blockquote mb-0 card-body">
								<p>GIN</p>
								<footer className="blockquote-footer">
									<small className="text-muted">
										<cite title="Source Title">
											Su mezcla de cítricos, aromas florales y botánicos la hace un ingrediente
											perfecto para que las mezclas siempre salgan bien. Los dos únicos requisitos
											fundamentales son: suficientes mezcladores y, obviamente, una buena ginebra.
											Aquí tienes nueve propuestas deliciosas y fáciles de preparar, para que este
											verano le des un sello de autor a las copas en tu casa.
										</cite>
									</small>
								</footer>
								<Link to="/Info_Gin">
									<Button type="submit" variant="outline-info">
										Ver más
									</Button>
								</Link>
							</blockquote>
						</Card>
					</div>
				</div>
				{/* vodka parte */}
				<div className="mt-1 mb-1 d-flex justify-content-start" id="padre">
					<Image className="contentimg col-12 col-md-8" src={vodka_alcohol} fluid />
					<div className="col-12 col-md-6" id="two">
						<Card className="Card text-light p-3">
							<blockquote className="blockquote mb-0 card-body">
								<p>VODKA</p>
								<footer className="blockquote-footer">
									<small className="text-muted">
										<cite title="Source Title">
											El vodka es una bebida originaria de Rusia y Polonia, se produce al destilar
											grano, centeno, patatas o algunas frutas, pero ¿por qué el vodka es una
											bebida ideal para la preparar cócteles? El secreto del vodka reside en su
											aroma y sabor, que por su neutralidad e intensidad lo hacen una bebida
											idónea para la preparación de cócteles.
										</cite>
									</small>
								</footer>
								<Link to="/Info_Vodka">
									<Button type="submit" variant="outline-info">
										Ver más
									</Button>
								</Link>
							</blockquote>
						</Card>
					</div>
				</div>
				{/* tequila parte */}
				<div className="mt-1 mb-1 d-flex justify-content-end" id="padre">
					<Image className="contentimg col-12 col-md-8" src={tequila_alcohol} fluid />
					<div className="col-12 col-md-6" id="uno">
						<Card className="Card text-light p-3">
							<blockquote className="blockquote mb-0 card-body">
								<p>TEQUILA</p>
								<footer className="blockquote-footer">
									<small className="text-muted">
										<cite title="Source Title">
											Cuando pensamos en tragos hechos con tequila, de inmediato pensamos en la
											clásica margarita, un trago delicioso, preferido por la mayoría de los
											amantes de los tragos mezclados. Sin embargo, hay muchísimos cócteles
											riquísimos a base de mezcal o tequila que desconocemos, pero que una vez
											pruebes, estoy segura encontratás más de uno que se podrá convertir en tu
											nuevo trago favorito.
										</cite>
									</small>
								</footer>
								<Link to="/Info_Tequila">
									<Button type="submit" variant="outline-info">
										Ver más
									</Button>
								</Link>
							</blockquote>
						</Card>
					</div>
				</div>
				{/* whisky */}
				<div className="mt-1 mb-1 d-flex justify-content-start" id="padre">
					<Image className="contentimg col-12 col-md-8" src={whisky_alcohol} fluid />
					<div className="col-12 col-md-6" id="two">
						<Card className="Card text-light p-3">
							<blockquote className="blockquote mb-0 card-body">
								<p>WHISKY</p>
								<footer className="blockquote-footer">
									<small className="text-muted">
										<cite title="Source Title">
											El whisky es una de las bebidas que te invita a probarla no solo una, dos o
											tres veces, sino tantas veces como sea posible. Su sabor es inconfundible,
											conserva en sí mismo el rico aroma de las barricas de madera, y su aroma te
											encanta apenas lo acercas a tu boca. No por nada su nombre significa «agua
											de vida«, término derivado del gaélico escocés Uisge beatha.
										</cite>
									</small>
								</footer>
								<Link to="/Info_Whisky">
									<Button type="submit" variant="outline-info">
										Ver más
									</Button>
								</Link>
							</blockquote>
						</Card>
					</div>
				</div>
			</Row>
		</Container>
	);
};
