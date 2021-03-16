import React, { useContext } from "react";
import { Link } from "react-router-dom";
//import { Context } from "../store/appContext";
import { Container, Row, Image, Card, Button } from "react-bootstrap";
import "../../styles/base_category.scss";
import tomatelo from "../../img/logo/tomatelo2.png";

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
					<Image
						id="WithoutBase"
						className="contentimg col-12 col-md-8"
						src="https://i.pinimg.com/originals/61/e7/aa/61e7aa2a06dff9d8a9b6800b8ebb1367.jpg"
						fluid
					/>
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
				<div className="mt-1 mb-1 d-flex justify-content-start" id="padre">
					<Image
						id="RUM"
						className="contentimg col-12 col-md-8"
						src="https://anti-fake.ru/assets/img/articles/Bacardi/B_U_8Anos_Desktop.jpg"
						fluid
					/>
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
				<div className="mt-1 mb-1 d-flex justify-content-end" id="padre">
					<Image
						id="GIN"
						className="contentimg col-12 col-md-8"
						src="https://wallpaperaccess.com/full/2476836.jpg"
						fluid
					/>
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
				<div className="mt-1 mb-1 d-flex justify-content-start" id="padre">
					<Image
						id="VODKA"
						className="contentimg col-12 col-md-8"
						src="https://i.pinimg.com/originals/61/e7/aa/61e7aa2a06dff9d8a9b6800b8ebb1367.jpg"
						fluid
					/>
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
				<div className="mt-1 mb-1 d-flex justify-content-end" id="padre">
					<Image
						id="TEQUILA"
						className="contentimg col-12 col-md-8"
						src="https://www.wallpaperup.com/uploads/wallpapers/2015/06/02/708845/5064001e98ce2a2cac2144f90644d0c9.jpg"
						fluid
					/>
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
				<div className="mt-1 mb-1 d-flex justify-content-start" id="padre">
					<Image
						id="WHISKY"
						className="contentimg col-12 col-md-8"
						src="https://www.wallpaperup.com/uploads/wallpapers/2015/06/02/708845/5064001e98ce2a2cac2144f90644d0c9.jpg"
						fluid
					/>
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
