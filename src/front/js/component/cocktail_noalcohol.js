import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import "../../styles/Cocktails.scss";

export const Cocktail_nonAlcohol = () => {
	const params = useParams();
	const { store, actions } = useContext(Context);
	const cocktail = store.non_alcoholic[params.theid];

	return (
		<Container className="contenedor">
			<article className="text-light textBox">
				<p>
					Los cócteles sin alcohol son una opción para mujeres embarazadas, jovenes o para personas que
					después manejan en la vía pública, con estos cócteles ¡puedes disfrutar de manera responsable!
				</p>
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
				<Col className="col-auto col-md-6">
					<article className="text-light text-center textBox">
						<h4>Ingredientes</h4>
						<p>{cocktail.strIngredient1}</p>
						<p>{cocktail.strIngredient2}</p>
						<p>{cocktail.strIngredient3}</p>
						<p>{cocktail.strIngredient4}</p>
					</article>
				</Col>
				<Col className="col-auto col-md-6">
					<article className="text-light text-center textBox">
						<h4>Instrucciones</h4>
						<p>{cocktail.strInstructions}</p>
						<p>
							We start by filling {cocktail.strMeasure1} of a jug with fresh {cocktail.strIngredient1},
							adding {cocktail.strMeasure2} {cocktail.strIngredient2} and another
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

{
	/* <Card className="cardtotal text-light" style={{ width: "100rem" }}>
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
    </Card> */
}
