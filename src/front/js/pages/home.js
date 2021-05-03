import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.scss";
import { Link } from "react-router-dom";
import { CardDeck, Card } from "react-bootstrap";

export const Home = () => {
	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="text-white">
							<h3>¡Más opciones, ahorrás más colones!</h3>
						</div>
						<form>
							<div className="form-group text-white">
								<div className="input-group mb-3">
									<input
										type="text"
										className="form-control"
										placeholder="¿Qué estás buscando?"
										aria-label="Recipient's username"
										aria-describedby="basic-addon2"
									/>
									<div className="input-group-append">
										<span className="input-group-text" id="basic-addon2">
											<i className="fas fa-search" />
										</span>
									</div>
								</div>
							</div>
							<div className="form-group text-white">
								<input
									type="text"
									className="form-control"
									placeholder="¿Dónde estás ubicado?"
									aria-label="Recipient's username"
									aria-describedby="basic-addon2"
								/>
							</div>
							<button type="submit" className="btn btn-warning btn-lg btn-block">
								Iniciar búsqueda
							</button>
						</form>
					</div>
				</div>
			</div>
			<div className="cards">
				<h1 className="text-center text-white font-weight-light">Productos rebajados</h1>
				<div className="row justify-content-md-center">
					<div className="col-8">
						<CardDeck>
							<Card>
								<Card.Img
									variant="top"
									src="https://express.dospinos.com/media/catalog/product/1/5/15000003.jpg"
									height="300px"
								/>
								<Card.Body>
									<Card.Title>Leche Dos Pinos</Card.Title>
									<Card.Text>Precio: 450.00</Card.Text>
								</Card.Body>
								<Card.Footer>
									<small className="text-muted">Last updated 3 mins ago</small>
								</Card.Footer>
							</Card>
							<Card>
								<Card.Img
									variant="top"
									src="http://triquitraque.cr/images/thumbs/0003016_mantequilla-con-sal-dos-pinos-115g_360.jpeg"
									height="300px"
								/>
								<Card.Body>
									<Card.Title>Mantequilla Dos Pinos</Card.Title>
									<Card.Text>Precio: 520.00</Card.Text>
								</Card.Body>
								<Card.Footer>
									<small className="text-muted">Last updated 3 mins ago</small>
								</Card.Footer>
							</Card>
							<Card>
								<Card.Img
									variant="top"
									src="https://img.huffingtonpost.com/asset/5eb68c632200005d128286b2.jpeg?ops=1778_1000"
									height="300px"
								/>
								<Card.Body>
									<Card.Title>
										Pechuga de pollo <strong>2 x 1</strong>
									</Card.Title>
									<Card.Text>Precio: 1275.00</Card.Text>
								</Card.Body>
								<Card.Footer>
									<small className="text-muted">Last updated 3 mins ago</small>
								</Card.Footer>
							</Card>
						</CardDeck>
						<div className="row justify-content-md-center">
							<div className="col-8" />
							<CardDeck>
								<Card>
									<Card.Img
										variant="top"
										src="https://www.cellshop.com/218472-thickbox_default/desodorante-dove-nutritive-secrets-48hs-150ml.jpg"
										height="310px"
									/>
									<Card.Body>
										<Card.Title>Desodorante Dove</Card.Title>
										<Card.Text>Precio: 1000.00</Card.Text>
									</Card.Body>
									<Card.Footer>
										<small className="text-muted">Last updated 3 mins ago</small>
									</Card.Footer>
								</Card>
								<Card>
									<Card.Img
										variant="top"
										src="https://static3.depositphotos.com/1005259/197/i/600/depositphotos_1972677-stock-photo-fresh-beef-on-white-background.jpg"
										height="300px"
									/>
									<Card.Body>
										<Card.Title>Bistec de Res</Card.Title>
										<Card.Text>Precio: 1780.00</Card.Text>
									</Card.Body>
									<Card.Footer>
										<small className="text-muted">Last updated 3 mins ago</small>
									</Card.Footer>
								</Card>
								<Card>
									<Card.Img
										variant="top"
										src="http://cdn.shopify.com/s/files/1/1479/5948/products/automercado-granos-arroz15_grande.png?v=1473833194"
										height="310px"
									/>
									<Card.Body>
										<Card.Title>Arroz Tío Pelón 91% Grano entero</Card.Title>
										<Card.Text>Descuento: 40%</Card.Text>
									</Card.Body>
									<Card.Footer>
										<small className="text-muted">Last updated 3 mins ago</small>
									</Card.Footer>
								</Card>
							</CardDeck>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
