import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import "../../styles/base_cards.scss";

export const Info_Gin = () => {
	const { store, actions } = useContext(Context);

	return (
		<Container className="base_cards">
			<div data-aos="zoom-out">
				<article className="text-light textBox">
					<p>
						Es un alcohol que se obtiene de otros licores que no sean aguardiente, idealmente puros e
						insípidos, tales como el whisky. La cualidad que lo diferencia es el hecho de que se le añaden
						aromatizantes, dando lugar a muchas opciones de Gin. Predomina el sabor a bayas de enebro
						(nebrina).
					</p>
				</article>
			</div>
			<Row>
				{store.gin_cocktail.map((cocktail, index) => (
					<Col className="col-auto col-md-6" key={index}>
						<div data-aos="fade-up">
							<div className="mt-1 mb-1 d-flex justify-content-end text-center" id="base_cards1">
								<Image
									className="contentimg col-12 col-md-8"
									src={cocktail.strDrinkThumb}
									fluid
									id="WithoutBase"
								/>
								<div className="col-12 col-md-6" id="base_cards2">
									<Card className="Card text-light p-3">
										<blockquote className="blockquote mb-0 card-body">
											<p>{cocktail.strDrink}</p>
											<Link to={`/Cocktail_Gin/${index}`}>
												<Button variant="outline-success">Leer más..</Button>
											</Link>

											<Button
												variant="outline-warning"
												onClick={async () => {
													actions.addFavorites(cocktail.idDrink, cocktail.strDrink);
												}}>
												<i className="far fa-heart" />
											</Button>
										</blockquote>
									</Card>
								</div>
							</div>
						</div>
					</Col>
				))}
			</Row>
		</Container>
	);
};
