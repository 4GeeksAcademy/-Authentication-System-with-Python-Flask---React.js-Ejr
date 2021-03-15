import React, { useContext } from "react";
//import { Context } from "../store/appContext";
import { Container, Row, Col, Image, Card, Media, Button, ListGroup, Item } from "react-bootstrap";
import "../../styles/home.scss";
import "../../styles/Cocktails.scss";
import tomatelo from "../../img/logo/tomatelo2.png";

export const Cocktails = () => {
	return (
		<Container>
			<Row>
				{/* Comentarios */}
				<Card className="CarsCocktails">
					<Media>
						<Col xs={6} md={4}>
							<img
								className="mr-cocktail"
								src="https://c0.wallpaperflare.com/preview/1002/324/1/blue-margarita-filled-glass.jpg"
								alt="Generic placeholder"
							/>
						</Col>
						<Media.Body>
							<Col>
								<h5>Margarita</h5>
								<p>
									Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
									sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra
									turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
									felis in faucibus.
								</p>
							</Col>
						</Media.Body>
					</Media>
					{/* <ListGroup>
						<ListGroup.Item>Cras justo odio</ListGroup.Item>
						<ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
						<ListGroup.Item>Morbi leo risus</ListGroup.Item>
						<ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
						<ListGroup.Item>Vestibulum at eros</ListGroup.Item>
					</ListGroup> */}
				</Card>
			</Row>
		</Container>
	);
};
