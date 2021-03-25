import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import "../../styles/base_cards.scss";

export const Info_Whisky = () => {
	const { store, actions } = useContext(Context);

	return (
		<Container className="base_cards">
			<div data-aos="zoom-out">
				<article className="text-light textBox">
					<p>
						El whisky es uno de los destilados más destacados de toda la historia. Sigue adquiriendo gran
						relevancia en todo el mundo y está destinado a sibaritas que saben apreciar su color y sabor.
					</p>
				</article>
			</div>
			<Row>
				{store.whisky_cocktail.map((cocktail, index) => (
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
											<Link to={`/Cocktail_Whisky/${index}`}>
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
