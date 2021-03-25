import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import "../../styles/cocktails.scss";

export const Cocktail_Tequila = () => {
	const params = useParams();
	const { store, actions } = useContext(Context);
	const cocktail = store.tequila_cocktail[params.theid];

	return (
		<Container className="contenedor">
			<article className="text-light text-center textBox">
				<p>
					Hacer buenos combinados no tiene demasiado misterio: la única máxima reside en respetar a rajatabla
					las proporciones, ser cuidadoso en el manejo de copas y hielos y usar destilados de cierta calidad.
				</p>
				<footer className="blockquote-footer text-little">
					Aprende con TOMATE`LO hacer tus propios cocktails!
				</footer>
			</article>
			<div className="mt-1 mb-1 d-flex justify-content-start text-center" id="padre">
				<Image className="contentimg1 col-12 col-md-10" src={cocktail.strDrinkThumb} fluid />
				<div className="col-12 col-md-4" id="two">
					<Card className="Card text-light p-3">
						<blockquote className="blockquote mb-0 card-body">
							<p>{cocktail.strDrink}</p>
							<p>{cocktail.strCategory}</p>
							<p>{cocktail.strIBA}</p>
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
			<Row>
				<Col className="col-12 col-md-4">
					<article className="p-1 text-light text-center textBox">
						<h4>Ingredientes</h4>
						<p>{cocktail.strIngredient1}</p>
						<p>{cocktail.strIngredient2}</p>
						<p>{cocktail.strIngredient3}</p>
						<p>{cocktail.strIngredient4}</p>
					</article>
				</Col>
				<Col className="col-12 col-md-8">
					<article className="p-1 text-light text-center textBox">
						<h4>Instrucciones</h4>
						<p>{cocktail.strInstructions}</p>
						<p>
							We start by filling {cocktail.strMeasure1} of a jug with fresh {cocktail.strIngredient1},
							adding {cocktail.strMeasure2} {cocktail.strIngredient2} and another{" "}
							{cocktail.strIngredient3}. Finally we add {cocktail.strMeasure3} cava or{" "}
							{cocktail.strIngredient4}, stir gently and transfer to the fridge where we let it cool for
							an hour before serving and enjoy this wonderful cocktail whenever you want.
						</p>
					</article>
				</Col>
			</Row>
		</Container>
	);
};
