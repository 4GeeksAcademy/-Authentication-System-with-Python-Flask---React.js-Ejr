import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
import { Container, Row, Card } from "react-bootstrap";
import "../../styles/Cocktails.scss";

export const Cocktail_Rum = () => {
	const params = useParams();
	const { store, actions } = useContext(Context);
	const cocktail = store.rum_cocktail[params.theid];

	return (
		<Container>
			<Row>
				<Card className="cardtotal text-light" style={{ width: "100rem" }}>
					<Card.Img variant="top" src={cocktail.strDrinkThumb} />
					<div data-aos="fade-up" data-aos-anchor-placement="center-center">
						<Card.Body>
							<Card.Title>{cocktail.strDrink}</Card.Title>
							<Card.Title>{cocktail.strCategory}</Card.Title>
							<Card.Title>{cocktail.strIBA}</Card.Title>
							<Card.Title>{cocktail.strIBA}</Card.Title>
						</Card.Body>

						<Card.Body>
							<Card.Title>ingredientes:</Card.Title>
							<Card className="ingredientes-instru">
								<Card.Body>{cocktail.strIngredient1}</Card.Body>
								<Card.Body>{cocktail.strIngredient2}</Card.Body>
								<Card.Body>{cocktail.strIngredient3}</Card.Body>
								<Card.Body>{cocktail.strIngredient4}</Card.Body>
							</Card>
						</Card.Body>
						<Card.Body>
							<Card.Title>Instrucciones:</Card.Title>
							<Card className="ingredientes-instru">
								<Card.Body>{cocktail.strInstructions}</Card.Body>
								<Card.Body>{cocktail.strMeasure1}</Card.Body>
								<Card.Body>{cocktail.strMeasure2}</Card.Body>
								<Card.Body>{cocktail.strMeasure3}</Card.Body>
							</Card>
						</Card.Body>
					</div>
				</Card>
			</Row>
		</Container>
	);
};
