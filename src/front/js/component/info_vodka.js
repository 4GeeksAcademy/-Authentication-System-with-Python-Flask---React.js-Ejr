import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import "../../styles/base_cards.scss";

export const Info_Vodka = () => {
	const { store, actions } = useContext(Context);

	return (
		<Container className="base_cards">
			<article className="text-light textBox">
				<p>
					El vodka es una de las bebidas alcohólicas más populares y consumidas del mundo. Quizás tu mismo
					seas un consumidor de esta espirituosa bebida, pero ¿sabes de qué está hecho el vodka? Se produce a
					través de la fermentación de granos y otras platas ricas en almidón. Normalmente su contenido en
					alcohol se encuentra entre 30 y 50% por volumen. Su sabor, suave y delicado, permite tomarlo solo;
					pero lo más común es combinarlo con otras bebidas no alcohólicas.
				</p>
			</article>
			<Row>
				{store.vodka_cocktail.map((cocktail, index) => (
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
										<Link to={`/Cocktail_Vodka/${index}`}>
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
