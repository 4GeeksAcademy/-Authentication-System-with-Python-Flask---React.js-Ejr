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
	return (
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
											Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a
											cumque velit quibusdam sed amet tempora.
										</cite>
									</small>
								</footer>
								<Link to="/Info_WithoutBase">
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
											Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a
											cumque velit quibusdam sed amet tempora.
										</cite>
									</small>
								</footer>
								<Link to="/Info_rum">
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
											Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a
											cumque velit quibusdam sed amet tempora.
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
											Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a
											cumque velit quibusdam sed amet tempora.
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
											Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a
											cumque velit quibusdam sed amet tempora.
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
											Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a
											cumque velit quibusdam sed amet tempora.
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
