import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import "../../styles/base_cards.scss";

export const Info_Tequila = () => {
	const { store, actions } = useContext(Context);

	return (
		<Container className="base_cards">
			<article className="text-light mt-1 mb-1">
				<p>
					Esta página esta ligada a una base de datos ya creada por lo cual para poder ingresar deberás
					revisar F12 y conocer los usuarios en lista ya creados!
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

										{/* <Link> */}
										<Button variant="outline-warning">
											<i className="far fa-heart" />
										</Button>
										{/* </Link> */}
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
