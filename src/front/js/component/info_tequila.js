import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import "../../styles/base_cards.scss";

export const Info_Tequila = () => {
	const { store, actions } = useContext(Context);

	return (
		<Container className="base_cards">
			<article className="text-light textBox">
				<p>
					Seguramente cuando hablamos de tequila, todos pensamos que se trata de una bebida típica mejicana,
					que ha protagonizado muchas canciones y cuya forma de beberla más clásica es con sal y limón. Pero
					un amante del tequila sabe muchas más cosas, y algunas te esas deliciosas mezclas te la damos a
					continuación.
				</p>
			</article>
			<Row>
				{store.tequila_cocktail.map((cocktail, index) => (
					<Col className="col-auto col-md-6" key={index}>
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
										<Link to={`/Cocktail_Tequila/${index}`}>
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
					</Col>
				))}
			</Row>
		</Container>
	);
};
