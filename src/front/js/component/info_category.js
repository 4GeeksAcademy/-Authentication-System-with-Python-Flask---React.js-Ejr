import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../../styles/info_category.scss";

// Ambiente de pruebas
export const Info_Category = () => {
	const { store, actions } = useContext(Context);

	return (
		<Container>
			{store.rum_cocktail.map((cocktail, index) => (
				<Card className="info_cards">
					<Row>
						<Col className="col-auto col-md-4" key={index}>
							{/* <Col className="col-auto col-md-4"> */}
							<img
								className="mr-I"
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmFaVw6IQbSpeDIH7oeJ8DF5yD0A35u5onlA&usqp=CAU"
								alt="Generic placeholder"
							/>
						</Col>
						<Col className="text col-auto col-md-8">
							<Card.Body className="text-light text-center">
								<Card.Title>{cocktail.strDrink}</Card.Title>
								<Card.Text>
									{/* {arrayinfocate.climate}
                                    <br />
                                    {arrayinfocate.gravity}
                                    <br />
                                    {arrayinfocate.terrain} */}
									Cocktail Description Cocktail Description Cocktail Description Cocktail Description
									Cocktail Description Cocktail Description Cocktail Description Cocktail Description
								</Card.Text>
								{/* <Link to={`/cocktails/${index}`}> */}
								<Link>
									<Button variant="primary">Deseo ir a esta categoría</Button>
								</Link>
							</Card.Body>
						</Col>
					</Row>
				</Card>
			))}
		</Container>
	);
};
