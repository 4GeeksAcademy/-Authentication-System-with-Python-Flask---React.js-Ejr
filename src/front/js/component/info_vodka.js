import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Media, Button } from "react-bootstrap";
import "../../styles/info_category.scss";

export const Info_Vodka = () => {
	// const { store, actions } = useContext(Context);

	return (
		<Container>
			{/* {store.Info_Category.map((arrayinfocate, index) => ( */}
			<Card className="info_cards">
				<Row>
					{/* <Card className="col-auto col-md-4" key={index}> */}
					<Col className="col-auto col-md-4">
						<img
							className="mr-I"
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmFaVw6IQbSpeDIH7oeJ8DF5yD0A35u5onlA&usqp=CAU"
							alt="Generic placeholder"
						/>
					</Col>
					<Col className="text col-auto col-md-8">
						<Card.Body className="text-light text-center">
							{/* <Card.Title>{arrayinfocate.name}</Card.Title> */}
							<Card.Title>Cocktails Vodka</Card.Title>
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
			{/* ))} */}
		</Container>
	);
};
