import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../../styles/info_category.scss";

export const Info_WithoutBase = () => {
	const { store, actions } = useContext(Context);

	return (
		<Container>
			{store.non_alcoholic.map((cocktail, index) => (
				<Card className="info_cards" key={index}>
					<Row>
						<Col className="col-auto col-md-4">
							{/* <Col className="col-auto col-md-4"> */}
							<img className="mr-I" src={cocktail.strDrinkThumb} alt="Generic placeholder" />
						</Col>
						<Col className="text col-auto col-md-8">
							<Card.Body className="text-light text-center">
								<Card.Title>{cocktail.strDrink}</Card.Title>
								<Card.Text>
									{cocktail.strAlcoholic}
									<br />
									{cocktail.strInstructions}
									<br />
									{cocktail.strInstructionsDE}
								</Card.Text>
								{/* <Link to={`/cocktails/${index}`}> */}
								<Link>
									<Button variant="primary">Leer más..</Button>
								</Link>
							</Card.Body>
						</Col>
					</Row>
				</Card>
			))}
		</Container>
	);
};
