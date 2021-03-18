import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
import { Container, Row, Card, Button } from "react-bootstrap";
import "../../styles/Cocktails.scss";

export const Cocktail_noAlcohol = () => {
	const params = useParams();
	const { store, actions } = useContext(Context);
	const element = store.characters[params.theid];

	return (
		<Container>
			<Row>
				<Card className="cardtotal" style={{ width: "100rem" }}>
					<Card.Img variant="top" src={cocktail.strDrinkThumb} />
					<Card.Body>
						<Card.Title>{cocktail.strDrink}</Card.Title>
					</Card.Body>

					<Card.Body>
						<Card.Title>{cocktail.add}</Card.Title>
						<Card className="ingredientes-instru">
							<Card.Body>{cocktail.add}</Card.Body>
						</Card>
					</Card.Body>

					<Card.Body>
						<Card.Title>{cocktail.add}</Card.Title>
						<Card className="ingredientes-instru">
							{/* Ingredientes == add the differents names to details with more description*/}
							<Card.Body>{cocktail.add}</Card.Body>
						</Card>
					</Card.Body>
				</Card>
			</Row>
		</Container>
	);
};
